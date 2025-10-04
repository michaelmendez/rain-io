import { FunctionComponent, useContext, memo } from 'react';
import Button from '@/components/common/Button';
import Highlights from '@/components/Highlights';
import NextDaysForecast from '@/components/NextDaysForecast';
import WindDegree from '@/components/WindDegree';
import HumidityBar from '@/components/HumidityBar';
import { TemperatureUnitContext } from '@/contexts/temperatureContext';
import { convertMetersToKm } from '@/utils/weather';
import { useTranslation } from 'react-i18next';
import { Footer } from '@/components/Footer';
import LanguagesLinks from '@/components/LanguageLinks';

interface MainProps {
  currentWeather: any;
  nextDaysForecast: any;
}

const Main: FunctionComponent<MainProps> = ({
  currentWeather,
  nextDaysForecast,
}) => {
  const { t } = useTranslation('main');
  const [currentTemperatureUnit, setCurrentTemperatureUnit]: any = useContext(
    TemperatureUnitContext
  );
  return (
    <div className="h-full grid md:grid-rows-[1fr_1fr_1fr_1fr_1fr] grid-cols-1 md:px-20">
      <div className="grid grid-cols-2 self-center my-5 md:my-0">
        <div className="text-left self-end">
          <LanguagesLinks />
        </div>
        <div className="text-right">
          <Button
            onClick={() => setCurrentTemperatureUnit('C')}
            className={`rounded-full w-8 h-8 mr-3 font-bold ${
              currentTemperatureUnit === 'F'
                ? 'bg-gray-100 text-indigo-900'
                : 'bg-indigo-900'
            }`}
          >
            &deg;C
          </Button>
          <Button
            onClick={() => setCurrentTemperatureUnit('F')}
            className={`rounded-full w-8 h-8 font-bold ${
              currentTemperatureUnit === 'C'
                ? 'bg-gray-100 text-indigo-900'
                : 'bg-indigo-900'
            }`}
          >
            &deg;F
          </Button>
        </div>
      </div>
      <div className="grid md:grid-cols-5 grid-cols-2 text-center gap-10">
        {nextDaysForecast?.map((nextDayForecast: any, index: number) => (
          <NextDaysForecast
            key={nextDayForecast?.id || `forecast-${index}`}
            dt={nextDayForecast?.dt}
            min={nextDayForecast?.min}
            max={nextDayForecast?.max}
            icon={nextDayForecast?.icon}
          />
        ))}
      </div>
      <h3 className="text-left text-3xl font-bold text-gray-100 self-end mb-2 mt-10 md:mt-0">
        {t('todaysHighlights')}
      </h3>
      <div className="grid md:gap-10 md:grid-cols-2 grid-rows-1 gap-5 text-center">
        <Highlights
          mainValue={currentWeather?.wind?.speed}
          title={t('windStatus')}
          unit={currentTemperatureUnit === 'C' ? 'meter/sec' : 'miles/hour'}
        >
          <WindDegree deg={currentWeather?.wind?.deg} />
        </Highlights>

        <Highlights
          title={t('humidity')}
          mainValue={currentWeather?.humidity}
          unit="%"
        >
          <HumidityBar percentage={currentWeather?.humidity} />
        </Highlights>

        <Highlights
          title={t('visibility')}
          mainValue={convertMetersToKm(currentWeather?.visibility)}
          unit="km"
        />

        <Highlights
          title={t('airPressure')}
          mainValue={currentWeather?.pressure}
          unit="hPa"
        />
      </div>
      <div className="justify-self-center self-end mb-5 mt-2 text-center">
        <Footer
          name="Michael Méndez"
          href="https://github.com/michaelmendez"
        />
      </div>
    </div>
  );
};

export default memo(Main);
