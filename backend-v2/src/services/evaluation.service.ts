import { Injectable, Logger } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import {
  EvaluationResult,
  RubricScore,
} from '../schemas/interview-attempt.schema';
import { InterviewDocument } from '../schemas/interview.schema';
import { RubricDocument } from '../schemas/rubric.schema';

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

// ElevenLabs transcript item structure
interface ElevenLabsTranscriptItem {
  role: 'agent' | 'user';
  message: string;
  time_in_call_secs: number;
}

// GPT response structure for evaluation
interface GPTEvaluationResponse {
  overallScore: number;
  overallFeedback: string;
  rubricScores: {
    rubricId: string;
    rubricName: string;
    score: number;
    feedbacks: { point: string; evidence?: string }[];
    strengths: { point: string; evidence?: string }[];
  }[];
}

// Interview with populated rubrics
export interface InterviewWithRubrics extends Omit<
  InterviewDocument,
  'rubrics'
> {
  rubrics: RubricDocument[];
}

// ─────────────────────────────────────────────────────────────────────────────
// EVALUATION SERVICE
// ─────────────────────────────────────────────────────────────────────────────

@Injectable()
export class EvaluationService {
  private readonly logger = new Logger(EvaluationService.name);

  constructor(private readonly openaiService: OpenAIService) {}

