import React, { useState, useEffect, useRef } from 'react';

const FaceScan = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraOn, setIsCameraOn] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setIsCameraOn(true);
      } catch (err) {
        console.error('Error accessing the camera:', err);
        alert('Please grant permission to access your camera.');
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <div className="text-center">
      <h1>Face Scan</h1>
      {!isCameraOn ? (
        <p>Loading camera...</p>
      ) : (
        <div>
          <video ref={videoRef} width="320" height="240" autoPlay />
          <br />
          <button className="btn btn-primary mt-3" onClick={captureImage}>Capture Image</button>
          <canvas ref={canvasRef} width="320" height="240" className="d-block mx-auto mt-3"></canvas>
        </div>
      )}
    </div>
  );
};

export default FaceScan;
