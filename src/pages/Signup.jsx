import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [strongPassword, setStrongPassword] = useState(false)
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(userName, password)
  }

  useEffect(() => {
    let regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
    if(regexPass.test(password) && password.length>=8){
      setStrongPassword(true)
    } else{
      setStrongPassword(false)
    }
  
  }, [password])

  return (
    <div className="auth-container">
      <form className="signup" onSubmit={handleSubmit}>
        <h3>Sign Up</h3>
      
        <label>User Name:</label>
        <input
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <label>Password:</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <button className="btn btn-signup" disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
        {(error && !strongPassword) &&
          <div className="error error-password">
            <p>Your password isn't strong enough. <br/> Make sure to have:</p>
            <ul>
              <li>At least one uppercase letter</li>
              <li>At least one number</li>
              <li>At least one symbol</li>
            </ul>
          </div>
        }
        <br/>
        <Link to="/login">
          Already have an account?
        </Link>
      </form>
    </div>
  )
}

export default Signup