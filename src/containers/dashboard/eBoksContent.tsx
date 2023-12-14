import { Box, Colors, Typography } from "@kamstrup/kfl";
import Tile from "../../components/tile/tile";
import { TileGroup } from "../../definitions/enums";
import { useEffect, useState } from "react";
import { addMessageReceivedListener } from "../../services/signalRService";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useTranslations } from "../../hooks/useTranslation";
import { fetchEboksStatus } from "../../services/api";
import { checkIfDateTime } from "../../utils/checkIfDate";

const EBoksContent = () => {
  const translations = useTranslations();
  const { connection } = useSelector((state: RootState) => state.connection);
  const [servicesStatus, setServicesStatus] = useState<number>();
  const [dataReceived, setDataReceived] = useState<boolean>(false);
  const [lastDataReceived, setLastDataReceived] = useState<Date>();

  useEffect(() => {
    if (connection)
      addMessageReceivedListener(connection, "EboksData", (data) => {
        if (!isNaN(+data)) {
          setServicesStatus(Number(data));
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

  const getEboksStatus = async () => {
    setServicesStatus(undefined);
    setDataReceived(false);
    setLastDataReceived(undefined);
    const data = await fetchEboksStatus();
    setServicesStatus(data);
    setDataReceived(true);
    setLastDataReceived(data !== undefined ? new Date() : undefined);
  };

  return (
    <Tile
      tileHeader={translations.eboks_services_status}
      tileSubhHeader={
        <Typography variant="subtitle2" sx={{ color: Colors.ERROR_87 }}>
          {TileGroup.eBoks}
        </Typography>
      }
      tooltipText={translations.eboks_services_status_tooltip}
      dataLastReceived={lastDataReceived}
      dataReceived={dataReceived}
      isLoading={servicesStatus === undefined}
      fetchData={getEboksStatus}
    >
      <Box
        sx={{
          color: servicesStatus === 0 ? Colors.SUCCESS_50 : Colors.ERROR_50,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Typography variant="h1" sx={{ fontSize: "64px" }}>
          {servicesStatus}
        </Typography>
        <Typography variant="h1" sx={{ marginLeft: "20%", width: "80px", wordBreak: "normal" }}>
          {translations.services_down}
        </Typography>
      </Box>
    </Tile>
  );
};

export default EBoksContent;
