import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
const AdminPage = () => {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [gWeight, setGWeight] = useState('');
  const [password, setPassword] = useState('');
  const { userId } = useParams();
  const navigate = useNavigate();
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  const validatePassword = (password) => {
    return password.length >= 6;
  };
  const updateUserField = async (field, value) => {
    if (field === 'email' && !validateEmail(value)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (field === 'password' && !validatePassword(value)) {
      alert("Please create a password at least 6 characters long.");
      return;
    }
    
    const url = `/api/users/${userId}`;
    console.log(`Data to send: ${field}: ${value}`);
    
    try {
      const response = await axios.patch(url, { [field]: value });
      console.log(response.data);
      alert(`User ${field} updated successfully.`);
    } catch (error) {
      console.error(`Error updating user's ${field}:`, error);
      alert(`Error updating user's ${field}.`);
    }
  };
  const handleUpdateFName = (e) => {
    e.preventDefault();
    updateUserField('fName', fName);
  };
  const handleUpdateLName = (e) => {
    e.preventDefault();
    updateUserField('lName', lName);
  };
  const handleUpdateEmail = (e) => {
    e.preventDefault();
    updateUserField('email', email);
  };
  const handleUpdateGWeight = (e) => {
    e.preventDefault();
    updateUserField('gWeight', gWeight);
  };
  const handleUpdatePassword = (e) => {
    e.preventDefault();
    updateUserField('password', password);
  };
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }
    try {
      const userWeightsResponse = await axios.delete(`/api/user_weights/${userId}`);
      const response = await axios.delete(`/api/users/${userId}`);
      alert('User deleted successfully.');
      navigate('/');
    } catch (error) {
      console.error(error.response ? error.response.data : error.message);
      alert('Failed to delete the user.');
    }
  };
  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleUpdateFName}>
        <div>
          <label htmlFor="fName">First Name:</label>
          <input
            type="text"
            id="fName"
            name="fName"
            value={fName}
            onChange={(e) => setFName(e.target.value)}
          />
          <button type="submit">Update First Name</button>
        </div>
      </form>
      <form onSubmit={handleUpdateLName}>
        <div>
          <label htmlFor="lName">Last Name:</label>
          <input
            type="text"
            id="lName"
            name="lName"
            value={lName}
            onChange={(e) => setLName(e.target.value)}
          />
          <button type="submit">Update Last Name</button>
        </div>
      </form>
      <form onSubmit={handleUpdateEmail}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Update Email</button>
        </div>
      </form>
      <form onSubmit={handleUpdateGWeight}>
        <div>
          <label htmlFor="gWeight">Goal Weight:</label>
          <input
            type="number"
            id="gWeight"
            name="gWeight"
            value={gWeight}
            onChange={(e) => setGWeight(e.target.value)}
          />
          <button type="submit">Update Goal Weight</button>
        </div>
      </form>
      <form onSubmit={handleUpdatePassword}>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Update Password</button>
        </div>
      </form>
      <button onClick={handleDelete}>Delete User</button>
      <button onClick={() => navigate(`/mainUser/${userId}`)}>Return to Main Page</button>
    </div>
  );
};
export default AdminPage;