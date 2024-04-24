import { LoaderIcon } from 'lucide-react'
import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useTransition,
} from 'react'

export const ReceiveSseText = forwardRef((props, ref) => {
  const [text, setText] = useState('')
  const start = useRef(false)
  const [isPending, startTransition] = useTransition()
  useImperativeHandle(
    ref,
    () => {
      return {
        setText: (appendText: string) => {
          startTransition(() => {
            setText((prev) => prev + appendText)
          })
        },
      }
    },
    [],
  )
  return (
    <div className="break-words">
      {text ? (
        text
      ) : (
        <LoaderIcon
          className="mt-1 animate-spin"
          size={20}
        />
      )}
    </div>
  )
})

ReceiveSseText.displayName = 'ReceiveSseText'
