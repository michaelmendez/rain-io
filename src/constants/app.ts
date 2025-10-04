/**
 * Application-wide Constants
 *
 * Centralized location for all magic numbers and strings used throughout the application.
 */

// ============================================================================
// API Configuration
// ============================================================================

export const API_CONFIG = {
  BASE_URL: 'https://api.openweathermap.org',
  ENDPOINTS: {
    WEATHER: '/data/2.5/weather',
    FORECAST: '/data/2.5/forecast',
    GEO_DIRECT: '/geo/1.0/direct',
  },
  KEY: import.meta.env.VITE_WEATHER_API_KEY,
} as const;

// ============================================================================
// Cache Configuration
// ============================================================================

export const CACHE_CONFIG = {
  WEATHER: {
    TTL: 5 * 60 * 1000, // 5 minutes
    MAX_SIZE: 50,
  },
  FORECAST: {
    TTL: 5 * 60 * 1000, // 5 minutes
    MAX_SIZE: 50,
  },
  CITY_SEARCH: {
    TTL: 15 * 60 * 1000, // 15 minutes
    MAX_SIZE: 100,
  },
  COMPUTATION: {
    TTL: 60 * 60 * 1000, // 1 hour
    MAX_SIZE: 1000,
  },
  TEMPERATURE_CONVERSION: {
    MAX_SIZE: 1000,
  },
  DIRECTION_CONVERSION: {
    MAX_SIZE: 360,
  },
} as const;

// ============================================================================
// Search Configuration
// ============================================================================

export const SEARCH_CONFIG = {
  MIN_SEARCH_LENGTH: 2,
  DEBOUNCE_DELAY: 500, // milliseconds
  MAX_CITY_RESULTS: 5,
} as const;

// ============================================================================
// Weather Configuration
// ============================================================================

export const WEATHER_CONFIG = {
  DEFAULT_LOCALE: 'en',
  DEFAULT_UNIT: 'metric',
  IMPERIAL_UNIT: 'imperial',
  FORECAST_TIMESTAMPS: 5,
  IMAGE_BASE_URL: 'http://openweathermap.org/img/wn',
  IMAGE_SIZE: '@4x.png',
} as const;

// ============================================================================
// Temperature Units
// ============================================================================

export const TEMPERATURE_UNITS = {
  CELSIUS: 'C',
  FAHRENHEIT: 'F',
} as const;

export const UNIT_MAP = {
  [TEMPERATURE_UNITS.CELSIUS]: 'metric',
  [TEMPERATURE_UNITS.FAHRENHEIT]: 'imperial',
} as const;

// ============================================================================
// Compass Directions
// ============================================================================

export const COMPASS_DIRECTIONS = [
  'N',
  'NNE',
  'NE',
  'ENE',
  'E',
  'ESE',
  'SE',
  'SSE',
  'S',
  'SSW',
  'SW',
  'WSW',
  'W',
  'WNW',
  'NW',
  'NNW',
] as const;

export const DIRECTION_CONFIG = {
  ANGLE_CHANGE: 22.5,
  TOTAL_DIRECTIONS: 16,
  THRESHOLD_CHANGE: 0.5,
} as const;

// ============================================================================
// Conversion Constants
// ============================================================================

export const CONVERSION = {
  METERS_TO_KM: 1000,
  FAHRENHEIT_TO_CELSIUS_OFFSET: 32,
  FAHRENHEIT_TO_CELSIUS_RATIO: 5 / 9,
  DEFAULT_DECIMAL_PLACES: 1,
} as const;

// ============================================================================
// UI Configuration
// ============================================================================

export const UI_CONFIG = {
  TOAST: {
    AUTO_CLOSE: 3000, // milliseconds
    LIMIT: 3,
    POSITION: 'top-right',
  },
  SKELETON: {
    HIGHLIGHT_COLOR: '#4b5563',
    BASE_COLOR: '#1e213a',
  },
  IMAGE: {
    LAZY_LOAD_MARGIN: '50px',
    DEFAULT_WIDTH: 200,
    DEFAULT_HEIGHT: 200,
    FORECAST_WIDTH: 150,
    FORECAST_HEIGHT: 150,
  },
} as const;

// ============================================================================
// Performance Configuration
// ============================================================================

export const PERFORMANCE_CONFIG = {
  DEBOUNCE_DEFAULT: 300, // milliseconds
  THROTTLE_DEFAULT: 1000, // milliseconds
  LOW_END_DEVICE: {
    MIN_CPU_CORES: 4,
    MIN_MEMORY_GB: 4,
    SLOW_CONNECTIONS: ['slow-2g', '2g'],
  },
  MEASUREMENT_PREFIX: {
    START: '-start',
    END: '-end',
  },
} as const;

// ============================================================================
// HTTP Configuration
// ============================================================================

export const HTTP_CONFIG = {
  TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3,
  RETRY_DELAY: 1000, // milliseconds
} as const;

// ============================================================================
// Localization
// ============================================================================

export const LOCALE_CONFIG = {
  DEFAULT: 'en',
  FALLBACK: 'en',
  NAMESPACES: ['footer', 'main', 'sidebar'],
  DATE_FORMAT_OPTIONS: {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  } as const,
} as const;

// ============================================================================
// Error Messages
// ============================================================================

export const ERROR_MESSAGES = {
  GEOLOCATION_NOT_SUPPORTED: 'Geolocation not supported',
  LOCATION_PERMISSION_DENIED: 'Location permission is not enabled. Please enable it and try again.',
  WEATHER_FETCH_FAILED: 'Failed to fetch weather data',
  FORECAST_FETCH_FAILED: 'Failed to fetch forecast data',
  CITY_SEARCH_FAILED: 'Failed to search for cities',
  INVALID_RESPONSE: 'Invalid response from server',
  NETWORK_ERROR: 'Network error occurred',
} as const;

// ============================================================================
// Default Values
// ============================================================================

export const DEFAULT_VALUES = {
  COORDINATES: {
    lat: 0,
    lon: 0,
  },
  WEATHER: {
    city: '',
    clouds: { all: 0 },
    wind: { speed: 0, deg: 0 },
    visibility: 0,
    weather: '',
    icon: '',
    humidity: 0,
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    pressure: 0,
  },
  FORECAST_ITEM: {
    dt: '',
    min: 0,
    max: 0,
    icon: '',
  },
};

// ============================================================================
// Build Configuration
// ============================================================================

export const BUILD_CONFIG = {
  CHUNK_SIZE_WARNING_LIMIT: 1000, // KB
  VENDOR_CHUNKS: {
    REACT: 'react-vendor',
    I18N: 'i18n-vendor',
    UI: 'ui-vendor',
  },
} as const;
