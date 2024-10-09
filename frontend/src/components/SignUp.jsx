import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = localStorage.getItem('user');
    if (auth) {
      navigate('/')
    }
  })


  const collectData = async () => {
    console.log(name, email, password);
    let result = await fetch('http://localhost:5000/register', {
      method: 'post',
      body: JSON.stringify({ name, email, password }),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    result = await result.json()
    console.log(result);
    localStorage.setItem('user', JSON.stringify(result.result));
    localStorage.setItem('token', JSON.stringify(result.auth));
    navigate('/')
  }

  return (
    <div className="signup">
      <h2>Register</h2>
      <input
        className="input-box"
        onChange={e => setName(e.target.value)}
        value={name}
        type="text"
        placeholder="Enter Name"
      />

      <input
        onChange={e => setEmail(e.target.value)}
        value={email}
        className="input-box"
        type="email"
        placeholder="Enter Email"
      />

      <input
        onChange={e => setPassword(e.target.value)}
        value={password}
        className="input-box"
        type="password"
        placeholder="Enter Password"
      />

      <button
        className="app-button"
        type="button"
        onClick={collectData}
      >
        Sign Up
      </button>

    </div>
  )
}

export default SignUp;