import { AppBar } from "react-admin";
import { Typography } from "@mui/material";

const MyAppBar = () => (
  <AppBar>
    <Typography variant="h6" sx={{ flex: 1 }}>
      My EcommerceDelevery
    </Typography>
  </AppBar>
);

export default MyAppBar;