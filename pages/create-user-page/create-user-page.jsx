import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateUser() {
    const [fnameValue, setFnameValue] = useState('');
    const [lnameValue, setLnameValue] = useState('');
    const [emailValue, setEmailValue] = useState('');
    const [passwordValue, setPaswordValue] = useState('');
    const [sweightValue, setSweightValue] = useState('');
    const [gweightValue, setGweightValue] = useState('');
    const navigate = useNavigate();

    const handleCreateUser = async(event, {fname, lname, email, password, sweight, gweight }) =>{
        event.preventDefault();
        const res = await axios.post('/api/users', {fname: fname, lname: lname, email: email, password: password, sweight: sweight, gweight: gweight });
        if (res.data){
            navigate("/")
        }
    }

    return (
        <div>
            <h1>Hello,</h1>
            {/* TO DO API for inspirational Fitness Quote*/}
            <h2>Inspirational Fitness Quote</h2>
            <form onSubmit={(e) => handleCreateUser(e, { fname: fnameValue, lname: lnameValue, email: emailValue, password: passwordValue, sweight: sweightValue, gweight: gweightValue })}>
                <label htmlFor="fname">First Name</label>
                <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={fnameValue}
                    onChange={(e) => setFnameValue(e.target.value)}>
                </input>{" "}
                <label htmlFor="lname">Last Name</label>
                <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={lnameValue}
                    onChange={(e) => setLnameValue(e.target.value)}>
                </input>{" "}
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}>
                </input>{" "}
                <label htmlFor="password">Password</label>
                <input
                    type="text"
                    id="password"
                    name="password"
                    value={passwordValue}
                    onChange={(e) => setPaswordValue(e.target.value)}>
                </input>{" "}
                <label htmlFor="sweight">Starting Weight</label>
                <input
                    type="text"
                    id="sweight"
                    name="sweight"
                    value={sweightValue}
                    onChange={(e) => setSweightValue(e.target.value)}>
                </input>{" "}
                <label htmlFor="gweight">Goal Weight</label>
                <input
                    type="text"
                    id="gweight"
                    name="gweight"
                    value={gweightValue}
                    onChange={(e) => setGweightValue(e.target.value)}>
                </input>{" "}
                <button type="submit">Create Account</button>
            </form>
        </div>
    );
}