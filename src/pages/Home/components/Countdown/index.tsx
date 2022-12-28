import { differenceInSeconds } from 'date-fns'
import React, { useContext, useEffect } from 'react'
import { CycleContext } from '../../../../contexts/CyclesContext'

import { CountDownContainer, Separator } from './styles'

export const Countdown = () => {
  const {
    activeCycle,
    activeCycleId,
    amountSecondsPassed,
    setSecondsPassed,
    markCurrentCyclesAsFinished,
  } = useContext(CycleContext)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  useEffect(() => {
    let interval: number

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDiference = differenceInSeconds(
          new Date(),
          new Date(activeCycle.starDate),
        )

        if (secondsDiference >= totalSeconds) {
          markCurrentCyclesAsFinished()

          setSecondsPassed(totalSeconds)

          clearInterval(interval)
        } else {
          setSecondsPassed(secondsDiference)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    activeCycle,
    totalSeconds,
    activeCycleId,
    markCurrentCyclesAsFinished,
    setSecondsPassed,
  ])

  const currentSeconds = activeCycle ? totalSeconds - amountSecondsPassed : 0

  const minutesAmount = Math.floor(currentSeconds / 60)
  const secondsAmount = currentSeconds % 60

  const minutes = String(minutesAmount).padStart(2, '0')
  const seconds = String(secondsAmount).padStart(2, '0')

  useEffect(() => {
    if (activeCycle) {
      document.title = `Restam - ${minutes}:${seconds}`
    }
  }, [activeCycle, minutes, seconds])

  return (
    <CountDownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountDownContainer>
  )
}
