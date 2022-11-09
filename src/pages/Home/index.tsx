import React, { useContext } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { HandPalm, Play } from 'phosphor-react'

import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'

import {
  HomeContainer,
  StartCountDownButton,
  StopCountDownButton,
} from './styles'
import { CycleContext } from '../../contexts/CyclesContext'

const newCycleValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod.number().min(5).max(50),
})

type NewCycleFormData = zod.infer<typeof newCycleValidationSchema>

export const Home = () => {
  const { activeCycles, createNewCycle, InterruptCurrentCycle } =
    useContext(CycleContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handlecreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handlecreateNewCycle)} action="">
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        <Countdown />

        {activeCycles ? (
          <StopCountDownButton onClick={InterruptCurrentCycle} type="button">
            <HandPalm size="24" />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton disabled={isSubmitDisabled} type="submit">
            <Play size="24" />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
