import { useState } from "react"
import { useLogin } from "../hooks/useLogin"

const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const {login, error, isLoading} = useLogin()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await login(userName, password)
  }

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

      <button className="btn btn-login" disabled={isLoading}>Log in</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Login