import { Box, Typography } from "@mui/material";

export default function Header() {
  return (
    <Box
      sx={{
        background: "#149BF3",
        padding: "0px 20px",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: " center",
          height: "50px",
        }}
      >
        <Typography
          sx={{
            font: "normal 500 20px/24px Cabin",
            color: "white",
          }}
        >
          How can I help you?
        </Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: " center", height: "50px" }}>
        <Typography
          sx={{
            font: "normal 500 16px/20px Cabin",
            color: "white",
          }}
        >
          I can answer routine questions about banking related FAQ.
        </Typography>
      </Box>
    </Box>
  );
}
