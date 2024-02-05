import { WEATHER_API_KEY, WEATHER_API_URL } from '@/constants/weather';
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
  lang = 'en',
  units = 'metric'
): Promise<any> => {
  const response = await fetch(
    `${WEATHER_API_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&lang=${lang}&appid=${WEATHER_API_KEY}`
  );
  const data = await response.json();
  return data;
};

export const getNext3HoursStepForecast = async (
  lat: number,
  lon: number,
  units = 'metric',
  numberOfTimestamps = 5
) => {
  const response = await fetch(
    `${WEATHER_API_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&cnt=${numberOfTimestamps}&appid=${WEATHER_API_KEY}`
  );
  const data = await response.json();
  const nextThreeHoursStepForecast = data?.list?.map((n: any) => ({
    min: n.main.temp_min,
    max: n.main.temp_max,
    icon: n.weather[0].icon,
    dt: formatDate({
      date: new Date(n.dt_txt),
      options: {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      },
    }),
  }));

  return nextThreeHoursStepForecast;
};

export const getCitySearchResults = async (
  city: string,
  lang = 'es'
): Promise<any> => {
  let citySearchResults: any[] = [];
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/geo/1.0/direct?q=${city}&limit=5&appid=${WEATHER_API_KEY}`
    );
    const data = await response.json();

    if (data?.cod) {
      console.error(data?.message);
      return citySearchResults;
    }

    citySearchResults = data?.map(
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
    return citySearchResults;
  } catch (error) {
    console.error(error);
    return citySearchResults;
  }
};
