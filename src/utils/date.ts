const defaultOptions: Intl.DateTimeFormatOptions = {
  weekday: 'short',
  month: 'short',
  day: 'numeric',
};

export const formatDate = ({
  date = new Date(),
  lang = 'en-UK',
  options = defaultOptions,
}) => {
  return date?.toLocaleString(lang, options);
};
