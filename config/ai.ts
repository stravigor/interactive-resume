import { env } from '@strav/kernel/helpers/env'

export default {
  default: env('AI_PROVIDER', 'openai'),

  providers: {
    anthropic: {
      driver: 'anthropic',
      apiKey: env('ANTHROPIC_API_KEY', ''),
      model: env('ANTHROPIC_MODEL', 'claude-sonnet-4-5-20250929'),
    },
    openai: {
      driver: 'openai',
      apiKey: env('OPENAI_API_KEY', ''),
      model: env('OPENAI_MODEL', 'gpt-4-turbo-preview'),
    },
  },

  maxTokens: env.int('AI_MAX_TOKENS', 500),
  temperature: env.float('AI_TEMPERATURE', 0.7),
  maxIterations: env.int('AI_MAX_ITERATIONS', 10),
}