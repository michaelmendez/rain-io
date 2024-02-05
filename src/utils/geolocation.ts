export const getCurrentCoordinates = () => {
  navigator &&
    navigator.geolocation.getCurrentPosition((position) => {
      return {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      };
    });
};
