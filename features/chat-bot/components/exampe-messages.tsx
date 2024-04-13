type Message = {
  readonly heading: string
  readonly message: string
}

type Props = {
  exampleMessages: readonly Message[]
  onClick: (message: string) => void
}
export const ExampleMessages = ({ exampleMessages, onClick }: Props) => {
  return (
    <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
      {exampleMessages.map((example, index) => (
        <div
          key={example.heading}
          className={`cursor-pointer rounded-lg border bg-white p-4 hover:bg-zinc-50 dark:bg-zinc-950 dark:hover:bg-zinc-900`}
          onClick={() => onClick(example.message)}
        >
          <div className="text-sm font-semibold">{example.heading}</div>
          <div className="text-sm text-zinc-600">{example.message}</div>
        </div>
      ))}
    </div>
  )
}
