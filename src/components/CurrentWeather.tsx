import { formatDate } from '@/utils/date';
import { FunctionComponent, useContext, memo } from 'react';
import { MdGpsFixed, MdLocationOn } from 'react-icons/md';
import Button from '@/components/common/Button';
import OptimizedImage from '@/components/common/OptimizedImage';
import { TemperatureUnitContext } from '@/contexts/temperatureContext';
import { getTemperature } from '@/utils/weather';
import { toast } from 'react-toastify';
import { LoadingContext } from '@/contexts/loadingContext';
import { CurrentWeatherSkeleton } from '@/components/skeletons/CurrentWeather';
import { useTranslation } from 'react-i18next';

interface CurrentWeatherProps {
  currentWeather: any;
  setIsSearchLayoutActive: Function;
  onCoordinates: Function;
  positionError: string;
}

const CurrentWeather: FunctionComponent<CurrentWeatherProps> = ({
  currentWeather,
  setIsSearchLayoutActive,
  onCoordinates,
  positionError,
}) => {
  const locale = 'en';
  const { t } = useTranslation('sidebar');
  const [currentTemperatureUnit]: any = useContext(TemperatureUnitContext);
  const isLoading = useContext(LoadingContext);

  const handleGeolocation = () => {
    positionError
      ? toast(
          'Location permission is not enabled. Please enable it and try again.'
        )
      : onCoordinates({ useCurrentPosition: true });
  };

  return (
    <>
      <div className="flex justify-between px-10">
        <Button onClick={setIsSearchLayoutActive}>{t('searchPlaces')}</Button>
        <Button onClick={() => handleGeolocation()} className="rounded-full">
          <MdGpsFixed className="m-auto text-xl" />
        </Button>
      </div>
      <div className="text-center bg-cloud bg-repeat-x bg-contain grid">
        {isLoading ? (
          <CurrentWeatherSkeleton />
        ) : (
          <>
            <OptimizedImage
              src={`http://openweathermap.org/img/wn/${currentWeather?.icon}@4x.png`}
              alt="Weather icon"
              width="200"
              height="200"
              className="m-auto"
            />
            <div>
              <h1 className="text-8xl text-gray-100">
                {getTemperature(currentWeather?.temp, currentTemperatureUnit)}
                <span className="text-5xl text-primary-gray">
                  &deg;{currentTemperatureUnit}
                </span>
              </h1>
            </div>
            <h1 className="text-3xl capitalize row-span-1">
              {currentWeather?.weather}
            </h1>
            <div className="row-span-2 self-end">
              <span className="inline-flex mb-8">
                <p>{t('today')}</p>
                <p className="px-3">•</p>
                <p className="capitalize">{formatDate({ lang: locale })}</p>
              </span>
              <span className="grid grid-flow-col place-content-center gap-1 items-center">
                <MdLocationOn />
                <p>{currentWeather?.city}</p>
              </span>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default memo(CurrentWeather);
