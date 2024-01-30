import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import weeklyWeightData from "/src/weeklyWeightData.json";
import { Chart as chartjs, defaults } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import '/src/style.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css'


defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "white";

export default function MainUserPage() {
    const [user, setUser] = useState({});
    const { userId } = useParams();
    const [date, setDate] = useState(new Date());
    const [entryWeightValue, setEntryWeightValue] = useState('');
    const handleUpdateUserWeight = async (event, { date, entryWeight }) => {
        event.preventDefault();
        //post route to userWeight data table
    }
    const userIsEmpty = Object.keys(user).length === 0;

    useEffect(() => {
        const loadAsync = async () => {
            const { data: { user } } = await axios.get(`/api/users/${userId}`);
            setUser(user);
        }
        if (userIsEmpty) {
            loadAsync()
        }
    }, [userId, userIsEmpty])

    if (userIsEmpty) {
        return (
            <div>loading...</div>
        )
    }

    return (
        <div>
            {/* TO DO create custom greeting with users first name*/}
            <h1>Hello, {user.fName}</h1>
            {/* TO DO API for inspirational Fitness Quote*/}
            <h2>Inspirational Fitness Quote</h2>
            <form onSubmit={(e) => handleUpdateUserWeight(e, {date: dateValue, entryWeight: entryWeightValue})}>
                <h3>New Submission</h3>
               Enter Date<br /> 
               <DatePicker selected={date} onChange={(date) => setDate(date)} /><br />
                <label for="weightEntry">Enter Weight</label><br />
                {/* TO DO input data using the last data point recorded*/}
                <input
                    type="text"
                    id="weightEntry"
                    name="weightEntry"
                    value={entryWeightValue}
                    onChange={(e) => setEntryWeightValue(e.target.value)}>
                    </input><br />
                    <button type="submit">Submit New Entry</button>
            </form><br /><br />
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
            <input type="text" id="gweight" value={user.gWeight}></input><br /><br />
            {/* TO DO button will take user to leaderboard page*/}
            <button>Edit Personal Info</button>{"          "}

        </div>
    )
}