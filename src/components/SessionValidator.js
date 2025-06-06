import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SessionValidator = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const loginTimeStr = sessionStorage.getItem('loginTime');

    if (!token || !loginTimeStr) {
      sessionStorage.clear();
      navigate('/login');
      return;
    }

    const loginTime = parseInt(loginTimeStr, 10);
    const currentTime = new Date().getTime();

    // Get session timeout from .env and convert to milliseconds
    const sessionTimeoutMinutes = parseInt(process.env.REACT_APP_SESSION_TIMEOUT, 10) || 10;
    //const sessionTimeoutMs = sessionTimeoutMinutes * 60 * 1000;

    if (currentTime - loginTime > sessionTimeoutMinutes) {
      alert('Session expired. Please login again.');
      sessionStorage.clear();
      navigate('/login');
      return;
    }
  }, [navigate]);

  return children;
};

export default SessionValidator;
