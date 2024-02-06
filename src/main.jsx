import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createRoutesFromElements, createBrowserRouter } from 'react-router-dom'
import CreateUser from '../pages/create-user-page/create-user-page.jsx'
import Login from '../pages/login-page/loginForm.jsx'
import MainUserPage from '../pages/main-user-page/main-user-page.jsx'
import AdminPage from '../pages/admin-page/admin-page.jsx'
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      {/* Login Page */}
      <Route
        index
        element={< Login />}
      />
      {/*Create User Page */}     
       <Route
        path="/createUserPage"
        element={< CreateUser />}
      />
      {/*Main User Page */}
      <Route
        path="/mainUser/:userId"
        element={< MainUserPage />}
      />
      {/*Admin Page */}
      <Route
        path="/mainUser/:userId/adminPage"
        element={< AdminPage />}
      />
    </Route>,
  ),
);
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
