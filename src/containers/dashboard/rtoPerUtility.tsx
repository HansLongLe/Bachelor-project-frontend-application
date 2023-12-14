import { Typography } from "@kamstrup/kfl";
import { TileGroup } from "../../definitions/enums";
import { Ref, forwardRef, useEffect, useState } from "react";
import { addMessageReceivedListener } from "../../services/signalRService";
import { RTOPerUtilityData } from "../../definitions/types";
import TileWithTable, { TileWithTableMethods } from "../../components/tile/tileWithTable";
import { rtoPerUtilityColumns } from "../../components/tableColDefs/rtoPerUtilityColDef";
import { isJsonString } from "../../utils/checkifJson";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslations } from "../../hooks/useTranslation";
import { fetchRTOPerUtility } from "../../services/api";
import { checkIfDateTime } from "../../utils/checkIfDate";

const RTOPerUtility = forwardRef((_props, ref: Ref<TileWithTableMethods>) => {
  const translations = useTranslations();
  const { connection } = useSelector((state: RootState) => state.connection);
  const [tableData, setTableData] = useState<RTOPerUtilityData[]>();
  const [dataReceived, setDataReceived] = useState<boolean>(false);
  const [lastDataReceived, setLastDataReceived] = useState<Date>();

  useEffect(() => {
    if (connection)
      addMessageReceivedListener(connection, "LatestRTOData", (data) => {
        if (isJsonString(data)) {
          const dataObj = JSON.parse(data) as RTOPerUtilityData[];
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

  const getRtoPerUtility = async () => {
    setTableData(undefined);
    setDataReceived(false);
    setLastDataReceived(undefined);
    const data = await fetchRTOPerUtility();
    setTableData(data);
    setDataReceived(true);
    setLastDataReceived(data ? new Date() : undefined);
  };

  return (
    <TileWithTable
      ref={ref}
      tileHeader={translations.rto_status}
      tileSubheader={
        <Typography variant="subtitle2" sx={{ color: "orange" }}>
          {TileGroup.returnTemperatureOptimizer}
        </Typography>
      }
      tooltipText={translations.rto_status_tooltip}
      tableColumn={rtoPerUtilityColumns(translations)}
      tableData={tableData}
      isLoading={tableData === undefined}
      dataReceived={dataReceived}
      dataLastReceived={lastDataReceived}
      fetchData={getRtoPerUtility}
    />
  );
});

export default RTOPerUtility;
