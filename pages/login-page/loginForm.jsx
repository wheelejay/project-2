import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import React from 'react'




export default function Login() {
  const navigate = useNavigate();
  const navigateToCreateUserPage = () => { navigate("/createUserPage"); };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { email, password });
      console.log(response.data);

    } catch (error) {
      console.error('Login failed:', error);
      // Handle error case
    }
  };


  return (
    <div>
      <h1>Fitness Chasers</h1>
      <h2>Helps you to stay dedicated on your weight loss journey</h2>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email Address </label><br />
        <input type="text" id="email" autoComplete="off" onChange={(e) => setEmail(e.target.value)} /><br /><br />
        <label htmlFor="password">Password</label><br />
        <input type="password" id="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />
        <button type="submit">Login</button><br />
      </form>
      <button onClick={navigateToCreateUserPage}>Create Account</button>
    </div>

  );
};