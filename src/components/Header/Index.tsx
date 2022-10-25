import React from 'react'
import { NavLink } from 'react-router-dom'
import { HeaderContainer } from './styles'
import { Timer, Scroll } from 'phosphor-react'

import logoIgnite from '../../assets/logo-ignite.svg'

export const Header = () => {
  return (
    <HeaderContainer>
      <img src={logoIgnite} alt="" />
      <nav>
        <NavLink to="/" end title="Timer">
          <Timer size="24" />
        </NavLink>
        <NavLink to="/history" end title="Historico">
          <Scroll size="24" />
        </NavLink>
      </nav>
    </HeaderContainer>
  )
}
