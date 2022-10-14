import { createContext, useState } from "react";

export const AppModeContext = createContext()

export const AppModeContextProvider = ({ children }) => {
  const [appMode, setAppMode] = useState('dashboard')

  const modeContextValue = {
    appMode,
    setAppMode
  }

  return (
    <AppModeContext.Provider value={modeContextValue}>
      { children }
    </AppModeContext.Provider>
  )
}