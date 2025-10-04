import debounce from 'lodash.debounce';
import { getCitySearchResults } from '@/services/weather';
import { SEARCH_CONFIG } from '@/constants/app';
import {
  ChangeEvent,
  FunctionComponent,
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
  memo,
} from 'react';
import { MdClose, MdSearch } from 'react-icons/md';
import Button from '@/components/common/Button';
import Input from '@/components/common/Input';
import { CityResults } from '@/components/CityResults';
import { useTranslation } from 'react-i18next';

interface SearchPlacesProps {
  setIsSearchLayoutActive: Function;
  onCoordinates: Function;
}

const SearchPlaces: FunctionComponent<SearchPlacesProps> = ({
  setIsSearchLayoutActive,
  onCoordinates,
}) => {
  const { t } = useTranslation('sidebar');
  const [citySearchResults, setCitySearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  const handleSearchLocation = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      const searchValue = event.target.value;

      if (!searchValue || searchValue.trim().length < SEARCH_CONFIG.MIN_SEARCH_LENGTH) {
        setCitySearchResults([]);
        return;
      }

      // Cancel previous request
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }

      // Create new AbortController for this request
      abortControllerRef.current = new AbortController();

      setIsSearching(true);
      try {
        const cities = await getCitySearchResults(
          searchValue,
          'en',
          abortControllerRef.current.signal
        );
        setCitySearchResults(cities);
      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Search error:', error);
        }
      } finally {
        setIsSearching(false);
      }
    },
    []
  );

  const debouncedFilter = useMemo(
    () => debounce(handleSearchLocation, SEARCH_CONFIG.DEBOUNCE_DELAY),
    [handleSearchLocation]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      debouncedFilter.cancel();
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedFilter]);  return (
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
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : t('cityResults.search')}
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

export default memo(SearchPlaces);
