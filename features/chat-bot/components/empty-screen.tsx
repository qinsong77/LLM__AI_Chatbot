import { ExternalLink } from '@/components/external-link'

export function EmptyScreen() {
  return (
    <div className="flex flex-col gap-2 rounded-lg border bg-background p-8">
      <h1 className="text-lg font-semibold">Welcome AI Chatbot!</h1>
      <p className="leading-normal text-muted-foreground">
        This is an open source AI chatbot app template built with{' '}
        <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>, the{' '}
        <ExternalLink href="https://www.npmjs.com/package/openai">
          OpenAI SDK
        </ExternalLink>
        . Next.js api transform open api on server and SSE with client.
      </p>
      <p className="leading-normal text-muted-foreground">
        source code is available on{' '}
        <ExternalLink href="https://github.com/qinsong77/LLM_Chatbot">
          GitHub
        </ExternalLink>
        .
      </p>
    </div>
  )
}
