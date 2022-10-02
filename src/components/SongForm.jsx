import { useState } from "react"
import { useSongsContext } from "../hooks/useSongsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate } from 'react-router-dom'

const SongForm = () => {
  const { dispatch } = useSongsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const newSong = async (e) => {
    if (!user) {
      setError('You must be logged in')
      return
    }

    const song = {title, lyrics}

    const response = await fetch('/api/songs', {
      method: 'POST',
      body: JSON.stringify(song),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
    }
    if (response.ok) {
      setTitle('')
      setLyrics('')
      setError(null)
      dispatch({type: 'CREATE_SONG', payload: json})
    }

    navigate(`/${json._id}`)
  }

  return (
    <>
      <button className="btn btn-new" onClick={newSong}>
        Create New Song
      </button>
      {error && <div className="error">{error}</div>}
    </>
  )
}

export default SongForm