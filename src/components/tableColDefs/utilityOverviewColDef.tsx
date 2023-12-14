import { CheckmarkIcon, CloseIcon, GridColDef } from "@kamstrup/kfl";
import { TranslationKeys } from "../../definitions/types";

export const utilityOverviewColumns = (translations: TranslationKeys): GridColDef[] => [
  {
    field: "UtilityName",
    headerName: translations.utility_name,
    flex: 0.5
  },
  {
    field: "CalculationLast24Hours",
    headerName: translations.calculation_done_in_the_last_24_hours,
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return params.value ? <CheckmarkIcon color="success" /> : <CloseIcon color="error" />;
    }
  }
];
