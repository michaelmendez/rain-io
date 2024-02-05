import { useTranslation } from 'react-i18next';

interface FooterProps {
  name: string;
  href: string;
}

export const Footer: React.FC<FooterProps> = ({ name, href }) => {
  const { t } = useTranslation('footer');
  return (
    <span>
      {t('createdBy')}{' '}
      <a
        href={href}
        rel="noreferrer"
        target="_blank"
        className="font-semibold underline underline-offset-2 hover:opacity-75"
      >
        {name}
      </a>
    </span>
  );
};