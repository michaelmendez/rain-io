import { FunctionComponent } from 'react';

interface HumidityBarProps {
  percentage: string;
}

const HumidityBar: FunctionComponent<HumidityBarProps> = ({ percentage }) => {
  return (
    <div className="grid grid-cols-1 grid-rows-3 w-full justify-self-center px-10">
      <div className="grid grid-cols-3 [&>p]:text-gray-100">
        <p className="text-left">0</p>
        <p>50</p>
        <p className="text-right">100</p>
      </div>
      <div className="bg-gray-200 rounded-full h-1.5 dark:bg-gray-200 row-cols-3 self-center">
        <div
          className="h-1.5 rounded-full dark:bg-yellow-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-right">%</span>
    </div>
  );
};

export default HumidityBar;
