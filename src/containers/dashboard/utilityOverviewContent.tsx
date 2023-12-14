import "./style.scss";
import { CheckmarkIcon, CloseIcon, Colors, Typography } from "@kamstrup/kfl";
import { Ref, forwardRef, useEffect, useState } from "react";
import TileWithTable, { TileWithTableMethods } from "../../components/tile/tileWithTable";
import { TileGroup } from "../../definitions/enums";
import { LatestUtilityCalStatus } from "../../definitions/types";
import { utilityOverviewColumns } from "../../components/tableColDefs/utilityOverviewColDef";
import { addMessageReceivedListener } from "../../services/signalRService";
import { isJsonString } from "../../utils/checkifJson";
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { useTranslations } from "../../hooks/useTranslation";
import { fetchUtilityCalculations } from "../../services/api";
import { checkIfDateTime } from "../../utils/checkIfDate";

const UtilityOverviewContent = forwardRef((_props, ref: Ref<TileWithTableMethods>) => {
  const translations = useTranslations();
  const { connection } = useSelector((state: RootState) => state.connection);
  const [tableData, setTableData] = useState<LatestUtilityCalStatus[]>();
  const [calculationDoneCount, setCalculationDoneCount] = useState<number>();
  const [calculationMissingCount, setCalculationMissingCount] = useState<number>();
  const [dataReceived, setDataReceived] = useState<boolean>(false);
  const [lastDataReceived, setLastDataReceived] = useState<Date>();

  useEffect(() => {
    if (connection)
      addMessageReceivedListener(connection, "UtilityData", (data) => {
        if (isJsonString(data)) {
          const dataObj = JSON.parse(data) as LatestUtilityCalStatus[];
          setTableData(dataObj);
          setCalculationDoneCount(
            dataObj.filter((utility) => utility.CalculationLast24Hours).length
          );
          setCalculationMissingCount(
            dataObj.filter((utility) => !utility.CalculationLast24Hours).length
          );
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

  const getUtilityCalculations = async () => {
    setTableData(undefined);
    setDataReceived(false);
    setLastDataReceived(undefined);
    const data = await fetchUtilityCalculations();
    setTableData(data);
    if (data) {
      setCalculationDoneCount(data.filter((utility) => utility.CalculationLast24Hours).length);
      setCalculationMissingCount(data.filter((utility) => !utility.CalculationLast24Hours).length);
    }
    setDataReceived(true);
    setLastDataReceived(data ? new Date() : undefined);
  };

  return (
    <TileWithTable
      ref={ref}
      tileHeader={translations.utility_calculations_status}
      tileSubheader={
        <Typography variant="subtitle2" sx={{ color: Colors.TEAL_25 }}>
          {TileGroup.heatIntelligence}
        </Typography>
      }
      tooltipText={translations.utility_calculations_status_tooltip}
      tableColumn={utilityOverviewColumns(translations)}
      tableData={tableData}
      overview={
        <>
          <div className="calculation-done-count">
            <div className="calculation-count-top">
              <Typography variant="h1" fontSize="48px">
                {calculationDoneCount}
              </Typography>
              <CheckmarkIcon color="success" fontSize="large" />
            </div>
            <div className="calculation-count-bottom">{translations.up_to_date}</div>
          </div>
          <div className="calculation-missing-count">
            <div className="calculation-count-top">
              <Typography variant="h1" fontSize="48px">
                {calculationMissingCount}
              </Typography>
              <CloseIcon color="error" fontSize="large" />
            </div>
            <div className="calculation-count-bottom">{translations.out_of_date}</div>
          </div>
        </>
      }
      isLoading={tableData === undefined}
      dataReceived={dataReceived}
      dataLastReceived={lastDataReceived}
      fetchData={getUtilityCalculations}
    />
  );
});

export default UtilityOverviewContent;
