import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import weeklyWeightData from "/src/weeklyWeightData.json";
import { Chart as chartjs, defaults } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import '/src/style.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";

defaults.maintainAspectRatio = false;
defaults.responsive = true;
defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "white";

export default function MainUserPage() {
    const [user, setUser] = useState({});
    const [weights, setWeights] = useState([]);
    const { userId } = useParams();
    const [startDate, setStartDate] = useState(new Date());
    const [weightValue, setWeightValue] = useState('');
    const [goalWeight, setGoalWeight] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const loadUserAndWeights = async () => {
            try {
                const [userResponse, weightsResponse] = await Promise.all([
                    axios.get(`/api/users/${userId}`),
                    axios.get(`/api/users/${userId}/weights`)
                ]);
                setUser(userResponse.data.user);
                setGoalWeight(userResponse.data.user.gWeight);
                if (weightsResponse.data && Array.isArray(weightsResponse.data.weights)) {
                    setWeights(weightsResponse.data.weights);
                    if(weightsResponse.data.weights.length > 0){
                        setWeightValue(weightsResponse.data.weights.slice(-1)[0].weight);
                    }
                } else {
                    console.log('Weights data is undefined or not an array.');
                }
            } catch (error) {
                console.error('Error loading user or weights:', error);
            }
        };
        loadUserAndWeights();
    }, [userId]);
    
    const handleUpdateUserWeight = async (e) => {
        e.preventDefault();
        const res = await axios.post(`/api/users/${userId}/weights`, {weight: weightValue, recordDate: startDate.toISOString()});
        console.log(res)
    };

    return (
        <div>
            <h1>Hello, {user.fName}</h1>
            <h2>Inspirational Fitness Quote</h2>
            <form onSubmit={handleUpdateUserWeight}>
                <h3>New Submission</h3>
                Enter Date<br />
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} /><br />
                <label htmlFor="weight">Enter Weight</label><br />
                <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}>
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
    <label htmlFor="gweight">Goal Weight</label><br />
    <input
        type="text"
        id="gweight"
        name="gWeight"
        value={goalWeight}
        readOnly={true}
    /><br /><br />
<br /><br />
<button onClick={() => navigate(`/mainUser/${userId}/adminPage/`)}>Edit Personal Info</button>
        </div>
    );
}