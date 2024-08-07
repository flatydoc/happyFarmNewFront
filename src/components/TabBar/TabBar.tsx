import { Box, Typography } from "@mui/material";
import { colors } from "../../core/theme/colors";
import { centerContentStyles } from "../../core/theme/commonStyle";
import WebApp from "@twa-dev/sdk";

interface ITab {
  id: number;
  name: string;
}

export const TabBar = ({
  activeTab,
  setActiveTab,
  tabs,
  top,
  fontSize = 12,
}: {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  tabs: ITab[];
  top: number;
  fontSize: number;
}) => {
  const handleChangeTab = (id: number) => {
    setActiveTab(id);
    WebApp.HapticFeedback.impactOccurred("light");
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: `repeat(${tabs.length}, 1fr)`,
        width: "100%",
        boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.25)",
        backgroundColor: "rgba(101, 101, 101, 0.25)",
        backdropFilter: "blur(10px)",
        borderRadius: "10px",
        padding: "2px",
        position: "sticky",
        top,
        zIndex: "50",
      }}>
      {tabs.map(({ id, name }) => (
        <Box
          key={id}
          sx={{
            ...centerContentStyles,
            backgroundColor:
              activeTab === id ? colors.brownLight : "transparent",
            padding: "12px 10px",
            borderRadius: "8px",
            width: "100%",
            transition: "all ease 0.2s",
          }}
          onClick={() => handleChangeTab(id)}>
          <Typography
            sx={{
              width: "100%",
              fontWeight: activeTab === id ? "600" : "500",
              fontFamily: "SuisseIntl",
              fontSize: `${fontSize}px`,
              lineHeight: "18px",
              color: "#fff",
              textAlign: "center",
              // whiteSpace: "nowrap",
            }}>
            {name}
          </Typography>
        </Box>
      ))}
    </Box>
  );
};
