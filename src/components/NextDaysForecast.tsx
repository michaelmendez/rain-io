import { TemperatureUnitContext } from '@/contexts/temperatureContext';
import { FunctionComponent, useContext } from 'react';
import { getTemperature } from '@/utils/weather';
import { LoadingContext } from '@/contexts/loadingContext';
import { NextDaysForecastSkeleton } from '@/components/skeletons/NextDaysForecast';

interface NextDaysForecastProps {
  dt: string;
  min: number;
  max: number;
  icon: string;
}

const NextDaysForecast: FunctionComponent<NextDaysForecastProps> = ({
  dt,
  min,
  max,
  icon,
}) => {
  const [currentTemperatureUnit]: any = useContext(TemperatureUnitContext);
  const isLoading = useContext(LoadingContext);
  return (
    <div className="h-56 bg-primary-color">
      {isLoading ? (
        <NextDaysForecastSkeleton />
      ) : (
          <div className="p-3">
            {dt}
            <img
              src={`http://openweathermap.org/img/wn/${icon}@4x.png`}
              alt="Weather icon"
              width="150"
              height="150"
              className="m-auto"
              loading="lazy"
            />
            <div className="flex justify-around">
              <span>
                {getTemperature(min, currentTemperatureUnit)} &deg;
                {currentTemperatureUnit}
              </span>
              <span>
                {getTemperature(max, currentTemperatureUnit)} &deg;
                {currentTemperatureUnit}
              </span>
            </div>
          </div>
      )}
    </div>
  );
};

export default NextDaysForecast;
