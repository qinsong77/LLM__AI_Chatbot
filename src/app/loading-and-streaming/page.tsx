import { Suspense } from 'react'

import { ClientComponent } from '@/app/loading-and-streaming/_components/client-component'
import { TableDemo } from '@/app/loading-and-streaming/_components/table'
import {
  CenterContentLoading,
  SideBarLoading,
} from '@/app/loading-and-streaming/loading'
import { ExternalLink } from '@/components/external-link'
import { Separator } from '@/components/ui/separator'
import logger from '@/lib/logger'
import { sleep } from '@/lib/utils'

import { PromptActivity } from './_components/prompt-activity'

type Res = {
  results: {
    gender: string
    phone: string
    name: {
      title: string
      first: string
      last: string
    }
    email: string
    login: {
      uuid: string
    }
    picture: {
      large: string
      medium: string
    }
  }[]
}
async function getUserInfo(): Promise<Res> {
  logger.info('getUserInfo starting ')
  const res = await fetch('https://randomuser.me/api/', {
    cache: 'no-store',
  })
  await sleep(3000)
  logger.info(res, 'getUserInfo done')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    const e = new Error('Failed to getUserInfo')
    logger.error(e)
    throw e
  }

  return res.json()
}
const Page = async () => {
  const data = (await getUserInfo())?.results?.[0] ?? {}

  return (
    <div className="flex flex-col space-y-8">
      <div className="h-30 rounded border p-8">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Show{' '}
          <ExternalLink href="https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming">
            loading UI and streaming page
          </ExternalLink>
        </h2>
        <p>email: {data.email}</p>
        <p>phone: {data.phone}</p>
        <p>gender: {data.gender}</p>
      </div>
      <section className="flex space-x-2">
        <Suspense fallback={<SideBarLoading />}>
          <div className="flex w-4/12 flex-col space-y-3">
            <PromptActivity />
          </div>
        </Suspense>
        <Suspense fallback={<CenterContentLoading />}>
          <div className="flex w-8/12 flex-col space-y-3">
            <TableDemo />
          </div>
        </Suspense>
      </section>
      <Separator />
      <ClientComponent />
    </div>
  )
}

export default Page
