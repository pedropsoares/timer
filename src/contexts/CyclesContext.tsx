import React, { createContext, ReactNode, useState, useReducer } from 'react'

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

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export const CyclesContesxtProvider = ({
  children,
}: CyclesContesxtProviderProps) => {

  const [cyclesState, dispatch] = useReducer((state: CyclesState, action: any) => {
    if (action.type === 'ADD_NEW_CYCLE') {
      return {
        ...state,
        cycles: [...state.cycles, action.payload.newCycle],
        activeCycleId: action.payload.newCycle.id
      }
    }

    if (action.type === 'INTERRUPT_CURRENT_CYCLE') {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, interruptedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null
      }
    }

    if (action.type === 'MARK_CURRENT_CYCLE_AS_FINISHED') {
      return {
        ...state,
        cycles: state.cycles.map((cycle) => {
          if (cycle.id === state.activeCycleId) {
            return { ...cycle, fineshedDate: new Date() }
          } else {
            return cycle
          }
        }),
        activeCycleId: null
      }
    }

    return state
  }, {
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

    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId
      }
    })

  }

  function createNewCycle(data: CreateCyclesData) {
    const id = String(new Date().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      starDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle
      }
    })

    setAmountSecondsPassed(0)

    // reset()
  }

  function InterruptCurrentCycle() {

    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId
      }
    })

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
