import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useState, useEffect } from "react";


function Statistics() {

  const [trainings, setTrainings] = useState([]);

  const getTrainings = () => {
    fetch("https://traineeapp.azurewebsites.net/gettrainings")
      .then((response) => response.json())
      .then((data) => setTrainings(data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getTrainings();
  }, []);

  const activityDurations = {};

  
  trainings.forEach((training) => {
    if (activityDurations[training.activity]) {
      activityDurations[training.activity] += training.duration;
    } else {
      activityDurations[training.activity] = training.duration;
    }
  });

  
  const chartData = Object.keys(activityDurations).map((activity) => ({
    name: activity,
    duration: activityDurations[activity],
  }));

  return (
    <div style={{ width: "800px", margin: "auto" }}>
      <h1>Statistics of activities</h1>
      <BarChart
        width={700}
        height={400}
        data={chartData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="duration" fill="#8884d8" />
      </BarChart>
    </div>
  );
}

export default Statistics;
