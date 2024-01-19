import { useState, useEffect } from "react";
import { styleSheet, View } from "react";
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


export default function LeaderBoardPage() {

    //Functions for Leader board
    const [percentDifferences, setPercentDifferences] = useState({});
    useEffect(() => {
        const firstWeek = weeklyWeightData[0];
        const lastWeek = weeklyWeightData[weeklyWeightData.length - 1];
        let differences = {};
        Object.keys(firstWeek).forEach(key => {
            if (key !== 'week') {
                const startWeight = firstWeek[key];
                const endWeight = lastWeek[key];
                differences[key] = ((endWeight - startWeight) / startWeight * 100).toFixed(2);
            }
        });
        const sortedDifferences = Object.entries(differences).sort((a, b) => a[1] - b[1]);
        setPercentDifferences(Object.fromEntries(sortedDifferences));
    }, []);

    return (
        <div>
            <h1>Leader Board</h1>
            <h2>Inspirational Fitness Quote</h2>
            {/* Place for inspirational fitness quote after fetching from an API */}

            <div className="progressOverTime">
                <Line data={{
                    labels: weeklyWeightData.map((data) => data.week),
                    datasets: [
                        {
                            label: "User1",
                            data: weeklyWeightData.map((data) => data.user1),
                            backgroundColor: "blue",
                            borderColor: "blue",
                        },
                        {
                            label: "User2",
                            data: weeklyWeightData.map((data) => data.user2),
                            backgroundColor: "green",
                            borderColor: "green",
                        },
                        {
                            label: "User3",
                            data: weeklyWeightData.map((data) => data.user3),
                            backgroundColor: "red",
                            borderColor: "red",
                        }
                    ]
                }}
                    options={{
                        plugins: {
                            title: {
                                text: "Progress Over Time"
                            }
                        }
                    }}
                />
            </div><br /><br />
            <h3>Leader Board</h3>
            <div className="leaderBoard">
                <div className="leaderBoardColumn">
                    <span className="header">Name</span>
                    <ol>
                        {Object.entries(percentDifferences).map(([user], index) => (
                            <li key={user}>
                                <span className="leaderBoardNumber">{index + 1}.</span> {user}
                            </li>
                        ))}
                    </ol>
                </div>
                <div className="leaderBoardColumn">
                    <span className="header">Percent Loss</span>
                    <ol>
                        {Object.entries(percentDifferences).map(([user, percent]) => (
                            <li key={user}>{percent}</li>
                        ))}
                    </ol>
                </div>
            </div>
            <br /><br /><button>Return to Your Page</button><br /><br />
        </div>
    );
}