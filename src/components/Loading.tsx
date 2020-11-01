import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginTop: 40
    },
  })
);

const Loading = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <CircularProgress color="secondary" />
    </Grid>
  );
};

export default Loading;
