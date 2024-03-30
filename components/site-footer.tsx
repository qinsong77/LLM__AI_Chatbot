import { ExternalLink } from '@/components/external-link'
import { cn } from '@/lib/utils'

export function SiteFooter({
  className,
  ...props
}: React.ComponentProps<'footer'>) {
  return (
    <footer className={cn('py-6 md:px-8 md:py-0', className)}>
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
          Basically built by{' '}
          <ExternalLink href="https://nextjs.org">Next.js</ExternalLink>. The
          source code is available on{' '}
          <ExternalLink href="https://github.com/qinsong77">
            GitHub
          </ExternalLink>
          .
        </p>
      </div>
    </footer>
  )
}
