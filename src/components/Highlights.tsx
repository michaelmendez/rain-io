import { FunctionComponent, useContext, memo } from 'react';
import { LoadingContext } from '@/contexts/loadingContext';
import { HighlightsSkeleton } from '@/components/skeletons/Highlights';

interface HighlightsProps {
  title: string;
  mainValue: string;
  unit: string;
  children?: any;
}

const Highlights: FunctionComponent<HighlightsProps> = ({
  title,
  mainValue,
  unit,
  children,
}) => {
  const isLoading = useContext(LoadingContext);
  return (
    <div className="bg-primary-color h-64">
      {isLoading ? (
        <HighlightsSkeleton hasChildren={children} />
      ) : (
        <div className="grid grid-rows-2 gap-3 p-3">
          <h3 className="text-gray-100">{title}</h3>
          <span className="inline-flex justify-center text-6xl [&>*]:text-gray-100">
            <p className="font-bold mr-1">{mainValue}</p>
            <p className="text-4xl place-self-center">{unit}</p>
          </span>
          {children}
        </div>
      )}
    </div>
  );
};

export default memo(Highlights);
