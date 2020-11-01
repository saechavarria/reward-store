import React from "react";
import loading from "../img/loading.gif"
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      marginTop: 40
    },
    media: {
      height:200,
      width: 200
    },
  })
);

const Loading = () => {
  const classes = useStyles();

  return (
    <Grid container justify="center" className={classes.root}>
      <img src={loading} className={classes.media} alt="imageLoading"></img>
    </Grid>
  );
};

export default Loading;
