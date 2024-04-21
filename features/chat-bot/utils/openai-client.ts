import OpenAI from 'openai'

export const GPT_MODEL = 'gpt-3.5-turbo'
// export const GPT_MODEL = 'moonshot-v1-8k'

export const getOpenaiClient: () => OpenAI = (function () {
  let instance: OpenAI
  return {
    getInstance: function () {
      if (!instance) {
        // logger.info('OpenAI client created')
        instance = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY, // runtime env
          baseURL: process.env.OPENAI_BASE_URL,
        })
      }
      return instance
    },
  }
})().getInstance
