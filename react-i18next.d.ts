// import the original type declarations
import 'react-i18next';
// import all namespaces (for the default language, only)
import footerNs from './public/locales/en/footer.json';
import mainNs from './public/locales/en/main.json';
import sidebar from './public/locales/en/sidebar.json';

// react-i18next versions lower than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface Resources {
    footerNs: typeof footerNs;
    mainNs: typeof mainNs;
    sidebar: typeof sidebar;
  }
}

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  // and extend them!
  interface CustomTypeOptions {
    // custom namespace type if you changed it
    defaultNS: 'ns1';
    // custom resources type
    resources: {
      footerNs: typeof footerNs;
      mainNs: typeof mainNs;
      sidebar: typeof sidebar;
    };
  }
}
