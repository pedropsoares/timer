import React, { useContext } from 'react'

import { FormContainer, TaskInput, MinutesAmount } from './styles'
import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../../../contexts/CyclesContext'

export const NewCycleForm = () => {
  const { activeCycles } = useContext(CycleContext)
  const { register } = useFormContext()

  return (
    <FormContainer>
      <label htmlFor="task">Vou trabalhar em</label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycles}
        {...register('task')}
      />

      <datalist id="task-suggestions">
        <option value="Projeto 1" />
        <option value="Projeto 2" />
        <option value="Projeto 3" />
        <option value="Projeto 4" />
      </datalist>

      <label htmlFor="minutesAmout">Durante</label>
      <MinutesAmount
        type="number"
        id="minutesAmout"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        disabled={!!activeCycles}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
