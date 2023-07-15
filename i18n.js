import i18n from 'i18next';
import { useRouter } from 'next/router';
import { initReactI18next } from 'react-i18next';
import { resources } from './resources';

const I18n = () => {
  const { locale } = useRouter();

  i18n.use(initReactI18next).init({
    resources,
    lng: locale,
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    // debug: true,
  });

  return null;
};

export default I18n;
