import { useState } from "react";

export default function login() {

    return (
        <div>
            
                <h1>Fitness Chasers</h1>
                <h2>Helps you to stay dedicated on your weight loss journey</h2>
            
            <form>
                <label for="email">Email Address </label><br />
                <input type="text" id="email" autoComplete="off"></input><br />  <br />
                <label for="password">Password</label><br />
                <input type="text" id="password"></input><br />
                {/*TO DO input will need to be changed to a button for both login and createAccount */}
                <button>Login</button><br />
                <button>Create Account</button>
            </form>
        </div>
    )
};
