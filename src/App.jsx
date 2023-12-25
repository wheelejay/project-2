import { useState } from 'react'
import './App.css'
import {Chart as chartjs} from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import nameAndDescription from '../pages/login-page/app-name-description'
import login from '../pages/login-page/login'
import createUser from '../pages/create-user-page/create-user-page'
import mainUserPage from '../pages/main-user-page/main-user-page'
import leaderBoardPage from '../pages/leader-board-page/leader-board-page';



function App() {
  const [count, setCount] = useState(0)

  return (leaderBoardPage()

  )
}

export default App
