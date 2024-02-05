import Skeleton from 'react-loading-skeleton';

export const CurrentWeatherSkeleton = () => {
  return (
    <div className="grid grid-rows-3 text-center">
      <Skeleton circle height={150} width={150} className="mt-16" />
      <div>
        <Skeleton height={100} width={130} className="mt-5" />
        <Skeleton height={50} width={180} className="mt-12" />
      </div>
      <div className="self-end">
        <Skeleton count={2} height={30} width={150} className="mt-7" />
      </div>
    </div>
  );
};
