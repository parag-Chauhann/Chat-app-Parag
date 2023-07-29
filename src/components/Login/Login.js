import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./Login.css";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/")
    } catch (err) {
      setErr(true);
    }
  };
  return (
    <div className="main">
      <div className="login">
        <div>
            <h3>Login</h3>
        </div>
        <div className="login-container">

        
        <form onSubmit={handleSubmit}>
        <h5>E-mail</h5>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <p>
              By continuing, you agree to <b>Parag's App</b> <Link to="/terms&conditions">Terms and Conditions</Link> of Use and <Link to="/terms&conditions">Privacy</Link> Notice.
            </p>
          <button className='login-signin-btn' >Sign in</button>
          {err && <span>Something went wrong</span>}
        </form>
        <h4>Create your account by Signing up</h4>

        <Link to="/signup">
          <button className='login-register-btn no-text-decoration' type='submit' style={{ textDecoration: 'none !important' }} >
            Sign Up
          </button>
        </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
