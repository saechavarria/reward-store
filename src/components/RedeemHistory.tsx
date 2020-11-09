import React from "react";

import IconButton from "@material-ui/core/IconButton";
import HistoryIcon from "@material-ui/icons/History";
import ModalRedeem from "./Modal";
import Tooltip from "@material-ui/core/Tooltip";

import Modal from "@material-ui/core/Modal";

import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      color: "#ffffff",
    },
    modal: {
      position: "absolute",
      width: 800,
      backgroundColor: " white",
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: "16px 32px 24px",
      top: "50%",
      left: "50%",
      transform: "translate(-50%,-50%)",
    },
  })
);

const RedeemHistory = () => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip title="Redeem History">
        <IconButton
          color="secondary"
          component="span"
          className={classes.button}
          onClick={handleOpen}
        >
          <HistoryIcon />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.modal}>
          <ModalRedeem />
        </div>
      </Modal>
    </>
  );
};

export default RedeemHistory;
