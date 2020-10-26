import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import EuroSymbolIcon from "@material-ui/icons/EuroSymbol";
import { Button } from "@material-ui/core";

import React from "react";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 245,
    },
    media: {
      height: 0,
      paddingTop: "56.25%", // 16:9
    },
    redeemButton: {
      marginTop: 12,
      width: 100,
      marginLeft: 50,
    },
    btn: {
      marginTop:12,
    }
  })
);

const CardContainer = () => {
  const classes = useStyles();

  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image="https://picsum.photos/200/300"
          title="imagen"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Categoria
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            Producto
          </Typography>
          <div className={classes.redeemButton}>
          <Typography variant="body2" color="textPrimary" component="p">
            Redeem:
          </Typography>
            <Button
              className={classes.btn}
              variant="contained"
              color="secondary"
              endIcon={<EuroSymbolIcon />}
            >
             1.200
            </Button>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardContainer;
