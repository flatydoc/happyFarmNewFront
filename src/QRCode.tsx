import { Box, Typography } from "@mui/material";
import qrcode from "../src/assets/images/qrcode.png";
export const QRCode = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "32px",
      }}>
      <Typography
        sx={{
          fontFamily: "Benzin",
          color: "#fff",
          fontSize: "24px",
          fontWeight: "600",
        }}>
        Play on your mobile
      </Typography>
      <img src={qrcode} width={250} height={250} />
      <Typography
        sx={{
          fontFamily: "Benzin",
          color: "#fff",
          fontSize: "12px",
          fontWeight: "500",
        }}>
        @happy_farm_clicker_bot
      </Typography>
    </Box>
  );
};
