import {
  getOpenaiClient,
  GPT_MODEL,
} from '@/features/chat-bot/utils/openai-client'
import { logger } from '@/lib/shared'

export const runtime = 'edge'

// Prevents this route's response from being cached
export const dynamic = 'force-dynamic'

type RequestData = {
  currentModel: string
  // message: { context: string; role: 'user' | 'assistant' }[]
  message: any
}

export async function POST(request: Request) {
  const { message } = (await request.json()) as RequestData
  logger.info({ message }, 'post message')

  if (!message || !Array.isArray(message)) {
    return new Response('No message in the request', { status: 400 })
  }

  try {
    const openai = getOpenaiClient()
    const completionStream = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages: [
        {
          role: 'system',
          content: 'You are a smart AI bot and you can answer anything!',
        },
        ...message,
      ],
      max_tokens: 4096,
      stream: true,
    })

    const responseStream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder()

        for await (const part of completionStream) {
          const text = part.choices[0]?.delta.content ?? ''
          // todo add event
          const chunk = encoder.encode(`data: ${text}\n\n`)
          controller.enqueue(chunk)
        }
        controller.close()
      },
    })

    // const responseStream = new TransformStream();
    // const writer = responseStream.writable.getWriter();
    // const encoder = new TextEncoder();

    return new Response(responseStream, {
      headers: {
        'Content-Type': 'text/event-stream; charset=utf-8',
        Connection: 'keep-alive',
        'Cache-Control': 'no-cache, no-transform',
      },
    })
  } catch (error) {
    logger.error({ error }, 'An error occurred during OpenAI request')
    return new Response('An error occurred during OpenAI request', {
      status: 500,
    })
  }
}
