import { Box, Colors, GridColDef, Tooltip, Typography } from "@kamstrup/kfl";
import FilledCircleIcon from "../../icons/filledCircleIcon";
import { FC } from "react";
import { TranslationKeys } from "../../definitions/types";

type Props = {
  title: string;
  color: Colors;
  number: number;
};

const CircleWithTooltip: FC<Props> = (props) => {
  return (
    <Tooltip title={props.title}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "4px" }}>
        <FilledCircleIcon color={props.color} />
        <Typography variant="body3" sx={{ position: "absolute", color: Colors.WHITE }}>
          {props.number + 1}
        </Typography>
      </Box>
    </Tooltip>
  );
};

export const categorizeBasedOnState = (numbers: number[]) => {
  const greyCount = numbers.filter((num) => num === -1).length;
  const greenCount = numbers.filter((num) => num === 0).length;
  const yellowCount = numbers.filter((num) => num === 1).length;
  const redCount = numbers.filter((num) => num > 1).length;

  return { greyCount, greenCount, yellowCount, redCount };
};

export const sortZonesComparator = (a: number[], b: number[]) => {
  const categoryA = categorizeBasedOnState(a);
  const categoryB = categorizeBasedOnState(b);
  if (categoryA.greyCount !== categoryB.greyCount) {
    return categoryA.greyCount - categoryB.greyCount;
  }
  if (categoryA.greenCount !== categoryB.greenCount) {
    return categoryA.greenCount - categoryB.greenCount;
  }
  if (categoryA.yellowCount !== categoryB.yellowCount) {
    return categoryA.yellowCount - categoryB.yellowCount;
  }
  return categoryA.redCount - categoryB.redCount;
};

export const calculationsPerUtilityColumns = (translations: TranslationKeys): GridColDef[] => [
  {
    field: "UtilityName",
    headerName: translations.utility_name,
    flex: 0.5
  },
  {
    field: "CalculationDate",
    headerName: translations.last_calculation_date,
    renderCell: (params) => new Date(params.value).toLocaleDateString(),
    flex: 0.5
  },
  {
    field: "ZonePeriodsWithMissingCalculations",
    headerName: translations.calculations_per_zone,
    renderCell: (params) => (
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        {params.value.map((value: number, index: number) =>
          value === -1 ? (
            <CircleWithTooltip
              key={index}
              title={translations.no_data_for_the_zone}
              color={Colors.GREY_25}
              number={index}
            />
          ) : value === 0 ? (
            <CircleWithTooltip
              key={index}
              title={`0 ${translations.period_with_missing_calculation}`}
              color={Colors.SUCCESS_50}
              number={index}
            />
          ) : value === 1 ? (
            <CircleWithTooltip
              key={index}
              title={`1 ${translations.period_with_missing_calculation}`}
              color={Colors.WARNING_50}
              number={index}
            />
          ) : (
            <CircleWithTooltip
              key={index}
              title={`${value} ${translations.periods_with_missing_calculation}`}
              color={Colors.ERROR_50}
              number={index}
            />
          )
        )}
      </Box>
    ),
    flex: 1,
    sortComparator: sortZonesComparator
  }
];
