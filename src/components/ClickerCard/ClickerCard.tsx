import { Box, Typography } from "@mui/material";

import WebApp from "@twa-dev/sdk";
import React, { useState } from "react";
import styles from "./ClickerCard.module.scss";
import { charImgByLevel } from "../../core/configs/constants";

interface TouchPosition {
  x: number;
  y: number;
}

export const ClickerCard = ({
  tap,
  energy,
  rewardPerClick,
  energyPerClick,
  level,
  turbo,
}: {
  tap: () => void;
  energy: number;
  rewardPerClick: number;
  energyPerClick: number;
  level: number;
  turbo: boolean;
}) => {
  const [clickPositions, setClickPositions] = useState<TouchPosition[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTouch = (event: React.TouchEvent<HTMLDivElement>) => {
    if (energy < energyPerClick) {
      WebApp.HapticFeedback.notificationOccurred("warning");
      return;
    }

    const touches = event.touches;
    if (touches.length > 5) {
      setClickPositions([]);
    }

    for (let i = 0; i < touches.length; i++) {
      const x = touches[i].clientX;
      const y = touches[i].clientY;
      setClickPositions((prevPositions) => [...prevPositions, { x, y }]);
    }
    tap();
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 200);
    if (turbo) {
      WebApp.HapticFeedback.impactOccurred("heavy");
    } else {
      WebApp.HapticFeedback.impactOccurred("soft");
    }
  };

  return (
    <>
      <Box
        onTouchStart={(e) => handleTouch(e)}
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          bottom: "-120px",
          left: "50%",
          transform: `translateX(-50%)`,
          zIndex: "25",
        }}
      />
      <img
        className={isAnimating ? styles.shrinkAnimation : ""}
        onClick={(e) => e.stopPropagation()}
        src={charImgByLevel[level]}
        alt="char"
        style={{
          display: "block",
          bottom: "24px",
          position: "absolute",
          left: "50%",
          width: "320px",
          transform: `translateX(-45%)`,
          zIndex: "20",
        }}
      />
      {clickPositions.map((position, index) => (
        <Typography
          className={styles.coin}
          key={index}
          style={{
            color: "#fff",
            fontSize: "36px",
            fontFamily: "Benzin",
            fontWeight: "600",
            position: "absolute",
            top: `${position.y}px`,
            left: `${position.x}px`,
            textShadow: "0px 4px 4px rgba(0, 0, 0, 0.4)",
            zIndex: "30",
          }}>
          {`+${rewardPerClick.toFixed(0)}`}
        </Typography>
      ))}
    </>
  );
};
