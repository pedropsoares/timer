import React, { createContext, ReactNode, useState } from 'react'

interface CreateCyclesData {
  task: string
  minutesAmount: number
}

interface Cycle {
  id: string
  task: string
  minutesAmount: number
  starDate: Date
  interruptedDate?: Date
  fineshedDate?: Date
}

interface CycleContentType {
  cycles: Cycle[]
  activeCycles: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCyclesAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCyclesData) => void
  InterruptCurrentCycle: () => void
}

export const CycleContext = createContext({} as CycleContentType)

interface CyclesContesxtProviderProps {
  children: ReactNode
}

export const CyclesContesxtProvider = ({
  children,
}: CyclesContesxtProviderProps) => {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const activeCycles = cycles.find(({ id }) => id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCyclesAsFinished() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, fineshedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )
  }

  function createNewCycle(data: CreateCyclesData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      starDate: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)

    // reset()
  }

  function InterruptCurrentCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === activeCycleId) {
          return { ...cycle, interruptedDate: new Date() }
        } else {
          return cycle
        }
      }),
    )

    setActiveCycleId(null)
  }

  return (
    <CycleContext.Provider
      value={{
        cycles,
        activeCycles,
        activeCycleId,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        InterruptCurrentCycle,
        markCurrentCyclesAsFinished,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
