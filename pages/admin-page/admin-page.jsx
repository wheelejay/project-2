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
    <div className="container max-w-full md:max-w-md mx-auto pt-10">
      <h1 className="text-3xl text-center mb-10">Edit User</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
        {/* First Name */}
        <input
          type="text"
          className="border border-grey-light w-full p-3 rounded mb-4"
          name="fname"
          placeholder="First Name"
          value={fName}
          onChange={(e) => setFName(e.target.value)}
        />
        <button
          onClick={handleUpdateFName}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Update First Name
        </button>

        {/* Last Name */}
        <input
          type="text"
          className="border border-grey-light w-full p-3 rounded mb-4"
          name="lname"
          placeholder="Last Name"
          value={lName}
          onChange={(e) => setLName(e.target.value)}
        />
        <button
          onClick={handleUpdateLName}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Update Last Name
        </button>
        {/* Email */}
        <input
          type="text"
          className="border border-grey-light w-full p-3 rounded mb-4"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          onClick={handleUpdateEmail}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Update Email
        </button>
        {/* Goal Weight */}
        <input
          type="number"
          className="border border-grey-light w-full p-3 rounded mb-4"
          name="gweight"
          placeholder="Goal Weight"
          value={gWeight}
          onChange={(e) => setGWeight(e.target.value)}
        />
        <button
          onClick={handleUpdateGWeight}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Update Goal Weight
        </button>
        {/* Password */}
        <input
          type="password"
          className="border border-grey-light w-full p-3 rounded mb-4"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleUpdatePassword}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >Update Password
        </button>
        <div></div>

      </div>
      {/* Delete User */}
      <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Delete User
      </button>
      {/* Return to Main Page */}
      <button onClick={() => navigate(`/mainUser/${userId}`)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
        Return to Main Page
      </button>
    </div>
  );
};
export default AdminPage;