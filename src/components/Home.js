import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [logData, setLogData] = useState([]);
  const [totalLogs, setTotalLogs] = useState(0);
  const [averageSeverity, setAverageSeverity] = useState(0);
  const [latestWeather, setLatestWeather] = useState('');

  useEffect(() => {
    if (logData.length > 0) {
      setTotalLogs(logData.length);
      setAverageSeverity(
        logData.reduce((acc, curr) => acc + curr.severity, 0) / logData.length
      );
      setLatestWeather(logData[logData.length - 1]?.weather?.description || 'N/A');
    }
  }, [logData]);

  const navigate = useNavigate();

  return (
    <div className="home container mt-4">
      <h1 className="text-center">Dashboard Overview</h1>
      <div className="row">
        <div className="col-md-4">
          <div className="card p-3">
            <h3>Total Logs</h3>
            <p>{totalLogs} days tracked</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h3>Average Acne Severity</h3>
            <p>{averageSeverity.toFixed(1)} / 5</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h3>Latest Weather Condition</h3>
            <p>{latestWeather}</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <button className="btn btn-primary" onClick={() => navigate('/daily-tracker')}>
          Go to Daily Tracker
        </button>
      </div>
    </div>
  );
};

export default Home;
