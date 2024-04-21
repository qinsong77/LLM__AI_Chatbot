import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex">
      <Link
        href="/simple-chat"
        className="mr-4 h-24 w-72 rounded border p-4 shadow transition hover:shadow-xl"
      >
        Simple sse chat
      </Link>
      <Link
        href="/chat-bot"
        className="h-24 w-72 rounded border p-4 shadow transition hover:shadow-xl"
      >
        Simple rsc streaming bot
      </Link>
    </div>
  )
}
