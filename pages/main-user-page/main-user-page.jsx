import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Chart as chartjs, defaults } from "chart.js/auto";
import { Line } from 'react-chartjs-2';
import '/src/style.css';
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { useNavigate } from "react-router-dom";
import 'moment';
import 'chartjs-adapter-moment';

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
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        let isSubscribed = true;
        let intervalId;
        async function fetchData() {
            try {
                const [userResponse, weightsResponse] = await Promise.all([
                    axios.get(`/api/users/${userId}`),
                    axios.get(`/api/users/${userId}/weights`)
                ]);
                if (isSubscribed) {
                    const chartInstance = chartRef.current;
                    if (chartInstance && chartInstance.chart) {
                        chartInstance.chart.destroy(); 
                    }
                    setUser(userResponse.data.user);
                    setGoalWeight(userResponse.data.user.gWeight);
                    
                    if (weightsResponse.data && Array.isArray(weightsResponse.data.weights)) {
                        const sortedWeights = weightsResponse.data.weights.sort((a, b) => new Date(a.recordDate) - new Date(b.recordDate));
                        setWeights(sortedWeights);
                        setChartData(sortedWeights);
                    } else {
                        console.log('Weights data is undefined or not an array.');
                    }
                }
            } catch (error) {
                console.error('Error loading user or weights:', error);
            }
        }
        intervalId = setInterval(fetchData, 3000);
        return () => {
            isSubscribed = false;
            const chartInstance = chartRef.current;
            if (chartInstance && chartInstance.chart) {
                chartInstance.chart.destroy(); 
            }
        };
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
                <DatePicker selected={startDate} onChange={(recordDate) => setStartDate(recordDate)} /><br />
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
                <Line
                ref={chartRef}
                data={{
    labels: chartData.map((items) => 
        new Date(items.recordDate).toLocaleDateString('en-CA')
    ),
    datasets: [
        {
            label: user.fName,
            data: chartData.map((items) => items.weight),
            backgroundColor: "blue",
            borderColor: "blue",
        }
    ]
}}
options={{
    scales: {
        x: {
            type: 'time',
            time: {
                unit: 'day',
                displayFormats: {
                    day: 'MMM DD, YY'
                }
            },
        }
    },
    plugins: {
        title: {
            text: "Personal Weight Loss Progress"
        },
        legend: {
            position: 'bottom'
        },
    },
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