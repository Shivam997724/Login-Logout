import React, { useState } from 'react'
import './Login.css'
// import Input from '../Inputcontrol/Input'
import { useNavigate } from 'react-router-dom'
import { database } from '../Firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


const Login = () => {
  const [login, setLogin] = useState(false)
  const history = useNavigate();

  const handleSubmit = (e, type) => {
    e.preventDefault()
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (type === 'signup') {
      createUserWithEmailAndPassword(database, email, password).then(data => {
        console.log(data, "authdata");
        history('/form')
      }).catch(err => {
        alert(err.code)
        setLogin(true)
      })
    } else {
      signInWithEmailAndPassword(database, email, password).then(data => {
        console.log(data, "authdata");
        history('/form')
      }).catch(err => {
        alert(err.code)
      })
    }
  }
  return (<>

    <div className='Container'>

      <div className='innerBox'>
        <div style={{ display: "flex", justifyContent: "space-evenly", fontSize: "20px", fontWeight: "bold" }}>
          <div className={login === false ? 'activeColor' : 'poiter'} onClick={() => setLogin(false)}>signup</div>
          <div className={login === true ? 'activeColor' : 'poiter'} onClick={() => setLogin(true)} >Login</div>
        </div>
        <h1 className='heading'>{login ? 'Login' : 'signup'}</h1>
        <form onSubmit={(e) => handleSubmit(e, login ? 'Login' : 'signup')}>
          <label htmlFor="">Email</label><br />
          <input type="text" name='email' placeholder='enter your email' required /><br />
          <label htmlFor="">Password</label><br />
          <input type="text" name='password' placeholder='enter your Password' required/><br />
          <button className='bttn my-3'>{login ? 'Login' : 'signup'}</button>
        </form>

      </div>
    </div>
  </>
  )
}

export default Login