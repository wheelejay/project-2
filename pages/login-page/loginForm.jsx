import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data: { user } } = await axios.post('/api/login', { email, password });
      navigate(`/mainUser/${user.id}`);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials and try again.');
    }
  };
  const navigateToCreateUserPage = () => {
    navigate("/createUserPage");
  };
  return (
    <div>
      <h1>Fitness Chasers</h1>
      <h2>Helps you to stay dedicated on your weight loss journey</h2>
      <form onSubmit={handleLogin}>
      <input 
  type="text"
  className="block border border-grey-light w-full p-3 rounded mb-4"
  name="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/><br></br>
<input 
  type="password"
  className="block border border-grey-light w-full p-3 rounded mb-4"
  name="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/><br></br><br/>
        <button type="submit">Login</button><br/>
      </form>
      <button onClick={navigateToCreateUserPage}>Create Account</button>
    </div>
  );
};