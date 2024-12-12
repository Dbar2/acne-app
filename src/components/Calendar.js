import React, { useState } from 'react';
import './Calendar.css';

const Calendar = ({ logData }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [acneLog, setAcneLog] = useState({});

  const handleDateSelect = (e) => {
    setSelectedDate(e.target.value);
    const log = logData.find(entry => entry.date === selectedDate);
    setAcneLog(log || {});
  };

  return (
    <div className="calendar">
      <h2>Track Acne Breakouts</h2>
      <input
        type="date"
        value={selectedDate}
        onChange={handleDateSelect}
      />
      <div>
        {acneLog.date ? (
          <div>
            <h3>Details for {acneLog.date}:</h3>
            <p><strong>Location:</strong> {acneLog.location}</p>
            <p><strong>Weather:</strong> {acneLog.weather ? `Temp: ${acneLog.weather.temp}°C, Humidity: ${acneLog.weather.humidity}%` : 'No weather data'}</p>
            <p><strong>Diet:</strong> {acneLog.diet}</p>
            <p><strong>Skincare:</strong> {acneLog.skincare}</p>
            <p><strong>Sleep:</strong> {acneLog.sleep} hours</p>
            <p><strong>Acne Severity:</strong> {acneLog.severity}</p>
            <p><strong>Notes:</strong> {acneLog.notes}</p>
          </div>
        ) : (
          <p>No log for this date.</p>
        )}
      </div>
    </div>
  );
};

export default Calendar;
