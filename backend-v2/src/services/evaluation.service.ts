import { Injectable, Logger } from '@nestjs/common';
import { OpenAIService } from './openai.service';
import {
  TranscriptEntry,
  EvaluationResult,
  StageResult,
  CriterionScore,
} from '../schemas/interview-attempt.schema';
import { InterviewDocument, InterviewType } from '../schemas/interview.schema';
import {
  getEvaluationConfig,
  EvaluationConfig,
} from '../config/evaluation.config';

// ─────────────────────────────────────────────────────────────────────────────
// EVALUATION SERVICE
// ─────────────────────────────────────────────────────────────────────────────

@Injectable()
export class EvaluationService {
  private readonly logger = new Logger(EvaluationService.name);

  constructor(private readonly openaiService: OpenAIService) {}

  /**
   * Evaluate an interview transcript
   */
  async evaluate(
    interview: InterviewDocument,
    transcript: TranscriptEntry[],
  ): Promise<EvaluationResult> {
    const startTime = Date.now();

    if (!this.openaiService.isConfigured()) {
      this.logger.warn(
        'OpenAI not configured, returning placeholder evaluation',
      );
      return this.createPlaceholderEvaluation(startTime);
    }

    if (transcript.length === 0) {
      this.logger.warn('Empty transcript, returning placeholder evaluation');
      return this.createPlaceholderEvaluation(startTime);
    }

    try {
      // Get type-specific evaluation config
      const interviewType = interview.type || InterviewType.FULL_MOCK;
      const config = getEvaluationConfig(interviewType);

      this.logger.log(
        `Using evaluation config for type: ${interviewType}, criteria count: ${config.criteria.length}`,
      );

      // Format transcript for the prompt
      const formattedTranscript = this.formatTranscript(transcript);

      // Build the evaluation prompt with type-specific config
      const systemPrompt = this.buildSystemPrompt(interview, config);
      const userPrompt = this.buildUserPrompt(
        interview,
        formattedTranscript,
        config,
      );

      // Call OpenAI for evaluation
      const result =
        await this.openaiService.createJsonCompletion<EvaluationResponse>({
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
          ],
          temperature: 0.3,
          maxTokens: 4000,
        });

      const evaluation = this.parseEvaluationResponse(
        result.data,
        interview,
        config,
      );

      return {
        ...evaluation,
        evaluatedAt: new Date(),
        evaluationModel: 'gpt-4o',
        evaluationDurationMs: Date.now() - startTime,
      };
    } catch (error) {
      this.logger.error('Evaluation failed:', error);
      throw error;
    }
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PROMPT BUILDING
  // ─────────────────────────────────────────────────────────────────────────

  private buildSystemPrompt(
    interview: InterviewDocument,
    config: EvaluationConfig,
  ): string {
    return `You are an expert interview evaluator and career coach. Your task is to analyze a mock interview transcript and provide detailed, constructive feedback.

INTERVIEW CONTEXT:
- Interview: ${interview.name}
- Interview Type: ${config.type}
- Target Role: ${interview.role || 'Software Engineer'}
- Difficulty: ${interview.difficulty}
- Focus Areas: ${interview.tags?.join(', ') || 'General'}
${config.systemPromptContext}

KEY AREAS TO EVALUATE:
${config.focusAreas.map((area) => `- ${area}`).join('\n')}

YOUR EVALUATION STYLE:
- Be constructive and specific
- Reference exact quotes from the transcript when giving feedback
- Balance positive feedback with areas for improvement
- Be encouraging while maintaining high standards
- Provide actionable suggestions

IMPORTANT: You must respond with valid JSON matching the required schema.`;
  }

