import { Box } from "@mui/material";
import bg from "../assets/images/bg/pattern.png";
import { LeadersList } from "../components/LeadersList/LeadersList";
import { useOutletContext } from "react-router-dom";
import { IStateContextType } from "../core/types";
import useSWR from "swr";

import { useContext, useState } from "react";
import WebApp from "@twa-dev/sdk";
import { LeadersListNavigation } from "../components/LeadersListNavigation/LeadersListNavigation";
import { getLeadersByLevel } from "../core/services/leaders.service";
import { AuthContext } from "../core/context/AuthContext";

export const LeaderBoardPage = () => {
  const { level, displayBalance } = useOutletContext<IStateContextType>();
  const authContext = useContext(AuthContext);
  const { user } = authContext!;
  const telegramId = user?.telegramId;

  const [activeSlide, setActiveSlide] = useState(level);
  const prevSlide = () => {
    if (activeSlide !== 1) {
      setActiveSlide((prev: number) => prev - 1);
      WebApp.HapticFeedback.impactOccurred("light");
    }
  };
  const nextSlide = () => {
    if (activeSlide !== 10) {
      setActiveSlide((prev: number) => prev + 1);
      WebApp.HapticFeedback.impactOccurred("light");
    }
  };

  const {
    data: leaders,
    isLoading,
    error,
  } = useSWR(["leaders", activeSlide, telegramId], () =>
    getLeadersByLevel(activeSlide, telegramId!)
  );

  const leadersData = leaders?.data.dtosLeaders;
  const totalUsersByLevel = leaders?.data.totalUsersByLevel;
  const position = leaders?.data.position;
  return (
    <Box
      sx={{
        height: "100%",
        overflowY: "auto",
        overflowX: "hidden",
        background: `url(${bg}),linear-gradient(180deg, rgba(53, 36, 21, 1) 0%, rgba(53, 36, 21, 1) 100%)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "scroll",
        display: "flex",
        position: "relative",
        padding: " 48px 16px 16px 16px",
        gap: "24px",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <LeadersListNavigation
        prevSlide={prevSlide}
        nextSlide={nextSlide}
        activeSlide={activeSlide}
      />
      <LeadersList
        level={activeSlide}
        leaders={leadersData}
        isLoading={isLoading}
        error={error}
        totalUsers={totalUsersByLevel}
        position={position}
        displayBalance={displayBalance}
      />
    </Box>
  );
};
