import { useState } from "react";
import weeklyWeightData from "/src/weeklyWeightData.json";
import { Chart as chartjs, defaults } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import '/src/style.css';

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "white";



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
            <div className="progressOverTime">
                <Line data={{
                    labels: weeklyWeightData.map((data) => data.week),
                    datasets: [
                        {
                            label: "User1",
                            data: weeklyWeightData.map((data) => data.user1),
                            backgroundColor: "blue",
                            borderColor: "blue",
                        }
                    ]
                }}
                    options={{
                        plugins: {
                            title: {
                                text: "Personal Weight Loss Progress"
                            }
                        }
                    }}
                />
            </div><br /><br />
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