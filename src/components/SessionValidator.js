import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionValidator = ({ children }) => {
  const navigate = useNavigate();

  const timeout = process.env.REACT_APP_SESSION_TIMEOUT;

  console.log('Session Timeout:', timeout);
  useEffect(() => {
    const loginTime = sessionStorage.getItem('loginTime');
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const currentTime = new Date().getTime();

    if (!isLoggedIn || !loginTime || currentTime - parseInt(loginTime, 10) > timeout) {
      sessionStorage.clear();
      alert('Session expired. Please log in again.');
      navigate('/login');
    }
  }, []);

  return children;
};

export default SessionValidator;
