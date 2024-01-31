import {
  CssBaseline,
  GlobalStyles,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { useEffect, useMemo } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import HomeLayout from './routes/HomeLayout'
import Home from './routes/Home'
import Score from './routes/Score'
import Day from './routes/Day'
import Motto from './routes/Motto'
import Login from './routes/Login'
import UserContextProvider from './Contexts/UserContext'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ScoreContextProvider from './Contexts/ScoreContext'
import QRCode from './routes/QRCode'
import ErrorBoundary from './components/ErrorBoundary'
import Quiz from './routes/Quiz'
import Dashboard from './routes/Dashboard'
import QuizContextProvider from './Contexts/QuizContext'

function App() {
  const location = useLocation()
  const themeConstructor = useMemo(
    () =>
      createTheme({
        palette: {
          mode: 'dark',
          primary: {
            main: '#1C75BC',
          },
          secondary: { main: '#27BBAF' },
          firstSecondary: {
            light: '#E6E6FA',
            dark: '#bebdd7ba',
          },
          secondSecondary: {
            light: '#FFDAB9',
            dark: '#e6c49ebf',
          },
          thirdSecondary: {
            light: '#BEBAA7',
            dark: '#9c9885b0',
          },
        },
        typography: {
          fontFamily: "'Cairo', sans-serif",
        },
        components: {
          MuiSpeedDialAction: {
            styleOverrides: {
              staticTooltipLabel: {
                width: '120px',
                fontSize: '14px',
              },
            },
          },
        },
      }),
    []
  )

  useEffect(() => {
    document.documentElement.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [location.pathname])

  return (
    <ThemeProvider theme={themeConstructor}>
      <UserContextProvider>
        <QuizContextProvider>
          <ScoreContextProvider>
            <GlobalStyles
              styles={{
                '*': {
                  padding: 0,
                  margin: 0,
                  boxSizing: 'border-box',
                  fontFamily: "'Cairo', sans-serif",
                },
                body: {
                  fontFamily: "'Cairo', sans-serif",
                  backgroundImage: 'url(/bgblack.webp)',
                  backgroundAttachment: 'fixed',
                },
                '.MuiFormHelperText-root': {
                  textAlign: 'right !important',
                },
              }}
            />
            <CssBaseline />
            <Routes>
              <Route element={<HomeLayout />} path='/'>
                <Route
                  element={
                    <ErrorBoundary>
                      <Home />
                    </ErrorBoundary>
                  }
                  index
                />
                <Route
                  element={
                    <ErrorBoundary>
                      <Score />
                    </ErrorBoundary>
                  }
                  path='/score'
                />
                <Route
                  element={
                    <ErrorBoundary>
                      <Motto />
                    </ErrorBoundary>
                  }
                  path='/motto'
                />
                <Route
                  element={
                    <ErrorBoundary>
                      <Day />
                    </ErrorBoundary>
                  }
                  path='/day/:day'
                />
                <Route
                  element={
                    <ErrorBoundary>
                      <QRCode />
                    </ErrorBoundary>
                  }
                  path='/qrcode'
                />
                <Route
                  element={
                    <ErrorBoundary>
                      <Quiz />
                    </ErrorBoundary>
                  }
                  path='/quiz'
                />
                <Route
                  element={
                    <ErrorBoundary>
                      <Dashboard />
                    </ErrorBoundary>
                  }
                  path='/dashboard'
                />
              </Route>
              <Route element={<Login />} path='/login' />
            </Routes>
            <ToastContainer
              position='top-center'
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true}
              closeOnClick
              rtl={true}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme='light'
            />
          </ScoreContextProvider>
        </QuizContextProvider>
      </UserContextProvider>
    </ThemeProvider>
  )
}

export default App
