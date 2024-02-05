import { Suspense, useEffect, useState } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';
import Main from '@/components/Main';
import Sidebar from '@/components/Sidebar';
import { LoadingContext } from '@/contexts/loadingContext';
import { TemperatureUnitContext } from '@/contexts/temperatureContext';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';
import {
  getCurrentWeather,
  getNext3HoursStepForecast,
} from '@/services/weather';

const nextDaysDefaultValues = Array(5).fill({
  dt: '',
  min: 0,
  max: 0,
  icon: '',
});

const App = () => {
  const [isSearchLayoutActive, setIsSearchLayoutActive] = useState(false);
  const { currentPosition, positionError } = useCurrentPosition();
  const [coordinates, setCoordinates] = useState({ lat: 0, lon: 0 });
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState({
    city: '',
    clouds: { all: 0 },
    wind: { speed: 0, deg: 0 },
    visibility: 0,
    weather: '',
    icon: '',
    humidity: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    pressure: 0,
  });
  const locale = 'en'; // TODO: TEMPORAL
  const [nextDaysForecast, setNextDaysForecast] = useState(
    nextDaysDefaultValues
  );
  const [temperatureUnit, setTemperatureUnit] = useState('C');

  const onCoordinates = ({ lat, lon, useCurrentPosition }: any) => {
    useCurrentPosition
      ? setCoordinates(currentPosition)
      : setCoordinates({ lat, lon });
  };

  useEffect(() => {
    const tempUnit = locale === 'en' ? 'F' : 'C';
    setTemperatureUnit(tempUnit);
  }, [locale]);

  useEffect(() => {
    setCoordinates(currentPosition);
  }, [currentPosition]);

  useEffect(() => {
    setIsLoading(true);
    if (positionError || (coordinates.lat !== 0 && coordinates.lon !== 0)) {
      const unit = locale === 'en' ? 'imperial' : 'metric';
      const fetchWeather = async () => {
        const currentWeather = await getCurrentWeather(
          coordinates?.lat,
          coordinates?.lon,
          locale,
          unit
        );

        setCurrentWeather({
          ...currentWeather?.main,
          city: currentWeather?.name,
          clouds: currentWeather?.clouds,
          wind: currentWeather?.wind,
          visibility: currentWeather?.visibility,
          weather: currentWeather?.weather?.[0]?.description,
          icon: currentWeather?.weather?.[0]?.icon,
        });

        const nextDaysForecast = await getNext3HoursStepForecast(
          coordinates?.lat,
          coordinates?.lon,
          unit
        );
        setNextDaysForecast(nextDaysForecast);
        setIsLoading(false);
      };

      fetchWeather();
    }
  }, [coordinates.lat, coordinates.lon, locale, positionError]);

  return (
    <>
      <main className="h-screen grid grid-rows-[100%_auto] md:grid-cols-4 sm:grid-cols-1 text-primary-gray font-raleway">
        <Suspense>
          <SkeletonTheme highlightColor="#4b5563" baseColor="#1e213a">
            <TemperatureUnitContext.Provider
              value={[temperatureUnit, setTemperatureUnit]}
            >
              <LoadingContext.Provider value={isLoading}>
                <div className="grid grid-rows-[auto_2fr_auto] p-8 gap-5 bg-primary-color">
                  <Sidebar
                    currentWeather={currentWeather}
                    isSearchLayoutActive={isSearchLayoutActive}
                    setIsSearchLayoutActive={setIsSearchLayoutActive}
                    onCoordinates={onCoordinates}
                    positionError={positionError}
                  />
                </div>
                <div className="md:col-span-3 bg-secondary-color px-8 ">
                  <Main
                    currentWeather={currentWeather}
                    nextDaysForecast={nextDaysForecast}
                  />
                </div>
              </LoadingContext.Provider>
            </TemperatureUnitContext.Provider>
          </SkeletonTheme>
        </Suspense>
      </main>
      <ToastContainer
        theme="dark"
        newestOnTop={false}
        closeOnClick
        position="top-right"
        autoClose={3000}
      />
    </>
  );
};

export default App;
