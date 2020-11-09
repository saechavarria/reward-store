import AppContext from "../AppContext";
import Loading from "./Loading";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import LoyaltyIcon from "@material-ui/icons/Loyalty";
import { Button, Tooltip } from "@material-ui/core";

import { redeemProduct } from "../services/index";
import { getUser } from "../services/index";
import { ICardContainerProps } from "../services/interfaces";

import swal from "sweetalert";

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
  const classes = useStyles();

  const { user } = useContext(AppContext);
  const { setUser } = useContext(AppContext);
  const [loadingRedeem, setLoadingRedeem] = useState(false);

  async function redeem(id: string) {
    setLoadingRedeem(true);
    try {
      await redeemProduct(id);
      const resUser = await getUser();
      setUser(resUser);
      swal(
        "Good job!",
        `You've redeemed the product ${props.product.name} successfully`,
        "success"
      );
      setLoadingRedeem(false);
    } catch (error) {
      swal(
        "Good job!",
        `You've not redeemed the product ${props.product.name} successfully`,
        "error"
      );
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
              <Typography variant="body2" color="textPrimary" component="p">
                You need {props.product.cost - user.points} points
              </Typography>
            ) : (
              <>
                {!loadingRedeem && (
                  <Tooltip title="Redeem">
                    <Button
                      onClick={() => redeem(props.product.id)}
                      className={classes.btn}
                      variant="contained"
                      color="secondary"
                      endIcon={<LoyaltyIcon />}
                    >
                      {props.product.cost}
                    </Button>
                  </Tooltip>
                )}
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CardContainer;
