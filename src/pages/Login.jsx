import { useState, useEffect } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [strongPassword, setStrongPassword] = useState(false)
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(userName, password)
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
    <form className="login" onSubmit={handleSubmit}>
      <h3>Log In</h3>
      
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
      {!strongPassword && 
        <div>
          <p>Your password isn't strong enough. <br/> Make sure to have:</p>
          <ul>
            <li>At least one uppercase letter</li>
            <li>At least one number</li>
            <li>At least one symbol</li>
          </ul>
        </div>
      }

      <button className="btn btn-login" disabled={isLoading||!strongPassword}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login