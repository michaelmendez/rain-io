import { Suspense, useEffect, useState, useCallback, useMemo, memo } from 'react';
import { SkeletonTheme } from 'react-loading-skeleton';
import { ToastContainer } from 'react-toastify';
import Main from '@/components/Main';
import Sidebar from '@/components/Sidebar';
import { LoadingContext } from '@/contexts/loadingContext';
import { TemperatureUnitContext } from '@/contexts/temperatureContext';
import { useCurrentPosition } from '@/hooks/useCurrentPosition';
import { WEATHER_CONFIG, TEMPERATURE_UNITS, UI_CONFIG, DEFAULT_VALUES } from '@/constants/app';
import {
  getCurrentWeather,
  getNext3HoursStepForecast,
} from '@/services/weather';

const nextDaysDefaultValues = Array(WEATHER_CONFIG.FORECAST_TIMESTAMPS).fill(DEFAULT_VALUES.FORECAST_ITEM);

const App = () => {
  const [isSearchLayoutActive, setIsSearchLayoutActive] = useState(false);
  const { currentPosition, positionError } = useCurrentPosition();
  const [coordinates, setCoordinates] = useState(DEFAULT_VALUES.COORDINATES);
  const [isLoading, setIsLoading] = useState(false);
  const [currentWeather, setCurrentWeather] = useState(DEFAULT_VALUES.WEATHER);
  const locale = WEATHER_CONFIG.DEFAULT_LOCALE;
  const [nextDaysForecast, setNextDaysForecast] = useState(
    nextDaysDefaultValues
  );
  const [temperatureUnit, setTemperatureUnit] = useState<string>(TEMPERATURE_UNITS.CELSIUS);

  const onCoordinates = useCallback(({ lat, lon, useCurrentPosition }: any) => {
    useCurrentPosition
      ? setCoordinates(currentPosition)
      : setCoordinates({ lat, lon });
  }, [currentPosition]);

  useEffect(() => {
    const tempUnit = locale === WEATHER_CONFIG.DEFAULT_LOCALE ? TEMPERATURE_UNITS.FAHRENHEIT : TEMPERATURE_UNITS.CELSIUS;
    setTemperatureUnit(tempUnit);
  }, [locale]);

  useEffect(() => {
    setCoordinates(currentPosition);
  }, [currentPosition]);

  useEffect(() => {
    if (!positionError && coordinates.lat === 0 && coordinates.lon === 0) {
      return;
    }

    const unit = locale === WEATHER_CONFIG.DEFAULT_LOCALE ? WEATHER_CONFIG.IMPERIAL_UNIT : WEATHER_CONFIG.DEFAULT_UNIT;
    let isMounted = true;

    const fetchWeather = async () => {
      setIsLoading(true);
      try {
        const [currentWeatherData, nextDaysForecast] = await Promise.all([
          getCurrentWeather(coordinates?.lat, coordinates?.lon, locale, unit),
          getNext3HoursStepForecast(coordinates?.lat, coordinates?.lon, unit, WEATHER_CONFIG.FORECAST_TIMESTAMPS)
        ]);

        if (isMounted) {
          setCurrentWeather({
            ...currentWeatherData?.main,
            city: currentWeatherData?.name,
            clouds: currentWeatherData?.clouds,
            wind: currentWeatherData?.wind,
            visibility: currentWeatherData?.visibility,
            weather: currentWeatherData?.weather?.[0]?.description,
            icon: currentWeatherData?.weather?.[0]?.icon,
          });
          setNextDaysForecast(nextDaysForecast);
        }
      } catch (error) {
        console.error('Failed to fetch weather data:', error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchWeather();

    return () => {
      isMounted = false;
    };
  }, [coordinates.lat, coordinates.lon, locale, positionError]);

  const temperatureContextValue = useMemo(
    () => [temperatureUnit, setTemperatureUnit],
    [temperatureUnit]
  );

  return (
    <>
      <main className="h-screen grid grid-rows-[100%_auto] md:grid-cols-4 sm:grid-cols-1 text-primary-gray font-raleway">
        <Suspense fallback={<div>Loading...</div>}>
          <SkeletonTheme highlightColor={UI_CONFIG.SKELETON.HIGHLIGHT_COLOR} baseColor={UI_CONFIG.SKELETON.BASE_COLOR}>
            <TemperatureUnitContext.Provider value={temperatureContextValue}>
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
        position={UI_CONFIG.TOAST.POSITION as any}
        autoClose={UI_CONFIG.TOAST.AUTO_CLOSE}
        limit={UI_CONFIG.TOAST.LIMIT}
      />
    </>
  );
};

export default memo(App);
