export const convertDegreesToCompass = (angle: number) => {
  const directions = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const angleChange = 22.5;
  const directionsInTotal = 16;
  const thresholdChange = 0.5;
  const direction =
    Math.floor(angle / angleChange + thresholdChange) % directionsInTotal;
  return directions?.[direction];
};

export const getTemperature = (temperature: number, unit = 'C') => {
  const conversion = unit === 'C' ? (temperature - 32) * (5 / 9) : temperature;
  return Math.trunc(conversion);
};

export const convertMetersToKm = (meters: number, decimals = 1) => {
  return (meters / 1000).toFixed(decimals);
};
