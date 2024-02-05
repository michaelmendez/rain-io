import debounce from 'lodash.debounce';
import { getCitySearchResults } from '@/services/weather';
import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
} from 'react';
import { MdClose, MdSearch } from 'react-icons/md';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { CityResults } from '@/components/CityResults';
import { useTranslation } from 'react-i18next';

interface SearchPlacesProps {
  setIsSearchLayoutActive: Function;
  onCoordinates: Function;
  isSearchLayoutActive: boolean;
}

const SearchPlaces: FunctionComponent<SearchPlacesProps> = ({
  setIsSearchLayoutActive,
  onCoordinates,
}) => {
  const { t } = useTranslation('sidebar');
  const [citySearchResults, setCitySearchResults] = useState([]);

  const handleSearchLocation = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const fetchCoordinates = async () => {
        const cities = await getCitySearchResults(event.target.value);
        setCitySearchResults(cities);
      };

      fetchCoordinates();
    },
    []
  );

  const debouncedFilter = useMemo(
    () => debounce(handleSearchLocation, 500),
    [handleSearchLocation]
  );

  return (
    <>
      <div className="grid justify-end mb-6">
        <Button onClick={() => setIsSearchLayoutActive(false)} variant="TEXT">
          <MdClose className="m-auto text-xl" />
        </Button>
      </div>
      <div className="flex place-content-around">
        <Input
          placeholder={t('cityResults.searchLocation')}
          type="search"
          onChange={debouncedFilter}
        >
          <MdSearch />
        </Input>
        <Button
          onClick={handleSearchLocation}
          className="bg-indigo-800 font-semibold"
        >
          {t('cityResults.search')}
        </Button>
      </div>
      <div className="mt-12">
        <CityResults
          citySearchResults={citySearchResults}
          onCoordinates={onCoordinates}
          setIsSearchLayoutActive={setIsSearchLayoutActive}
        />
      </div>
    </>
  );
};

export default SearchPlaces;
