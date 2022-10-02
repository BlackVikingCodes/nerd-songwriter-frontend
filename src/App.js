import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'
import { useThemeContext } from './hooks/useThemeContext'

// pages & components
import Home from './pages/Home'
import NewSong from './pages/NewSong'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from './components/Navbar'

function App() {
  const { user } = useAuthContext()
  const { theme } = useThemeContext()

  document.body.id = {theme}

  return (
    <div className="App" id={theme}>
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="api/songs" 
              element={user ? <Home /> : <Navigate to="api/user/login" />} 
            />
            <Route 
              path="api/songs/:id" 
              element={user ? <NewSong /> : <Navigate to="api/user/login" />} 
            />
            <Route 
              path="api/user/login" 
              element={!user ? <Login /> : <Navigate to="api/songs" />} 
            />
            <Route 
              path="api/user/signup" 
              element={!user ? <Signup /> : <Navigate to="api/songs" />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
