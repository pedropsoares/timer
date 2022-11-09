import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './Router'

import { GlobalStyle } from './styles/global'
import { defaultTheme } from './styles/themes/default'
import { CyclesContesxtProvider } from './contexts/CyclesContext'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContesxtProvider>
          <Router />
        </CyclesContesxtProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}
