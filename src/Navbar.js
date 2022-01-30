import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Avatar ,Grid} from "@mui/material";


const styles = {
  navabarSections: {
    position: "absolute",
    right: "0px",
  },
};

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" color="inherit">
        <Toolbar>

          <Grid  container>
            <Grid item container xs={6}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
            <MenuIcon />
            </IconButton>
            <Avatar
              alt="F1 Logo"
              src={require("./ImagesUsed/f1Logo.png")}
              sx={{ width: 40, height: 40 }}
              variant="square"
            />
             </Grid>
            <Grid  container xs={6} justifyContent="flex-end" rowSpacing={0}>
            <Grid item xs={3}> 
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              align="right"
            >
              Home
            </Typography>
            </Grid>
            <Grid item xs={3}>
            <Typography
              variant="h6"
              color="inherit"
              component="div"
              align="right"
            >
              Track Locator
            </Typography>
            </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
