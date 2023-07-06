import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/system";

const Loader = () => {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="200px"
    >
      <CircularProgress color="primary" />
    </Box>
  );
};

export default Loader;