import React, { useContext } from "react";
import RedeemHistory from "./RedeemHistory";
import AppContext from "../AppContext";
import AddPoints from "./AddPoints";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import GitHubIcon from "@material-ui/icons/GitHub";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    link: {
      color: "#ffffff",
    },
  })
);

const NavBar = () => {
  const {user}  = useContext(AppContext);
  const classes = useStyles();
  

  return (
    <div className={classes.root}>
      <AppBar position="static" color="secondary">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <a
              href="https://github.com/saechavarria/reward-store"
              className={classes.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon />
            </a>
          </Typography>
          {user &&  <RedeemHistory />}
          <Typography variant="h6">
            {user ? user.name.toUpperCase() +
                ", POINTS: " +
                new Intl.NumberFormat().format(user.points)
              : "LOADING..."}
          </Typography>
          {user && <AddPoints/> }
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;
