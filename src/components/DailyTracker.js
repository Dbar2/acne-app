import React, { useState } from 'react';
import './DailyTracker.css';

const DailyTracker = () => {
  const [diet, setDiet] = useState('');
  const [sleep, setSleep] = useState('');
  const [severity, setSeverity] = useState(0);
  const [image, setImage] = useState(null);
  const [notes, setNotes] = useState('');
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');
  const [logData, setLogData] = useState([]);

  const fetchWeather = async (location) => {
    try {
      const apiKey = '91a84a3b446a0282045881e282bbafc0';
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`
      );
      const data = await response.json();
      setWeather({
        temp: data.main.temp,
        humidity: data.main.humidity,
        description: data.weather[0].description,
      });
    } catch (error) {
      alert('Failed to fetch weather data. Please try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = { diet, sleep, severity, image, notes, weather };
    setLogData([...logData, formData]);

    setDiet('');
    setSleep('');
    setSeverity(0);
    setImage(null);
    setNotes('');
    setLocation('');
    setWeather(null);
  };

  return (
    <div className="daily-tracker container mt-4">
      <h1 className="text-center">Daily Acne Tracker</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Location (for Weather)</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="form-control"
            placeholder="Enter your city"
          />
        </div>
        <button
          type="button"
          onClick={() => location && fetchWeather(location)}
          className="btn btn-primary mt-2"
        >
          Get Weather Data
        </button>

        {weather && (
          <div className="weather-info mt-4">
            <h3>Weather Info:</h3>
            <p>Temperature: {weather.temp}°C</p>
            <p>Humidity: {weather.humidity}%</p>
            <p>Conditions: {weather.description}</p>
          </div>
        )}

        <div className="form-group">
          <label>Diet (Optional)</label>
          <input
            type="text"
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            className="form-control"
            placeholder="What did you eat today?"
          />
        </div>

        <div className="form-group">
          <label>Sleep Schedule (Optional)</label>
          <input
            type="number"
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            className="form-control"
            placeholder="How many hours did you sleep?"
          />
        </div>

        <div className="form-group">
          <label>Acne Severity (Optional)</label>
          <input
            type="range"
            className="form-control-range"
            min="1"
            max="5"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
          />
          <span>{severity}</span>
        </div>

        <div className="form-group">
          <label>Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-control"
            placeholder="Any additional notes?"
          />
        </div>

        <div className="form-group">
          <label>Upload a photo (Optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
            className="form-control"
          />
          {image && <img src={image} alt="Uploaded acne image" className="mt-2" />}
        </div>

        <button type="submit" className="btn btn-success btn-block mt-3">
          Log Today’s Data
        </button>
      </form>

      <h2>Logged Data</h2>
      <div>
        {logData.length === 0 ? (
          <p>No data logged yet.</p>
        ) : (
          <ul>
            {logData.map((entry, index) => (
              <li key={index}>
                <p><strong>Location:</strong> {entry.location}</p>
                <p><strong>Weather:</strong> {entry.weather ? `Temp: ${entry.weather.temp}°C, Humidity: ${entry.weather.humidity}%` : 'No weather data'}</p>
                <p><strong>Diet:</strong> {entry.diet}</p>
                <p><strong>Sleep:</strong> {entry.sleep} hours</p>
                <p><strong>Acne Severity:</strong> {entry.severity}</p>
                <p><strong>Notes:</strong> {entry.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default DailyTracker;
