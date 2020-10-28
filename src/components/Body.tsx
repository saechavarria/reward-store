import React, { useState, useEffect } from "react";
import CardContainer from "./CardContainer";
import { IProducts } from "../services/interfaces";

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
  const [data, setData] = useState<IProducts[]>(null);

  useEffect(() => {
    async function init() {
      try {
        const productService = await getProduct();
        setData(productService);
      } catch (error) {
        console.log("ERROR : " + error);
      }
    }

    init();
  }, []);

  const classes = useStyles();

  const [value, setValue] = React.useState(3);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  return (
    <div>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="inittabs"
        >
          <Tab label="16 of 32 products" disabled />
          <Tab label="|" disabled />
          <Tab label="sort by:" disabled />
          <Tab label="Most Recently" />
          <Tab label="Lower Price" />
          <Tab label="Highest Price" />
        </Tabs>
      </Paper>
      <Grid container spacing={2} className={classes.container}>
        {!data ? (
          <h1>loading</h1>
        ) : (
          data.map((product,i) => (
            <Grid item lg={2}  md={4} sm={6} xs={12} key={i}>
              <CardContainer product={product} />
            </Grid>
          ))
        )}
      </Grid>
      <Paper square>
        <Tabs
          value={0}
          indicatorColor="secondary"
          textColor="secondary"
          aria-label=""
        >
          <Tab label="16 of 32 products" disabled />
        </Tabs>
      </Paper>
    </div>
  );
};

export default Body;
