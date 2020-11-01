import AppContext from "../AppContext";
import Loading from "./Loading";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { Button } from "@material-ui/core";

import { redeemProduct } from "../services/index";

import { ICardContainerProps } from "../services/interfaces";


import { useToasts } from "react-toast-notifications";

import React, { useContext, useState } from "react";

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
      marginLeft: 60,
    },
    btn: {
      marginTop: 12,
    },
  })
);

const CardContainer = (props: ICardContainerProps) => {

  const { addToast } = useToasts()

  const classes = useStyles();

  const user = useContext(AppContext);

  const [loadingRedeem, setLoadingRedeem] = useState(false);

  async function redeem(id: string) {
    setLoadingRedeem(true);
    try {
      await redeemProduct(id);
      addToast(`You've redeem the product ${props.product.name} successfully`, {
        appearance: 'success',
        autoDismiss: true,
      })
      setLoadingRedeem(false);
    } catch (error) {
      addToast("Error", {
        appearance: 'error',
        autoDismiss: true,
      })
      console.log(error);
    }
  }

  if (loadingRedeem) {
    return <Loading />;
  }
  return (
    <>
      <Card className={classes.root}>
        <CardMedia
          className={classes.media}
          image={props.product.img.hdUrl}
          title="imagen"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.product.category}
          </Typography>
          <Typography variant="body2" color="textPrimary" component="p">
            {props.product.name}
          </Typography>
          <div className={classes.redeemButton}>
            {user.points < props.product.cost ? (
              `You need ${props.product.cost - user.points}`
            ) : (
              <>
                <Button
                  onClick={() => redeem(props.product.id)}
                  className={classes.btn}
                  variant="contained"
                  color="secondary"
                  endIcon={<LoyaltyIcon />}
                >
                  {props.product.cost}
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardContainer;