  private buildUserPrompt(
    interview: InterviewDocument,
    transcript: string,
    config: EvaluationConfig,
  ): string {
    const criteriaSection = config.criteria
      .map(
        (c, i) =>
          `${i + 1}. ${c.name} (weight: ${Math.round(c.weight * 100)}%): ${c.description}`,
      )
      .join('\n');

    // Use config stages if available, otherwise fall back to interview stages
    const stages =
      config.stages.length > 0
        ? config.stages.map((s) => s.name)
        : interview.stages?.length
          ? interview.stages
          : ['Introduction', 'Main Discussion', 'Wrap-up'];

    const stagesSection = `Interview Stages: ${stages.join(', ')}`;

    return `Please evaluate the following interview transcript for a "${config.type}" interview.

${stagesSection}

EVALUATION CRITERIA (score each from 0-10):
${criteriaSection}

TRANSCRIPT:
${transcript}

Please provide your evaluation in the following JSON format:
{
  "overallScore": <number 0-100>,
  "overallFeedback": "<2-3 paragraph summary of performance>",
  "criteriaScores": [
    {
      "criterionName": "<criterion name - must match exactly from criteria above>",
      "score": <number 0-10>,
      "maxScore": 10,
      "weight": <weight from criteria above>,
      "feedback": "<specific feedback with examples from transcript>"
    }
  ],
  "stageResults": [
    {
      "stageIndex": <number starting from 0>,
      "stageName": "<stage name from stages above>",
      "stageScore": <number 0-100>,
      "feedback": "<stage-specific feedback>",
      "strengths": ["<strength 1>", "<strength 2>"],
      "improvements": ["<improvement 1>", "<improvement 2>"]
    }
  ],
  "strengths": ["<top strength 1>", "<top strength 2>", "<top strength 3>"],
  "areasForImprovement": ["<area 1>", "<area 2>", "<area 3>"]
}

IMPORTANT:
1. Score EACH criterion listed above from 0-10
2. The overall score should reflect the weighted average (0-100)
3. Reference specific moments from the transcript with quotes
4. Be constructive and provide actionable suggestions
5. Create stage results for each stage listed above`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // TRANSCRIPT FORMATTING
  // ─────────────────────────────────────────────────────────────────────────

  private formatTranscript(transcript: TranscriptEntry[]): string {
    return transcript
      .map((entry) => {
        const speaker = entry.role === 'agent' ? 'Interviewer' : 'Candidate';
        const timestamp = this.formatTimestamp(entry.timestampMs);
        return `[${timestamp}] ${speaker}: ${entry.text}`;
      })
      .join('\n\n');
  }

  private formatTimestamp(ms: number): string {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  // ─────────────────────────────────────────────────────────────────────────
  // RESPONSE PARSING
  // ─────────────────────────────────────────────────────────────────────────

  private parseEvaluationResponse(
    response: EvaluationResponse,
    interview: InterviewDocument,
    config: EvaluationConfig,
  ): Omit<
    EvaluationResult,
    'evaluatedAt' | 'evaluationModel' | 'evaluationDurationMs'
  > {
    // Map criteria scores to stage results if stages not provided
    const stageResults: StageResult[] = response.stageResults?.length
      ? response.stageResults.map((sr) => ({
          stageIndex: sr.stageIndex,
          stageName: sr.stageName,
          stageScore: sr.stageScore,
          criteriaScores: [], // Criteria scores are kept at the top level
          feedback: sr.feedback,
          strengths: sr.strengths || [],
          improvements: sr.improvements || [],
        }))
      : this.generateDefaultStageResults(interview, response, config);

    return {
      overallScore: Math.min(100, Math.max(0, response.overallScore)),
      overallFeedback: response.overallFeedback,
      stageResults,
      strengths: response.strengths || [],
      areasForImprovement: response.areasForImprovement || [],
    };
  }

  private generateDefaultStageResults(
    interview: InterviewDocument,
    response: EvaluationResponse,
    config: EvaluationConfig,
  ): StageResult[] {
    // Use config stages first, then interview stages, then defaults
    const stages =
      config.stages.length > 0
        ? config.stages.map((s) => s.name)
        : interview.stages?.length
          ? interview.stages
          : ['Introduction', 'Main Discussion', 'Wrap-up'];

    const criteriaPerStage = Math.ceil(
      (response.criteriaScores?.length || 0) / stages.length,
    );

    return stages.map((stageName, index) => {
      const stageCriteria =
        response.criteriaScores?.slice(
          index * criteriaPerStage,
          (index + 1) * criteriaPerStage,
        ) || [];

      const stageScore =
        stageCriteria.length > 0
          ? Math.round(
              stageCriteria.reduce(
                (sum, c) => sum + (c.score / c.maxScore) * 100,
                0,
              ) / stageCriteria.length,
            )
          : response.overallScore;

      return {
        stageIndex: index,
        stageName,
        stageScore,
        criteriaScores: stageCriteria,
        feedback: `Performance in ${stageName} stage.`,
        strengths: [],
        improvements: [],
      };
    });
  }

  // ─────────────────────────────────────────────────────────────────────────
  // PLACEHOLDER
  // ─────────────────────────────────────────────────────────────────────────

  private createPlaceholderEvaluation(startTime: number): EvaluationResult {
    return {
      overallScore: 0,
      overallFeedback:
        'Evaluation could not be completed. OpenAI API key may not be configured or transcript was empty.',
      stageResults: [],
      strengths: [],
      areasForImprovement: [],
      evaluatedAt: new Date(),
      evaluationModel: 'none',
      evaluationDurationMs: Date.now() - startTime,
    };
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────────────────────────────

interface EvaluationResponse {
  overallScore: number;
  overallFeedback: string;
  criteriaScores?: CriterionScore[];
  stageResults?: {
    stageIndex: number;
    stageName: string;
    stageScore: number;
    feedback: string;
    strengths?: string[];
    improvements?: string[];
  }[];
  strengths?: string[];
  areasForImprovement?: string[];
}
