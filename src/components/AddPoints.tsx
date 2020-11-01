import React, { useContext, useState } from "react";
import { IconButton } from "@material-ui/core";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { addPoints, getUser } from "../services/index";
import AppContext from "../AppContext";
import CircularProgress from "@material-ui/core/CircularProgress";
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    btn: {
      color: "#ffffff",
    },
  })
);

const AddPoints = () => {
  const [loadingPoints, setLoadingPoints] = useState(false);

  const { setUser } = useContext(AppContext);

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseModal = () => {
    setAnchorEl(null);
  };
  async function handleClose(points: number) {
    setLoadingPoints(true);
    try {
      setAnchorEl(null);
      await addPoints(points);
      const newPoints = await getUser();
      setUser(newPoints);
    } catch (error) {
      console.log(error);
      setAnchorEl(null);
    }
    setLoadingPoints(false);
  }

  if (loadingPoints) {
    return (
      <>
        <CircularProgress className={classes.btn} size={20} />
      </>
    );
  }
  return (
    <>
      <IconButton
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.btn}
      >
        <AddCircleIcon />
      </IconButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseModal}
      >
        <MenuItem onClick={() => handleClose(1000)}>Add 1000</MenuItem>
        <MenuItem onClick={() => handleClose(5000)}>Add 5000</MenuItem>
        <MenuItem onClick={() => handleClose(7500)}>Add 7500</MenuItem>
      </Menu>
    </>
  );
};

export default AddPoints;
