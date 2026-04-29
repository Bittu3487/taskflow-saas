import React, { createContext, useState, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => setDarkMode(!darkMode)

  const theme = {
    darkMode,
    toggleTheme,
    colors: {
      bg: darkMode ? '#1a1a2e' : '#f0f2f5',
      card: darkMode ? '#16213e' : '#ffffff',
      text: darkMode ? '#ffffff' : '#000000',
      subtext: darkMode ? '#a0a0b0' : '#666666',
      border: darkMode ? '#2a2a4a' : '#dddddd',
      primary: '#4f46e5',
      header: darkMode ? '#0f0f23' : '#ffffff'
    }
  }

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)