  /**
   * Evaluate an interview transcript using the interview's rubrics
   */
  async evaluate(
    interview: InterviewWithRubrics,
    rawTranscript: Record<string, unknown>,
  ): Promise<EvaluationResult> {
    if (!this.openaiService.isConfigured()) {
      this.logger.warn(
        'OpenAI not configured, returning placeholder evaluation',
      );
      return this.createPlaceholderEvaluation();
    }

    // Extract transcript items from raw ElevenLabs response
    const transcriptItems = this.extractTranscript(rawTranscript);

    if (transcriptItems.length === 0) {
      this.logger.warn('Empty transcript, returning placeholder evaluation');
      return this.createPlaceholderEvaluation();
    }

    if (!interview.rubrics || interview.rubrics.length === 0) {
      this.logger.warn('No rubrics defined, returning placeholder evaluation');
      return this.createPlaceholderEvaluation();
    }

    try {
      this.logger.log(
        `Evaluating interview "${interview.name}" with ${interview.rubrics.length} rubrics`,
      );

      // Format transcript for the prompt
      const formattedTranscript = this.formatTranscript(transcriptItems);

      // Build the evaluation prompts
      const systemPrompt = this.buildSystemPrompt(interview);
      const userPrompt = this.buildUserPrompt(interview, formattedTranscript);

      // Call OpenAI for evaluation
      const result =
        await this.openaiService.createJsonCompletion<GPTEvaluationResponse>({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.3,
          maxTokens: 4000,
        });

      return this.parseEvaluationResponse(result.data);
    } catch (error) {
      this.logger.error('Evaluation failed:', error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TRANSCRIPT HANDLING
  // ─────────────────────────────────────────────────────────────────────────

  /**
   * Extract transcript items from raw ElevenLabs response
   */
  private extractTranscript(
    rawTranscript: Record<string, unknown>,
  ): ElevenLabsTranscriptItem[] {
    // ElevenLabs returns transcript in a 'transcript' array
    const transcript = rawTranscript?.transcript;

    if (Array.isArray(transcript)) {
      return transcript as ElevenLabsTranscriptItem[];
    }

    return [];
  }

  /**
   * Format transcript for the evaluation prompt
   */
  private formatTranscript(transcript: ElevenLabsTranscriptItem[]): string {
    return transcript
      .map((entry) => {
        const speaker = entry.role === 'agent' ? 'Interviewer' : 'Candidate';
        const timestamp = this.formatTimestamp(entry.time_in_call_secs);
        return `[${timestamp}] ${speaker}: ${entry.message}`;
      })
      .join('\n\n');
  }

  private formatTimestamp(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PROMPT BUILDING
  // ─────────────────────────────────────────────────────────────────────────

  private buildSystemPrompt(interview: InterviewWithRubrics): string {
    return `You are an expert interview evaluator and career coach. Your task is to analyze a mock interview transcript and provide detailed, constructive feedback.

INTERVIEW CONTEXT:
- Interview: ${interview.name}
- Target Role: ${interview.role || 'Software Engineer'}
- Difficulty: ${interview.difficulty}
- Focus Areas: ${interview.tags?.join(', ') || 'General'}

YOUR EVALUATION STYLE:
- Be constructive and specific
- Reference exact quotes from the transcript when giving feedback (include timestamp)
- Balance positive feedback with areas for improvement
- Be encouraging while maintaining high standards
- Provide actionable suggestions

IMPORTANT: You must respond with valid JSON matching the required schema.`;
  }

  private buildUserPrompt(
    interview: InterviewWithRubrics,
    transcript: string,
  ): string {
    // Build rubrics section
    const rubricsSection = interview.rubrics
      .map(
        (r, i) =>
          `${i + 1}. ${r.name} (ID: ${r._id.toString()})\n   ${r.description}`,
      )
      .join('\n\n');

    return `Please evaluate the following interview transcript.

EVALUATION RUBRICS (score each from 0-100, all rubrics have equal weight):
${rubricsSection}

TRANSCRIPT:
${transcript}

Please provide your evaluation in the following JSON format:
{
  "overallScore": <number 0-100, average of all rubric scores>,
  "overallFeedback": "<2-3 paragraph summary of overall performance>",
  "rubricScores": [
    {
      "rubricId": "<rubric ID from above>",
      "rubricName": "<rubric name>",
      "score": <number 0-100>,
      "feedbacks": [
        {
          "point": "<specific area for improvement>",
          "evidence": "<quote from transcript with timestamp, e.g. 'At 2:34 - I helped improve...'>"
        }
      ],
      "strengths": [
        {
          "point": "<what they did well>",
          "evidence": "<quote from transcript with timestamp>"
        }
      ]
    }
  ]
}

IMPORTANT:
1. Score EACH rubric from 0-100
2. The overall score should be the average of all rubric scores
3. Include specific evidence (quotes with timestamps) for both feedbacks and strengths
4. Provide at least 2-3 feedbacks and 2-3 strengths for each rubric
5. Be constructive and actionable in your feedback`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RESPONSE PARSING
  // ─────────────────────────────────────────────────────────────────────────

  private parseEvaluationResponse(
    response: GPTEvaluationResponse,
  ): EvaluationResult {
    // Validate and normalize rubric scores
    const rubricScores: RubricScore[] =
      response.rubricScores?.map((rs) => ({
        rubricId: rs.rubricId,
        rubricName: rs.rubricName,
        score: Math.min(100, Math.max(0, rs.score)),
        feedbacks: rs.feedbacks || [],
        strengths: rs.strengths || [],
      })) || [];

    // Calculate overall score as average if not provided correctly
    const calculatedOverall =
      rubricScores.length > 0
        ? Math.round(
            rubricScores.reduce((sum, r) => sum + r.score, 0) /
              rubricScores.length,
          )
        : 0;

    return {
      overallScore: Math.min(
        100,
        Math.max(0, response.overallScore || calculatedOverall),
      ),
      overallFeedback: response.overallFeedback || '',
      rubricScores,
      evaluatedAt: new Date(),
      evaluationModel: 'gpt-4o',
    };
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PLACEHOLDER
  // ─────────────────────────────────────────────────────────────────────────

  private createPlaceholderEvaluation(): EvaluationResult {
    return {
      overallScore: 0,
      overallFeedback:
        'Evaluation could not be completed. OpenAI API key may not be configured, transcript was empty, or no rubrics were defined.',
      rubricScores: [],
      evaluatedAt: new Date(),
      evaluationModel: 'none',
    };
  }
}
