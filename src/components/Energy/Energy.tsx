import { Box, Typography } from "@mui/material";
import { MAX_ENERGY } from "../../core/configs/constants";
export const Energy = ({
  energy,
  setIsShowBoostPopup,
  turbo,
}: {
  energy: number;
  turbo: boolean;
  setIsShowBoostPopup: (isShow: boolean) => void;
}) => {
  const energyPercentage = Math.min((energy / MAX_ENERGY) * 100, 100);

  return (
    <Box
      sx={{
        position: "relative",
        zIndex: "40",
        padding: "0 18px",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "10px",
        width: "100%",
      }}>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
        <Typography
          sx={{
            color: "#fff",
            fontSize: "15px",
            fontWeight: "500",
            fontFamily: "SuisseIntl",
          }}>{`⚡️${energy}`}</Typography>
        <button onClick={() => setIsShowBoostPopup(true)}>
          <Typography
            sx={{
              color: "#fff",
              fontSize: "15px",
              fontWeight: "500",
              fontFamily: "SuisseIntl",
            }}>
            Boost 🚀
          </Typography>
        </button>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "20px",
          border: "1px solid rgba(255, 255, 255, 0.15)",
          borderRadius: "116px",
          backgroundColor: "rgba(0, 0, 0, 0.65)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          overflow: "hidden",
        }}>
        <Box
          sx={{
            transition: "width 0.2s ease",
            width: `${energyPercentage.toFixed(0)}%`,
            height: "18px",
            borderRadius: "116px",
            background: turbo
              ? `linear-gradient(269.85deg, #429af8 1.07%, #1c70ca 99.91%)`
              : "linear-gradient(269.85deg, #C2FF00 1.07%, #FFD619 99.91%)",
          }}
        />
      </Box>
    </Box>
  );
};
