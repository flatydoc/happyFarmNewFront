import classNames from "classnames";
import { NavLink } from "react-router-dom";
import icons from "../../../assets/Icons/icons.svg";
import { SvgIcon, Typography } from "@mui/material";
import styles from "./Link.module.scss";
import WebApp from "@twa-dev/sdk";

export const Link = ({ to, label }: { to: string; label: string }) => {
  const customLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(styles.link, { [styles.activeLink]: isActive });
  };

  const handleClick = () => {
    WebApp.HapticFeedback.impactOccurred("light");
  };

  return (
    <NavLink
      onClick={handleClick}
      to={to}
      className={customLink}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "4px",
        position: "relative",
        padding: "0 12px",
        height: "100%",
        width: "66px",
        flexGrow: "1",
      }}>
      <SvgIcon
        component="svg"
        sx={{
          width: "25px",
          height: "25px",
          transition: "all ease 0.2s",
        }}>
        <use href={`${icons}#${to}`} />
      </SvgIcon>
      <Typography
        className={styles.label}
        sx={{
          fontSize: "10px",
          fontWeight: 500,
          fontFamily: "SuisseIntl",
          lineHeight: "11.58px",
          transition: "all ease 0.2s",
        }}>
        {label}
      </Typography>
    </NavLink>
  );
};
