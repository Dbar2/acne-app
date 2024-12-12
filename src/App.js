import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DailyTracker from './components/DailyTracker';
import Home from './components/Home';
import Skincare from './components/Skincare';
import FaceScan from './components/FaceScan';
import Navbar from './components/Navbar';
import './index.css'; 
import './App.css'; 

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/daily-tracker" element={<DailyTracker />} />
          <Route path="/skincare" element={<Skincare />} />
          <Route path="/face-scan" element={<FaceScan />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
