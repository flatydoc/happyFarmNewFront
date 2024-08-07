import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const Loader = () => {
  const [loadingPercentage, setLoadingPercentage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (loadingPercentage < 99) {
        setLoadingPercentage((prevState) => {
          const randomValue = Math.floor(Math.random() * 20) + 1;
          const newValue = prevState + randomValue;
          return newValue > 100 ? 100 : newValue;
        });
      }
    }, 200);

    return () => clearInterval(timer);
  }, [loadingPercentage]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}>
      <Typography
        sx={{
          fontSize: "96px",
          fontWeight: "600",
          fontFamily: "Benzin",
          color: "#fff",
        }}>
        {loadingPercentage}%
      </Typography>
    </Box>
  );
};
