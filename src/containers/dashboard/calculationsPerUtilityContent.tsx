import { Ref, forwardRef, useEffect, useState } from "react";
import TileWithTable, { TileWithTableMethods } from "../../components/tile/tileWithTable";
import { TileGroup } from "../../definitions/enums";
import { calculationsPerUtilityColumns } from "../../components/tableColDefs/calculationsPerUtilityColDef";
import { CalculationsPerUtilityAndZones } from "../../definitions/types";
import { Colors, Typography } from "@kamstrup/kfl";
import { addMessageReceivedListener } from "../../services/signalRService";
import { isJsonString } from "../../utils/checkifJson";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import FilledCircleIcon from "../../icons/filledCircleIcon";
import { useTranslations } from "../../hooks/useTranslation";
import { fetchCalculationsPerUtility } from "../../services/api";
import { checkIfDateTime } from "../../utils/checkIfDate";

const CalculationsPerUtilityContent = forwardRef((_props, ref: Ref<TileWithTableMethods>) => {
  const translations = useTranslations();
  const { connection } = useSelector((state: RootState) => state.connection);
  const [tableData, setTableData] = useState<CalculationsPerUtilityAndZones[]>();
  const [dataReceived, setDataReceived] = useState<boolean>(false);
  const [lastDataReceived, setLastDataReceived] = useState<Date>();

  useEffect(() => {
    if (connection)
      addMessageReceivedListener(connection, "UtilityWithZones", (data) => {
        if (isJsonString(data)) {
          const dataObj = JSON.parse(data) as CalculationsPerUtilityAndZones[];
          setTableData(dataObj);
        } else {
          setDataReceived(true);
        }
      });
  }, [connection]);

  useEffect(() => {
    if (connection) {
      addMessageReceivedListener(connection, "LastDataCollection", (data) => {
        if (checkIfDateTime(data)) {
          setLastDataReceived(new Date(data));
        }
      });
    }
  }, [connection]);

  const getCalculationsPerUtility = async () => {
    setTableData(undefined);
    setDataReceived(false);
    setLastDataReceived(undefined);
    const data = await fetchCalculationsPerUtility();
    setTableData(data);
    setDataReceived(true);
    setLastDataReceived(data ? new Date() : undefined);
  };

  return (
    <TileWithTable
      ref={ref}
      tileHeader={translations.calculations_per_utility_and_its_zones}
      tileSubheader={
        <Typography variant="subtitle2" sx={{ color: Colors.TEAL_25 }}>
          {TileGroup.heatIntelligence}
        </Typography>
      }
      tooltipText={
        <>
          <Typography variant="body2">
            {translations.calculations_per_utility_and_its_zones_tooltip}
          </Typography>
          <Typography variant="body2">
            <ul>
              <li>
                <FilledCircleIcon color={Colors.SUCCESS_50} fontSize={8} />
                {" " + translations.zero_periods_with_missing_calculation_in_the_zone}
              </li>
              <li>
                <FilledCircleIcon color={Colors.GREY_25} fontSize={8} />
                {" " + translations.no_data_for_the_specific_zone}
              </li>
              <li>
                <FilledCircleIcon color={Colors.WARNING_50} fontSize={8} />
                {" " + translations.equal_one_period_with__missing_calculation}
              </li>
              <li>
                <FilledCircleIcon color={Colors.ERROR_50} fontSize={8} />
                {" " + translations.more_than_1_periods_with_missing_calculation}
              </li>
            </ul>
            {translations.calculations_per_utility_and_its_zones_tooltip_2}
          </Typography>
        </>
      }
      tableColumn={calculationsPerUtilityColumns(translations)}
      tableData={tableData}
      sortModel={[{ field: "ZonePeriodsWithMissingCalculations", sort: "asc" }]}
      isLoading={tableData === undefined}
      dataReceived={dataReceived}
      dataLastReceived={lastDataReceived}
      fetchData={getCalculationsPerUtility}
    />
  );
});

export default CalculationsPerUtilityContent;
