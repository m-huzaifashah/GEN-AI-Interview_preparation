import React, { useState } from 'react'
import '../auth.form.scss'
import { useNavigate,Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import Login from './Login'
const Register = () => {

  const {loading,handleRegister}=useAuth()

const [registerData,setRegisterData]=useState({
  username:"",
  email:"",
  password:""
})  

const handleDataChange=(e)=>{
  const {name,value}=e.target

  setRegisterData((prev)=>({
    ...prev,
    [name]:value
  }))
}



const handleSubmit=async(e)=>{
  e.preventDefault()
await handleRegister({
  username:registerData.username,
  email:registerData.email,
  password:registerData.password}
)
}

if(loading){
  return(<main><h1>loading...</h1></main>)
}

return (
    <main>
<div className='form-container'>
<h1>Register</h1>

<form onSubmit={handleSubmit}>


<div className='input-group'>
<label htmlFor='username'>username</label>
<input type='text' id='username' name='username' value={registerData.username} onChange={handleDataChange} placeholder='Enter your username' />
</div>


<div className='input-group'>
<label htmlFor='email'>Email</label>
<input type='email' id='email' name='email' value={registerData.email} onChange={handleDataChange} placeholder='Enter your email' />
</div>

<div className='input-group'>
<label htmlFor='password'>password</label>
<input type='password' id='password' name='password' value={registerData.password} onChange={handleDataChange} placeholder='Enter your password' />
</div>

<button className='button primary-button'>Register</button>
</form>

<p>Already have an account? <Link to={'/login'}>Login</Link> </p>

</div>

    </main>
  )
}

export default Register