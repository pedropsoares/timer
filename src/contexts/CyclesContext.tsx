import React, { createContext, ReactNode, useState, useReducer } from 'react'
import { addNewCycleAction, interruptCurrentCycleAction, marckCurrentCycleAsFineshedAction } from '../reducers/cycles/actions'
import { ActionTypes, Cycle, cyclesReduce } from '../reducers/cycles/reducer'

interface CreateCyclesData {
  task: string
  minutesAmount: number
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

  const [cyclesState, dispatch] = useReducer(cyclesReduce, {
    cycles: [],
    activeCycleId: null
  })

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(0)

  const { cycles, activeCycleId } = cyclesState
  const activeCycles = cycles.find(({ id }) => id === activeCycleId)

  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCyclesAsFinished() {

    dispatch(marckCurrentCycleAsFineshedAction)

  }

  function createNewCycle(data: CreateCyclesData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      starDate: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))

    setAmountSecondsPassed(0)

    // reset()
  }

  function InterruptCurrentCycle() {

    dispatch(interruptCurrentCycleAction())

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
