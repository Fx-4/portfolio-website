// src/components/Loading.jsx
import NProgress from 'nprogress';
import { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { checkServerLatency } from "../utils/NetworkSpeed";
import "../styles/Loading.css";

// Konfigurasi environment yang bisa diatur di vite.config.js
const isDevelopment = import.meta.env.MODE === 'development';

const Loading = ({ 
  isLoading, 
  pingEndpoint = '/api/ping',  
  pingInterval = 2000,         
  initialSpeed = 500           
}) => {
  const [serverLatency, setServerLatency] = useState(null);
  const progressIntervalRef = useRef(null);
  const pingIntervalRef = useRef(null);
  
  const calculateProgressSpeed = (latency) => {
    if (!latency) return 0.03;
    
    if (latency < 100) return 0.1;      
    if (latency < 300) return 0.05;     
    if (latency < 1000) return 0.03;    
    if (latency < 3000) return 0.01;    
    return 0.005;                       
  };

  useEffect(() => {
    const checkLatency = async () => {
      const latency = await checkServerLatency(pingEndpoint);
      if (latency) {
        setServerLatency(latency);
      }
    };

    if (isLoading) {
      checkLatency();
      pingIntervalRef.current = setInterval(checkLatency, pingInterval);
    }

    return () => {
      if (pingIntervalRef.current) {
        clearInterval(pingIntervalRef.current);
      }
    };
  }, [isLoading, pingEndpoint, pingInterval]);

  useEffect(() => {
    NProgress.configure({ 
      showSpinner: false,
      minimum: 0.1,
      easing: 'ease',
      speed: serverLatency || initialSpeed,
      trickle: true,
      trickleSpeed: 200
    });

    if (isLoading) {
      NProgress.start();

      progressIntervalRef.current = setInterval(() => {
        const increment = calculateProgressSpeed(serverLatency);
        NProgress.inc(increment);
      }, 200);

    } else {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      NProgress.done();
    }

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      NProgress.done();
    };
  }, [isLoading, serverLatency, initialSpeed]);

  // Debug info hanya ditampilkan dalam mode development
  return isDevelopment ? (
    <div className="fixed bottom-2 right-2 text-xs text-gray-500">
      
    </div>
  ) : null;
};

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  pingEndpoint: PropTypes.string,
  pingInterval: PropTypes.number,
  initialSpeed: PropTypes.number
};

export default Loading;