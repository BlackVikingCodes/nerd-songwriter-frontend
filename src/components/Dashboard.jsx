import { useEffect }from 'react'
import { useSongsContext } from "../hooks/useSongsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import SongDetails from '../components/SongDetails'

function Dashboard() {
  const {songs, dispatch} = useSongsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch('https://nerd-songwriter-api.fly.dev/api/songs', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_SONGS', payload: json})
      }
    }

    if (user) {
      fetchSongs()
    }
  }, [dispatch, user])

  return (
    <div>
      <h2>Your Songs</h2>
        <div className="songs">
          {songs &&
            songs.map((song) => (
                <SongDetails key={song._id} song={song} />
              )
            )
          }
        </div>
    </div>
  )
}

export default Dashboard