import React, { createContext, ReactNode, useState, useReducer, useEffect } from 'react'
import { addNewCycleAction, interruptCurrentCycleAction, marckCurrentCycleAsFineshedAction } from '../reducers/cycles/actions'
import { ActionTypes, Cycle, cyclesReduce } from '../reducers/cycles/reducer'

import { differenceInSeconds } from 'date-fns'


interface CreateCyclesData {
  task: string
  minutesAmount: number
}

interface CycleContentType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
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
  }, () => {
    const storedStateAsJSON = localStorage.getItem('@ignite-timer:cycles-state-1.0.0')

    if (storedStateAsJSON) {
      return JSON.parse(storedStateAsJSON)
    }
  })

  const { cycles, activeCycleId } = cyclesState
  const activeCycle = cycles.find(({ id }) => id === activeCycleId)

  const [amountSecondsPassed, setAmountSecondsPassed] = useState<number>(() => {
    if (activeCycle) {
      return differenceInSeconds(new Date(), new Date(activeCycle.starDate))
    }

    return 0
  })

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

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
        activeCycle,
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
