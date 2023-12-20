import { useState } from "react";

export default function createUser() {

    return (
<div>
    <h1>Hello,</h1>
    {/* TO DO API for inspirational Fitness Quote*/}
    <h2>Inspirational Fitness Quote</h2>
    <form>
        <label for="fname">First Name</label>
        <input type="text" id="fname"></input>{" "}
        <label for="lname">Last Name</label>
        <input type="text" id="lname"></input>{" "}
        <label for="email">Email</label>
        <input type="text" id="email"></input><br /><br />
        <label for="password">Password</label>
        <input type="text" id="password"></input>{" "}
        <label for="sweight">Starting Weight</label>
        <input type="text" id="sweight"></input>{" "}
        <label for="gweight">Goal Weight</label>
        <input type="text" id="gweight"></input><br /><br />
        <button>Create Account</button>
    </form>
</div>
    )
}