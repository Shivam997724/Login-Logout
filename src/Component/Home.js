import React from 'react'
import { useNavigate} from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { database } from './Firebase'


const Home = (props) => {
 
  const history = useNavigate()
  const handleClick =()=>{
    signOut(database).then(val=>{
      console.log(val,"val");
      history('/')
    })
  }
  return (
    <div className="my-5" style={{textAlign:"center"}}>
      <h1 >Home</h1>
      {/* <h1>
      <NavLink  to="/login"> Login</NavLink> 
      </h1> */}
      <button className="my-4 " onClick={handleClick}>Signout</button>
      {/* <h1>
      <NavLink  to="/signup">Signup</NavLink> 
      </h1> */}

      {/* <h2>{props.name ?`Welcome -${props.name}`:"Login Please"}</h2> */}
    </div>
  )
}

export default Home