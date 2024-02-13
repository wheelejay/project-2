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
    const [sWeightTimestamp, setSWeightTimestamp] = useState(null);
    const navigate = useNavigate();
    const [chartData, setChartData] = useState([]);
    const chartRef = useRef(null);

    useEffect(() => {
        let isSubscribed = true;
        async function fetchData() {
            try {
                const [userResponse, weightsResponse] = await Promise.all([
                    axios.get(`/api/users/${userId}`),
                    axios.get(`/api/users/${userId}/weights`)
                ]);
                if (isSubscribed) {
                    setUser(userResponse.data.user);
                    setGoalWeight(userResponse.data.user.gWeight);
                    const sWeightDate = userResponse.data.user.sWeightTimestamp
                    ? new Date(userResponse.data.user.sWeightTimestamp)
                    : new Date();
                setSWeightTimestamp(sWeightDate);
                    if (weightsResponse.data && Array.isArray(weightsResponse.data.weights)) {
                        const sortedWeights = weightsResponse.data.weights.sort((a, b) => new Date(a.recordDate) - new Date(b.recordDate));
                        const chartWeights = [
                            { weight: userResponse.data.user.sWeight, recordDate: sWeightDate.toISOString() },
                            ...sortedWeights
                        ];
                        setWeights(sortedWeights);
                        setChartData(chartWeights);
                    } else {
                        console.log('Weights data is undefined or not an array.');
                    }
                }
            } catch (error) {
                console.error('Error loading user or weights:', error);
                if (isSubscribed) {
                  alert('Error loading user or weights.');
                }
            }
        }
        fetchData();
        const intervalId = setInterval(fetchData, 3000);
        return () => {
            isSubscribed = false;
            clearInterval(intervalId);
            const chartInstance = chartRef.current;
            if (chartInstance && chartInstance.chart) {
                chartInstance.chart.destroy();
            }
        };
    }, [userId]);

    const handleUpdateUserWeight = async (e) => {
        e.preventDefault();
        const weightNumber = parseFloat(weightValue);
        if (isNaN(weightNumber) || weightNumber <= 0) {
            alert('Please enter a valid weight.');
            return;
        }
        const submissionDate = new Date(startDate.setHours(0, 0, 0, 0));
        const existingEntry = weights.find((entry) => {
            const entryDate = new Date(new Date(entry.recordDate).setHours(0, 0, 0, 0));
            return entryDate.getTime() === submissionDate.getTime();
        });
        if (existingEntry) {
            alert('A weight for this date has already been submitted.');
            return;
        }
        try {
            const res = await axios.post(`/api/users/${userId}/weights`, {
                weight: weightNumber,
                recordDate: startDate.toISOString(),
            });
            console.log(res);
            fetchData();
        } catch (error) {
            console.error('Error submitting weight:', error);
        }
    };
    const handleDateChange = (recordDate) => {
        if (sWeightTimestamp && recordDate < sWeightTimestamp) {
            alert('Date is not valid. Please choose a date after your starting weight date.');
        } else {
            setStartDate(recordDate);
        }
    };
    const handleDeleteLastWeight = async () => {
        const confirmDelete = window.confirm('Are you sure you want to delete the latest weight entry?');
        if (confirmDelete) {
          try {
            const lastWeightId = weights.length > 0 ? weights[weights.length - 1].id : null;
            if (lastWeightId) {
              const res = await axios.delete(`/api/user_weights/${userId}/${lastWeightId}`);
              console.log(res);
              fetchData();
            } else {
              console.log('No weight entries to delete.');
              alert('No weight entries to delete.');
            }
          } catch (error) {
            console.error('Error deleting weight entry:', error);
          }
        }
      };
    return (
        <div>
            <h1>Hello, {user.fName}</h1>
            <form onSubmit={handleUpdateUserWeight}>
                <h3>New Submission</h3>
                Enter Date<br />
                <DatePicker
                    selected={startDate}
                    onChange={handleDateChange}
                    minDate={sWeightTimestamp}
                /><br />
                <label htmlFor="weight">Enter Weight</label><br />
                <input
                    type="text"
                    id="weight"
                    name="weight"
                    value={weightValue}
                    onChange={(e) => setWeightValue(e.target.value)}>
                </input><br />
                <button type="submit">Submit New Entry</button><br></br>
                <button type="button" onClick={handleDeleteLastWeight}>Delete Previous Weight Entry</button>
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