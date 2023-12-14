import { GridColDef } from "@kamstrup/kfl";
import { TranslationKeys } from "../../definitions/types";

export const rtoPerUtilityColumns = (translations: TranslationKeys): GridColDef[] => [
  {
    field: "UtilityName",
    headerName: translations.utility_name,
    flex: 1
  },
  {
    field: "LatestCRMData",
    headerName: translations.latest_crm_date,
    flex: 1,
    renderCell: (params) => new Date(params.value).toLocaleString()
  },
  {
    field: "LatestCalculationDate",
    headerName: translations.latest_calculation_date,
    flex: 1,
    renderCell: (params) => new Date(params.value).toLocaleString()
  }
];
