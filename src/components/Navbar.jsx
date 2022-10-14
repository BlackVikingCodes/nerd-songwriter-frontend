import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
import { useAppModeContext } from '../hooks/useAppModeContext'
import SongForm from './SongForm'

const Navbar = () => {
  const { logout } = useLogout()
  const { user } = useAuthContext()
  const {appMode, setAppMode} = useAppModeContext()

  const [showMenu, setShowMenu] = useState(false)

  const handleClick = () => {
    logout()
  }

  const handleMenu = () => {
    setShowMenu(prev =>!prev)
  }

  return (
    <header id={!showMenu ? 'hidden' : 'show'}>
      <div className="sidebar">
        <div className="sidebar__title">
          <Link to="/" onClick={() => setAppMode('dashboard')}>
            <h1>Nerd Songwriter</h1>
          </Link>
          <button
            className='menu-btn'
            onClick={handleMenu}
          >
            {!showMenu ? 
              <span className="material-symbols-outlined" id='accent'>
                menu
              </span>
              :
              <span className="material-symbols-outlined" id='accent'>
                close
              </span>
            }
          </button>
        </div>
          {user && (
            <div className='nav__container'>
              <span className='nav__user-name'>Hey, {user.userName}!</span>
              <div>
                <SongForm />
                <button className='btn btn-nav' data-active={(appMode==='dashboard')&&'true'} onClick={() => setAppMode('dashboard')}>Your Songs</button>
                <button className='btn btn-nav' data-active={(appMode==='about')&&'true'} onClick={() => setAppMode('about')}>About this app</button>
              </div>
              <button className='btn btn-logout' onClick={handleClick}>Log out</button>
            </div>
          )}
          {!user && (
            <div className='nav__container--login'>
              <Link to="/login" className='btn btn-logout'>Login</Link>
              <Link to="/signup" className='btn btn-logout'>Signup</Link>
            </div>
          )}
      </div>
    </header>
  )
}

export default Navbar