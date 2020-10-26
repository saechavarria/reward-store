import React, { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import { Product } from "../services/interfaces";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";
import { getProduct } from "../services";

const useStyles = makeStyles({
  container: {
    padding: 10,
    flexGrow: 1,
  },
  footer: {
    position: "fixed",
    left: 0,
    bottom: 0,
    width: "100%",
  },
});

const Body = () => {
  const [data, setData] = useState<Product>(null);

  useEffect(() => {
    async function init() {
      try {
        const productService = await getProduct();
        setData(productService);
      } catch (error) {
        console.log("ERROR : " + error);
      }
    }

    init()
  }, []);

  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };
  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label=""
        >
          <Tab label="16 of 32 products" disabled />
          <Tab label="|" disabled />
          <Tab label="sort by:" disabled />
          <Tab label="Most Recently" />
          <Tab label="Lower Price" />
          <Tab label="Highest Price" />
        </Tabs>
      </Paper>
      <div className={classes.container}>
        <Grid container spacing={1}>
          <Grid item xs={3}>
            <CardContainer />
          </Grid>
        </Grid>
      </div>

      <Paper square className={classes.footer}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label=""
        >
          <Tab label="16 of 32 products" disabled />
        </Tabs>
      </Paper>
    </>
  );
};

export default Body;
