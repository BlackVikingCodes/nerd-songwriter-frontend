import { useState } from "react"
import { useSongsContext } from "../hooks/useSongsContext"
import { useAuthContext } from '../hooks/useAuthContext'
import { useAppModeContext } from "../hooks/useAppModeContext"
import { useNavigate } from 'react-router-dom'

const SongForm = () => {
  const { dispatch } = useSongsContext()
  const { user } = useAuthContext()
  const {appMode, setAppMode} = useAppModeContext()
  
  const [title, setTitle] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const newSong = async (e) => {
    if (!user) {
      setError('You must be logged in')
      return
    }

    setAppMode('new')

    const song = {title, lyrics}

    const response = await fetch('https://nerd-songwriter-api.fly.dev/api/songs', {
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
      <button className="btn btn-new btn-nav" data-active={(appMode==='new') && 'true'} onClick={newSong}>
        Create New Song
      </button>
      {error && <div className="error">{error}</div>}
    </>
  )
}

export default SongForm