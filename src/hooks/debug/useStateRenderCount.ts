import { useEffect, useRef } from 'react'

export const useStateRenderCount = (dependency: any) => {
  const ref = useRef(0)

  useEffect(() => {
    ref.current += 1
  }, [dependency])

  return ref.current
}
