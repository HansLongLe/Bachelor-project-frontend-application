import { FC, PropsWithChildren } from "react";

import {
  TranslationsProvider as IntlTranslationsProvider,
  useLanguage
} from "@kamstrup/kamstrup-intl";

export const TranslationsProvider: FC<PropsWithChildren> = ({ children }) => {
  const { getLanguagePath } = useLanguage(["da", "en"]);

  const messages = require(`../../i18n/${getLanguagePath()}/translations.json`);

  return (
    <IntlTranslationsProvider supportedLocales={["da", "en"]} messages={messages}>
      {children}
    </IntlTranslationsProvider>
  );
};
