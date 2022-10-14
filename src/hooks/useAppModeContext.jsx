import { AppModeContext } from "../context/AppModeContext";
import { useContext } from "react";

export const useAppModeContext = () => {
  const context = useContext(AppModeContext)

  if(!context) {
    throw Error('useAppModeContext must be used inside an AppModeContextProvider')
  }

  return context
}