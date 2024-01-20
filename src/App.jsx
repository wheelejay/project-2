import { useState } from 'react'
import './App.css'
import { Chart as chartjs } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import Login from '../pages/login-page/loginForm';
import CreateUser from '../pages/create-user-page/create-user-page'
import MainUserPage from '../pages/main-user-page/main-user-page'
import LeaderBoardPage from '../pages/leader-board-page/leader-board-page';
import { NavLink, Outlet, Routes, Route } from 'react-router-dom';
function App() {
  const [count, setCount] = useState(0);
  return (
    <Outlet/>
   )
};

export default App;