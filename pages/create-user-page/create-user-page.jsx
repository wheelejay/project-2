import { useState } from "react";

export default function createUser() {

    return (
<div>
    <h1>Hello,</h1>
    {/* API for inspirational Fitness Quote*/}
    <h2>Inspirational Fitness Quote</h2>
    <form>
        <label for="fname">First Name</label>
        <input type="text" id="fname"></input>
        <label for="lname">Last Name</label>
        <input type="text" id="lname"></input>
        <label for="email">Email</label>
        <input type="text" id="email"></input><br /><br />
        <label for="password" id="password">Password</label>
        <input ></input>
    </form>
</div>
    )
}