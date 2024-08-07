import { Box, Typography } from "@mui/material";
import { colors } from "../../../core/theme/colors";

export const TabInfoCard = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "8px 14px",
        borderRadius: "16px",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
        backgroundColor: colors.brown,
        border: "1px solid rgba(255, 255, 255, 0.06)",
        flexGrow: "1",
        gap: "4px",
        height: "58px",
      }}>
      <Typography
        sx={{
          color: "#fff",
          fontSize: "18px",
          fontWeight: "600",
          fontFamily: "SuisseIntl",
        }}>
        {value}
      </Typography>
      <Typography
        sx={{
          color: colors.primary,
          fontSize: "10px",
          fontWeight: "400",
          textAlign: "center",
          whiteSpace: "nowrap",
          fontFamily: "SuisseIntl",
        }}>
        {label}
      </Typography>
    </Box>
  );
};
