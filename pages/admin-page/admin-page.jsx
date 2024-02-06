import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate} from 'react-router-dom';


const AdminPage = () => {
  const [formData, setFormData] = useState({
    fName: '',
    lName: '',
    email: '',
    gWeight: ''
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const { userId } = useParams(); 
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/api/users/${userId}`;
    console.log('Data to send:', formData); 
    try {
      const response = await axios.patch(url, formData);
      console.log(response.data);
      
    } catch (error) {
      console.error('Error updating user:', error);
    
    }

  };
  const navigate = useNavigate();
  return (
    <div>
      <h1>Edit User</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fName">First Name:</label>
          <input
            type="text"
            id="fName"
            name="fName"
            value={formData.fName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="lName">Last Name:</label>
          <input
            type="text"
            id="lName"
            name="lName"
            value={formData.lName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="gWeight">Goal Weight:</label>
          <input
            type="number"
            id="gWeight"
            name="gWeight"
            value={formData.gWeight}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update User</button>
      </form>
      <br></br>
      <button onClick={() => navigate(`/mainUser/${userId}`)}>Return to Main Page</button>
    </div>
  );
};
export default AdminPage;