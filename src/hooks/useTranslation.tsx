import { useIntl } from "react-intl";
import translationJson from "../i18n/translations.json";
import { TranslationKeys } from "../definitions/types";

export const useTranslations = (): TranslationKeys => {
  const intl = useIntl();
  const translationsInIntl = Object.keys(translationJson).map((t) => {
    return [t, intl.formatMessage({ id: t })];
  });
  const translations = translationsInIntl.reduce((res, key) => {
    res[key[0]] = key[1];
    return res;
  }, Object.create(null));
  return translations as TranslationKeys;
};
