import React from "react";
import { CircularProgress, Stack } from "@mui/material";
export default function CircularLoader({ color,size }) {
  return (
    <Stack
      alignItems="center"
      style={{
        left: "50%",
      }}
    >
      <CircularProgress size={size} style={{ color: color }} />
    </Stack>
  );
}
