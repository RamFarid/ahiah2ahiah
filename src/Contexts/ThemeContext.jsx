import { createContext, useContext, useState } from 'react'
import PropTypes from 'prop-types'
const ThemeContext = createContext()

export const useTheme = () => {
  return useContext(ThemeContext)
}

function ThemeContextProvider({ children }) {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light')
  const toggleTheme = () => {
    const newerTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newerTheme)
    localStorage.setItem('theme', newerTheme)
  }
  return (
    <ThemeContext.Provider value={[theme, toggleTheme]}>
      {children}
    </ThemeContext.Provider>
  )
}

ThemeContextProvider.propTypes = {
  children: PropTypes.any,
}

export default ThemeContextProvider
