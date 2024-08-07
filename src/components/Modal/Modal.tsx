import { FC, PropsWithChildren, ReactNode, useRef } from "react";
import { Box } from "@mui/material";
import styles from "./Modal.module.scss";
import useOnClickOutside from "../../core/hooks/useOnClickOutside";

export interface IModal {
  closeFunc?: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
}

export const Modal: FC<PropsWithChildren<IModal>> = ({
  closeFunc,
  children,
}) => {
  const ref = useRef(null);

  if (closeFunc) {
    useOnClickOutside(ref, () => closeFunc(false));
  }

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "center",
        position: "fixed",
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backdropFilter: "blur(5px)",
        zIndex: "10000",
      }}>
      <Box
        sx={{
          width: "100%",
        }}
        ref={ref}
        className={styles.modal}>
        {children}
      </Box>
    </Box>
  );
};
