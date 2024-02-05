import { useState, useEffect } from 'react';

const useCurrentPosition = () => {
  const [currentPosition, setCurrentPosition] = useState({ lat: 0, lon: 0 });
  const [positionError, setPositionError] = useState('');

  useEffect(() => {
    const nav = navigator.geolocation;
    if (!nav) {
      setPositionError('Geolocation not supported');
      return;
    }
    nav.getCurrentPosition(
      (position) =>
        setCurrentPosition({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        }),
      (error) => {
        setPositionError(error.message);
      }
    );
  }, []);

  return { currentPosition, positionError };
};

export { useCurrentPosition };
