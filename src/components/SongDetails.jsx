import { useNavigate } from 'react-router-dom'
import { useSongsContext } from '../hooks/useSongsContext'
import { useAuthContext } from '../hooks/useAuthContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const SongDetails = ({ song }) => {
  const { dispatch } = useSongsContext()
  const { user } = useAuthContext()

  const navigate = useNavigate()

  const handleDelete = async () => {
    if (!user) {
      return
    }

    const response = await fetch('/api/songs/' + song._id, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'DELETE_SONG', payload: json})
    }
  }

  const handleEdit = () => {
    if (!user) {
      return
    }

    navigate('/' + song._id)
  }

  return (
    <div className="song-details">
      <h4 className='green-title'>{song.title}</h4>
      <p><strong>Lyrics: </strong></p>
      <p>{song.lyrics}</p>
      <br/>
      <p>{formatDistanceToNow(new Date(song.createdAt), { addSuffix: true })}</p>
      <span className="material-symbols-outlined btn-edit" onClick={handleEdit}>edit</span>
      <span className="material-symbols-outlined btn-del" onClick={handleDelete}>delete</span>
    </div>
  )
}

export default SongDetails