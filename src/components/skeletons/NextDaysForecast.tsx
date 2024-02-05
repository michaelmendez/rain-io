import Skeleton from 'react-loading-skeleton';

export const NextDaysForecastSkeleton = () => {
  return (
    <div className="p-3">
      <Skeleton width={30} />
      <Skeleton circle width={100} height={100} className="my-5" />
      <div className="flex justify-around">
        <Skeleton width={30} />
        <Skeleton width={30} />
      </div>
    </div>
  );
};
