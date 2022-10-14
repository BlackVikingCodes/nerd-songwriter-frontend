import { useEffect } from "react"
import { useAppModeContext } from "../hooks/useAppModeContext"

// components
import About from '../components/About'
import Dashboard from '../components/Dashboard'

const Home = () => {
  const {appMode, setAppMode} = useAppModeContext()

  useEffect(() => {
    setAppMode('dashboard')
  
  }, [setAppMode])
  

  return (
    <div className="home">
      {(appMode==='dashboard') &&
        <section className="dashboard">
          <Dashboard />
        </section>
      }
      {(appMode==='about') &&
        <section className='about'>
          <About />
        </section>
      }
    </div>
  )
}

export default Home