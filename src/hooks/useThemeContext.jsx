import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";

export const useThemeContext = () => {
  const context = useContext(ThemeContext)

  if(!context) {
    throw Error('useSongsContext must be used inside an SongsContextProvider')
  }

  return context
}