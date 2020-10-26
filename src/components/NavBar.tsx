import React, { useContext } from "react";
import AppContext from "../AppContext";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
  })
);

const NavBar = () => {
  const user = useContext(AppContext);
  const classes = useStyles();
  
  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Rewards Store
          </Typography>
          <Typography variant="h6">{user ? user.name+' points: '+ user.points : "loading"}</Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
