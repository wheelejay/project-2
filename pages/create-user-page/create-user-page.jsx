import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export default function CreateUser() {
    const [fnameValue, setFnameValue] = useState('');
    const [lnameValue, setLnameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    const [sweightValue, setSweightValue] = useState('');
    const [gweightValue, setGweightValue] = useState('');
    const navigate = useNavigate();
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    const validatePassword = (password) => {
        return password.length >= 6;
    };
    const handleCreateUser = async (event) => {
        event.preventDefault();
        if (!validateEmail(emailValue)) {
            alert("Please enter a valid email address.");
            return;
        }
        if (!validatePassword(passwordValue)) {
            alert("Please create a password at least 6 characters long.");
            return;
        }
        try {
            const res = await axios.post('/api/users', {
                fname: fnameValue,
                lname: lnameValue,
                email: emailValue,
                password: passwordValue,
                sweight: sweightValue,
                gweight: gweightValue,
                gweightTimestamp: new Date().toISOString()
            });
            if (res.data) {
                navigate("/");
            }
        } catch (error) {
            console.error("There was an error creating the user:", error);
        }
    };
    return (
        <div>
            <h1>Create User</h1>
            <form onSubmit={handleCreateUser}>
                <label htmlFor="fname">First Name</label>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={fnameValue}
                    onChange={(e) => setFnameValue(e.target.value)}
                />
                <label htmlFor="lname">Last Name</label>
                <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={lnameValue}
                    onChange={(e) => setLnameValue(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password" 
                    id="password"
                    name="password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                />
                <label htmlFor="sweight">Starting Weight</label>
                <input
                    type="number" 
                    id="sweight"
                    name="sweight"
                    value={sweightValue}
                    onChange={(e) => setSweightValue(e.target.value)}
                />
                <label htmlFor="gweight">Goal Weight</label>
                <input
                    type="number" 
                    id="gweight"
                    name="gweight"
                    value={gweightValue}
                    onChange={(e) => setGweightValue(e.target.value)}
                />
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}