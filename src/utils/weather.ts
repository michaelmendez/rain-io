import { COMPASS_DIRECTIONS, DIRECTION_CONFIG, CONVERSION } from '@/constants/app';
import { computationCache } from '@/utils/cache';

export const convertDegreesToCompass = (angle: number): string => {
  const cacheKey = `direction_${angle}`;

  // Check cache first
  const cached = computationCache.get(cacheKey);
  if (cached) return cached;

  const direction =
    Math.floor(angle / DIRECTION_CONFIG.ANGLE_CHANGE + DIRECTION_CONFIG.THRESHOLD_CHANGE) %
    DIRECTION_CONFIG.TOTAL_DIRECTIONS;

  const result = COMPASS_DIRECTIONS[direction];

  // Cache the result (cache has max size limit)
  computationCache.set(cacheKey, result);

  return result;
};

export const getTemperature = (temperature: number, unit = 'C'): number => {
  const cacheKey = `temp_${temperature}_${unit}`;

  const cached = computationCache.get(cacheKey);
  if (cached !== null && cached !== undefined) return cached;

  const conversion = unit === 'C'
    ? (temperature - CONVERSION.FAHRENHEIT_TO_CELSIUS_OFFSET) * CONVERSION.FAHRENHEIT_TO_CELSIUS_RATIO
    : temperature;
  const result = Math.trunc(conversion);

  // Cache the result (cache has max size limit)
  computationCache.set(cacheKey, result);

  return result;
};

export const convertMetersToKm = (
  meters: number,
  decimals = CONVERSION.DEFAULT_DECIMAL_PLACES
): string => {
  return (meters / CONVERSION.METERS_TO_KM).toFixed(decimals);
};
