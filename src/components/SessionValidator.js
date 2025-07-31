import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { validateAndRefreshToken } from './api_service';

const isTokenExpired = (token) => {
  try {
    const decoded = jwtDecode(token);
    const exp = decoded.exp;
    const now = Math.floor(Date.now() / 1000);
    return now > exp;
  } catch (err) {
    console.error('Error decoding token for expiration check:', err);
    return true;
  }
};

const isSessionDataValid = (token, refreshToken, loginTimeStr, username) => {
  try {
    const decoded = jwtDecode(token);
    console.log("Decoded JWT:", decoded);

    // Validate loginTime
    const loginTime = parseInt(loginTimeStr, 10);
    if (isNaN(loginTime) || loginTime <= 0) {
      console.warn('Invalid login time');
      return false;
    }

    // Validate refreshToken
    if (!refreshToken || refreshToken.length < 10) {
      console.warn('Invalid refresh token');
      return false;
    }

    // Check if token's username matches session username (optional)
    const tokenUsername = decoded.sub || null;
    const tokenUsername1 = decoded.username || null;
    console.log("Token username:", tokenUsername);
    console.log("Token username1:", decoded);
    if (tokenUsername) {
      console.warn('Username in token does not match session username');
      return false;
    }

    return true;
  } catch (error) {
    console.error('Failed to decode JWT in session validation:', error);
    return false;
  }
};

const SessionValidator = ({ children }) => {
  const navigate = useNavigate();
  const inactivityTimer = useRef(null);

  const sessionTimeoutMinutes = parseInt(process.env.REACT_APP_SESSION_TIMEOUT, 10) || 10;
  const sessionTimeoutMs = sessionTimeoutMinutes * 60 * 1000;

  const logout = (message) => {
    console.warn('Logging out:', message);
    sessionStorage.clear();
    navigate('/login', { replace: true });
    // window.location.reload(); // Commented for development/debugging
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      logout('Session expired due to inactivity.');
    }, sessionTimeoutMs);
  };

  const setupActivityListeners = () => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.addEventListener(event, resetInactivityTimer));
    resetInactivityTimer();
  };

  const removeActivityListeners = () => {
    const events = ['mousemove', 'mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => window.removeEventListener(event, resetInactivityTimer));
    clearTimeout(inactivityTimer.current);
  };

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const token = sessionStorage.getItem('token');
      const refreshToken = sessionStorage.getItem('refreshToken');
      const loginTimeStr = sessionStorage.getItem('loginTime');
      const username = sessionStorage.getItem('username');

      console.log('Session values:', { token, refreshToken, loginTimeStr, username });

      if (!token || !refreshToken || !loginTimeStr || !username) {
        logout('Missing session data. Please login again.');
        return;
      }

      if (!isSessionDataValid(token, refreshToken, loginTimeStr, username)) {
        logout('Session data tampered or invalid. Please login again.');
        return;
      }

      try {
        if (isTokenExpired(token)) {
          console.log('Token expired. Attempting to refresh...');
          const newToken = await validateAndRefreshToken(refreshToken);
          console.log('New token from refresh:', newToken);

          if (!newToken || typeof newToken !== 'string') {
            logout('Token refresh failed or returned invalid token.');
            return;
          }

          sessionStorage.setItem('token', newToken);
        }

        setupActivityListeners();
      } catch (error) {
        console.error('Error during session refresh:', error);
        logout('Session refresh failed. Please login again.');
      }
    };

    checkAndRefreshToken();

    return () => {
      removeActivityListeners();
    };
  }, [navigate]);

  return children;
};

export default SessionValidator;
