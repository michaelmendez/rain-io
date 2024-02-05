import Skeleton from 'react-loading-skeleton';

export const HighlightsSkeleton = ({ hasChildren = false }) => {
  return (
    <div className="grid grid-rows-2 gap-3 p-3">
      <Skeleton width={200} />
      <Skeleton width={300} height={60} />
      {hasChildren && <Skeleton width={200} height={20} className="mt-2" />}
    </div>
  );
};
