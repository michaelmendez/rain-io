import { convertDegreesToCompass } from '@/utils/weather';
import { FunctionComponent } from 'react';
import { RiCompassDiscoverFill } from 'react-icons/ri';

interface WindDegree {
  deg: number;
}

const WindDegree: FunctionComponent<WindDegree> = ({ deg }) => {
  return (
    <div className="grid grid-cols-2 justify-self-center place-items-center gap-1">
      <RiCompassDiscoverFill className={`text-4xl rotate-[${deg}deg]`} />
      <p className="text-lg text-gray-100">{convertDegreesToCompass(deg)}</p>
    </div>
  );
};

export default WindDegree;
