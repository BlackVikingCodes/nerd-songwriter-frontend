import { useEffect }from 'react'
import { useSongsContext } from "../hooks/useSongsContext"
import { useAuthContext } from "../hooks/useAuthContext"

// components
import SongDetails from '../components/SongDetails'
import SongForm from '../components/SongForm'
import WordSearch from '../components/WordSearch'
import ChordSearch from '../components/ChordSearch'

const Home = () => {
  const {songs, dispatch} = useSongsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchSongs = async () => {
      const response = await fetch('/api/songs', {
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
    <>
      <SongForm />
    <div className="home">
      <section className="tools">
        <div className="words">
          <WordSearch />
        </div>
        <div className="chords">
          <ChordSearch />
        </div>
      </section>
      <section className="songs-container">
        <h2>Your Songs</h2>
        <div className="songs">
          {songs && songs.map((song) => (
            <SongDetails key={song._id} song={song} />
            ))}
        </div>
      </section>
    </div>
    </>
  )
}

export default Home