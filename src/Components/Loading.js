import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const styles = {
  fullHeight: {
    height: "100vh", // 100% of the viewport height
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
};

export default function CircularIndeterminate() {
  return (
    <Box sx={styles.fullHeight}>
      <CircularProgress />
    </Box>
  );
}
