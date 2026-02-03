import {
  Injectable,
  Logger,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import OpenAI from 'openai';

export interface ChatCompletionOptions {
  model?: string;
  messages: Array<{
    role: 'system' | 'user' | 'assistant';
    content: string;
  }>;
  temperature?: number;
  maxTokens?: number;
  responseFormat?: 'text' | 'json_object';
}

export interface ChatCompletionResult {
  content: string;
  usage?: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
  finishReason: string;
}

@Injectable()
export class OpenAIService {
  private readonly logger = new Logger(OpenAIService.name);
  private client: OpenAI | null = null;
  private defaultModel: string;
  private defaultTemperature: number;

  constructor(private configService: ConfigService) {
    const apiKey = this.configService.get<string>('openai.apiKey');
    this.defaultModel =
      this.configService.get<string>('openai.model') || 'gpt-4o';
    this.defaultTemperature =
      this.configService.get<number>('openai.temperature') || 0.3;

    if (apiKey) {
      this.client = new OpenAI({ apiKey });
      this.logger.log('OpenAI client initialized successfully');
    } else {
      this.logger.warn('OPENAI_API_KEY not found in environment variables');
    }
  }

  /**
   * Check if OpenAI is configured
   */
  isConfigured(): boolean {
    return this.client !== null;
  }

  /**
   * Create a chat completion
   */
  async createChatCompletion(
    options: ChatCompletionOptions,
  ): Promise<ChatCompletionResult> {
    if (!this.client) {
      throw new InternalServerErrorException('OpenAI API key not configured');
    }

    try {
      const response = await this.client.chat.completions.create({
        model: options.model || this.defaultModel,
        messages: options.messages,
        temperature: options.temperature ?? this.defaultTemperature,
        max_tokens: options.maxTokens,
        response_format: options.responseFormat
          ? { type: options.responseFormat }
          : undefined,
      });

      const choice = response.choices[0];

      return {
        content: choice.message.content || '',
        usage: response.usage
          ? {
              promptTokens: response.usage.prompt_tokens,
              completionTokens: response.usage.completion_tokens,
              totalTokens: response.usage.total_tokens,
            }
          : undefined,
        finishReason: choice.finish_reason,
      };
    } catch (error) {
      if (error instanceof OpenAI.APIError) {
        this.logger.error(`OpenAI API error: ${error.message}`);
        throw new InternalServerErrorException(
          `OpenAI API error: ${error.message}`,
        );
      }
      throw new InternalServerErrorException(
        'Failed to create chat completion',
      );
    }
  }

  /**
   * Create a JSON chat completion with parsing
   */
  async createJsonCompletion<T>(
    options: Omit<ChatCompletionOptions, 'responseFormat'>,
  ): Promise<{ data: T; usage?: ChatCompletionResult['usage'] }> {
    const result = await this.createChatCompletion({
      ...options,
      responseFormat: 'json_object',
    });

    try {
      const data = JSON.parse(result.content) as T;
      return {
        data,
        usage: result.usage,
      };
    } catch {
      throw new InternalServerErrorException(
        'Failed to parse JSON response from OpenAI',
      );
    }
  }
}
