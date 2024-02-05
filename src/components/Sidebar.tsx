import { FunctionComponent } from 'react';
import SearchPlaces from '@/components/SearchPlaces';
import CurrentWeather from '@/components/CurrentWeather';
import { Fade } from '@/components/layouts/Fade';

interface SidebarProps {
  currentWeather: any;
  isSearchLayoutActive: boolean;
  setIsSearchLayoutActive: Function;
  onCoordinates: Function;
  positionError: string;
}

const Sidebar: FunctionComponent<SidebarProps> = ({
  currentWeather,
  isSearchLayoutActive,
  setIsSearchLayoutActive,
  onCoordinates,
  positionError,
}) => {
  return (
    isSearchLayoutActive ? (
      <Fade id="sidebar" isVisible={isSearchLayoutActive}>
        <SearchPlaces
          isSearchLayoutActive={isSearchLayoutActive}
          setIsSearchLayoutActive={setIsSearchLayoutActive}
          onCoordinates={onCoordinates}
        />
      </Fade>
    ) : (
      <CurrentWeather
        currentWeather={currentWeather}
        setIsSearchLayoutActive={setIsSearchLayoutActive}
        onCoordinates={onCoordinates}
        positionError={positionError}
      />
    )
  );
};

export default Sidebar;