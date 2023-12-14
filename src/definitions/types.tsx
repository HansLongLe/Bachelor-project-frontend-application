import translationJson from "../i18n/translations.json";

export type LatestUtilityCalStatus = {
  RowId: number;
  UtilityName: string;
  CalculationLast24Hours: boolean;
};

export type CalculationsPerUtilityAndZones = {
  RowId: number;
  UtilityName: string;
  ZonePeriodsWithMissingCalculations: number[];
};

export type RTOPerUtilityData = {
  RowId: number;
  UtilityName: string;
  LatestCRMDate: Date;
  LatestCalculationDate: Date;
};

export type AuthenticationContextState = {
  accessToken: string;
  customerId: string;
  authenticationName: string;
  authenticationTenantName: string;
};

export type TranslationKeys = typeof translationJson;
