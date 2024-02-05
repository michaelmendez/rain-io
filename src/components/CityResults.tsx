import { FunctionComponent } from 'react';
import Button from '@/components/common/Button';
import { Fade } from '@/components/layouts/Fade';

interface CityResultsProps {
  citySearchResults: any;
  onCoordinates: Function;
  setIsSearchLayoutActive: Function;
}

export const CityResults: FunctionComponent<CityResultsProps> = ({
  citySearchResults,
  onCoordinates,
  setIsSearchLayoutActive,
}) => {
  const handleCitySearchResults = (citySearchResult: any) => {
    onCoordinates({
      lat: citySearchResult?.lat,
      lon: citySearchResult?.lon,
    });

    setIsSearchLayoutActive(false);
  };

  return (
    <Fade id="cityResults" className="grid [&>button]:text-left" isVisible={citySearchResults}>
      {citySearchResults?.map((citySearchResult: any, index: number) => (
        <Button
          key={index}
          variant="OUTLINED"
          onClick={() => handleCitySearchResults(citySearchResult)}
          className="py-5 mb-7"
        >
          {citySearchResult?.displayName}
        </Button>
      ))}
    </Fade>
  );
};
