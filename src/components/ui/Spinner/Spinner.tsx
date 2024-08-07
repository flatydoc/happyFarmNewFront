import { Box, CircularProgress } from "@mui/material";
import { colors } from "../../../core/theme/colors";

export const Spinner = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}>
      <CircularProgress
        sx={{
          color: colors.primary,
        }}
      />
    </Box>
  );
};
