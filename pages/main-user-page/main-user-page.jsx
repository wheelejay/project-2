import { useState } from "react";

export default function mainUserPage() {

    return (
        <div>
            {/* TO DO create custom greeting with users first name*/}
            <h1>Hello, First Name</h1>
            {/* TO DO API for inspirational Fitness Quote*/}
            <h2>Inspirational Fitness Quote</h2>
            <button>Add New Submission</button><br /><br />
            <label for="lentry">Last Entry</label><br />
            {/* TO DO input data using the last data point recorded*/}
            <input type="text" id="lentry" value="Last data point entered"></input><br /><br />
            <label for="pchart">Personal Weight Loss Progress</label><br />
            {/* TO DO create graph that charts the progress of weight loss over time*/}
            <div></div><br /><br />
            <label for="gweight">Goal Weight</label><br />
             {/* TO DO insert goal weight */}
            <input type="text" id="gweight" value="Goal Weight Value"></input><br /><br />
             {/* TO DO button will take user to leaderboard page*/}
            <button>Leader Board</button>{"          "}
            <label for="timeleft">Time left in Competition</label>
             {/* TO DO count down timer for the time left in the competition*/}
            <input type="text" id="timeleft" value="DAYS:HOURS:MIN:SEC"></input><br /><br />

        </div>
    )
}