import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from "../hooks/useAuthContext"

// components
import WordSearch from '../components/WordSearch'
import ChordSearch from '../components/ChordSearch'

const NewSong = () => {
  const {user} = useAuthContext()

  const { id } = useParams()
  const navigate = useNavigate()


  const [title, setTitle] = useState('')
  const [lyrics, setLyrics] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchSong = async () => {
      const response = await fetch(`https://nerd-songwriter-api.fly.dev/api/songs/${id}`, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()
      setTitle(json.title)
      setLyrics(json.lyrics)

    }

      fetchSong()
  }, [id, user.token])

  const saveSong = async (e) => {
    if (!user) {
      setError('You must be logged in')
      return
    }

    const song = {title, lyrics}

    const response = await fetch(`https://nerd-songwriter-api.fly.dev/api/songs/${id}`, {
      method: 'PUT',
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
    }

    navigate('/')
  }

  return (
    <div className="home newSong__component">
        <h2>Song Details</h2>
      <section className='songs-container'>
        <input 
          name='title' 
          type='text' 
          placeholder='Song Title' 
          className='title'
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <textarea 
          name="test" 
          id="test" 
          cols="30" 
          rows="10" 
          placeholder='Lyrics'
          onChange={(e) => setLyrics(e.target.value)}
          value={lyrics}
        />
        <button className='btn btn-save' onClick={saveSong}>Save</button>
        {error && <div className="error">{error}</div>}
      </section>
      <section className="tools">
        <div className="words">
          <WordSearch />
        </div>
        <div className="chords">
          <ChordSearch />
        </div>
      </section>
    </div>
  )
}

export default NewSong