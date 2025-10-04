import { API_CONFIG, WEATHER_CONFIG, SEARCH_CONFIG, ERROR_MESSAGES } from '@/constants/app';
import { weatherCache, citySearchCache } from '@/utils/cache';
import { formatDate } from '@/utils/date';

interface CityResults {
  name: string;
  local_names: any;
  state: string;
  country: string;
  lat: number;
  lon: number;
}

export const getCurrentWeather = async (
  lat: number,
  lon: number,
  lang: string = WEATHER_CONFIG.DEFAULT_LOCALE,
  units: 'metric' | 'imperial' = WEATHER_CONFIG.DEFAULT_UNIT,
  signal?: AbortSignal
): Promise<any> => {
  const cacheKey = `weather_${lat}_${lon}_${units}_${lang}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) return cached;

  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.WEATHER}?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${API_CONFIG.KEY}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    weatherCache.set(cacheKey, data);
    return data;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Fetch aborted');
      throw error;
    }
    console.error(ERROR_MESSAGES.WEATHER_FETCH_FAILED, error);
    throw error;
  }
};export const getNext3HoursStepForecast = async (
  lat: number,
  lon: number,
  units: 'metric' | 'imperial' = WEATHER_CONFIG.DEFAULT_UNIT,
  numberOfTimestamps: number = WEATHER_CONFIG.FORECAST_TIMESTAMPS,
  signal?: AbortSignal
) => {
  const cacheKey = `forecast_${lat}_${lon}_${units}_${numberOfTimestamps}`;
  const cached = weatherCache.get(cacheKey);
  if (cached) return cached;

  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FORECAST}?lat=${lat}&lon=${lon}&units=${units}&cnt=${numberOfTimestamps}&appid=${API_CONFIG.KEY}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (!data.list || !Array.isArray(data.list)) {
      throw new Error(ERROR_MESSAGES.INVALID_RESPONSE);
    }

    const nextThreeHoursStepForecast = data.list.map((n: any) => ({
      min: n.main.temp_min,
      max: n.main.temp_max,
      icon: n.weather[0].icon,
      id: n.dt,
      dt: formatDate({
        date: new Date(n.dt_txt),
        options: {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        },
      }),
    }));

    weatherCache.set(cacheKey, nextThreeHoursStepForecast);
    return nextThreeHoursStepForecast;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Fetch aborted');
      throw error;
    }
    console.error(ERROR_MESSAGES.FORECAST_FETCH_FAILED, error);
    throw error;
  }
};

export const getCitySearchResults = async (
  city: string,
  lang: string = WEATHER_CONFIG.DEFAULT_LOCALE,
  signal?: AbortSignal
): Promise<any> => {
  if (!city || city.trim().length < SEARCH_CONFIG.MIN_SEARCH_LENGTH) {
    return [];
  }

  const cacheKey = `city_${city}_${lang}`;
  const cached = citySearchCache.get(cacheKey);
  if (cached) return cached;

  try {
    const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.GEO_DIRECT}?q=${encodeURIComponent(city)}&limit=${SEARCH_CONFIG.MAX_CITY_RESULTS}&appid=${API_CONFIG.KEY}`;
    const response = await fetch(url, { signal });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data?.cod) {
      console.error(data?.message);
      return [];
    }

    if (!Array.isArray(data)) {
      console.error(ERROR_MESSAGES.INVALID_RESPONSE);
      return [];
    }

    const citySearchResults = data.map(
      ({
        name,
        local_names: localNames,
        state,
        country,
        lat,
        lon,
      }: CityResults) => {
        const displayName = `${localNames?.[lang] ?? name}, ${
          state ? state + ',' : ''
        } ${country}`;
        return { lat, lon, displayName };
      }
    );

    citySearchCache.set(cacheKey, citySearchResults);
    return citySearchResults;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Fetch aborted');
      return [];
    }
    console.error(ERROR_MESSAGES.CITY_SEARCH_FAILED, error);
    return [];
  }
};
