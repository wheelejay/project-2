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
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    <form onSubmit={handleCreateUser}>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="fname"
                            placeholder="First Name"
                            value={fnameValue}
                            onChange={(e) => setFnameValue(e.target.value)}
                        />
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="lname"
                            placeholder="Last Name"
                            value={lnameValue}
                            onChange={(e) => setLnameValue(e.target.value)}
                        /><br></br>
                        <input 
                            type="text"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="email"
                            placeholder="Email"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                        />
                        <input 
                            type="password"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="password"
                            placeholder="Password"
                            value={passwordValue}
                            onChange={(e) => setPasswordValue(e.target.value)}
                        /><br></br>
                        <input 
                            type="number"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="sweight"
                            placeholder="Starting Weight"
                            value={sweightValue}
                            onChange={(e) => setSweightValue(e.target.value)}
                        />
                        <input 
                            type="number"
                            className="block border border-grey-light w-full p-3 rounded mb-4"
                            name="gweight"
                            placeholder="Goal Weight"
                            value={gweightValue}
                            onChange={(e) => setGweightValue(e.target.value)}
                        /><br></br>
                        <button
                            type="submit"
                            className="w-full text-center py-3 rounded bg-green text-white hover:bg-green-dark focus:outline-none my-1"
                        >Create Account</button>
                    </form>
                </div><br></br>
                <div className="text-grey-dark mt-6">
                    Already have an account? 
                    <a className="no-underline border-b border-blue text-blue" href="../">
                        Log in
                    </a>
                </div>
            </div>
        </div>
    );
}