import { Box, Colors, Typography } from "@kamstrup/kfl";
import { MissingDataIcon } from "../../icons/missingDataIcon";
import { useTranslations } from "../../hooks/useTranslation";

const MissingData = () => {
  const translations = useTranslations();
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <MissingDataIcon />
      <Typography color={Colors.GREY_12} sx={{ marginTop: "16px" }}>
        {translations.no_data_has_been_found}
      </Typography>
    </Box>
  );
};

export default MissingData;
