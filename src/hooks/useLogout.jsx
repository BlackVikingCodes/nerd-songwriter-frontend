import { useAuthContext } from './useAuthContext'
import { useSongsContext } from './useSongsContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchSongs } = useSongsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchSongs({ type: 'SET_SONGS', payload: null })
  }

  return { logout }
}