'use client'

import { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { ToastAction } from '@/components/ui/toast'
import { useToast } from '@/components/ui/use-toast'

export const ClientComponent = () => {
  const [val, setVal] = useState(0)
  const { toast } = useToast()
  useEffect(() => {
    if (val === 2) {
      toast({
        title: 'clicked',
        description: 'val is: ' + val,
      })
    }
  }, [toast, val])
  return (
    <div className="flex items-center space-x-4">
      <p>Counter: {val}</p>
      <Button
        className="mr-2"
        onClick={() => {
          setVal((prevState) => prevState + 1)
        }}
      >
        Add
      </Button>
      <Separator orientation="vertical" />
      <Button
        variant="outline"
        onClick={() => {
          toast({
            title: 'Scheduled: Catch up ',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            action: (
              <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
            ),
          })
        }}
      >
        Add to calendar
      </Button>
    </div>
  )
}
