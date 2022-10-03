import { useState } from "react"
import { useSignup } from "../hooks/useSignup"

const Signup = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [prePassword, setPrePassword] = useState('')
  const [strongPassword, setStrongPassword] = useState(false)
  const {signup, error, isLoading} = useSignup()

  const handleSubmit = async (e) => {
    e.preventDefault()

    await signup(userName, password)
  }

  let regexPass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\W)/
  if(regexPass.test(prePassword)){
    setStrongPassword(true)
    setPassword(prePassword)
  }

  return (
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
        onChange={(e) => setPrePassword(e.target.value)} 
        value={prePassword} 
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

      <button className="btn btn-signup" disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default Signup