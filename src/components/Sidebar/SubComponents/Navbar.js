import { signOut } from "firebase/auth"
import React, { useContext } from 'react'
import { auth } from '../../../firebase'
import { AuthContext } from '../../ContextAPI/AuthContext'
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  const {currentUser} = useContext(AuthContext)

  return (
    <div className='navbar'>
      <Link to="/login">
        <img className='app-name' src="https://st2.depositphotos.com/27847728/43962/v/450/depositphotos_439624022-stock-illustration-initial-letter-logo-creative-typography.jpg" alt="logo" />
      </Link>

      <div className="navbar-container">
        <img src={currentUser.photoURL} alt="" />
        <span>{currentUser.displayName}</span>
        
        {currentUser ? (
          <>
            <h4>{currentUser.username}</h4>
            <Link to="/login">
              <div>
                <button onClick={() => signOut(auth)} className='login-out-btn'><b>Logout</b></button>
              </div>
            </Link>
          </>
        ) : (
          <Link to="/login">
            <div>
              <button className='login-out-btn'><b>Login</b></button>
            </div>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Navbar