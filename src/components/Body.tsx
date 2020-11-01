import React, { useState, useEffect, useContext } from "react";
import CardContainer from "./CardContainer";
import { IProducts } from "../services/interfaces";
import AppContext from "../AppContext";
import Loading from "./Loading";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Pagination from "@material-ui/lab/Pagination";

import { makeStyles } from "@material-ui/core/styles";
import { getProduct } from "../services";
import usePagination from "../helpers/Pagination";
import { sortLowerPrice } from "../helpers";
import { sortHigherPrice } from "../helpers";



const useStyles = makeStyles({
  container: {
    marginTop: 20,
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
  const {user} = useContext(AppContext);

  const [data, setData] = useState<IProducts[]>([]);
  
  const [page, setPage] = useState(1);

  const PER_PAGE = 10;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChangePage = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  async function sortMostRecently() {
    try {
      const dataCopy = await getProduct();
      setData(dataCopy);
    } catch (error) {
      console.log("ERROR : " + error);
    }
  }

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

  const [value, setValue] = React.useState(1);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <>
      <Paper square>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          aria-label="inittabs"
        >
          <Tab label="sort by:" disabled />
          <Tab label="Most recently" onClick={() => sortMostRecently()} />
          <Tab label="Lower Price" onClick={() => sortLowerPrice(data)} />
          <Tab label="Highest Price" onClick={() => sortHigherPrice(data)} />
        </Tabs>
      </Paper>
      <Grid
        container
        spacing={2}
        justify="center"
        className={classes.container}
      >
        {!data ? (
          <h1>loading</h1>
        ) : (
          _DATA.currentData().map((product, i) => (
            <Grid item lg={2} md={4} sm={6} xs={12} key={i}>
              <CardContainer product={product} />
            </Grid>
          ))
        )}
      </Grid>
      <Grid container justify="center" className={classes.container}>
        <Pagination
          size="large"
          count={count}
          page={page}
          onChange={handleChangePage}
          color="secondary"
        />
      </Grid>
      <Paper square>
        <Tabs
          value={0}
          indicatorColor="secondary"
          textColor="secondary"
          aria-label=""
        >
          <Tab label="REWARD STORE" disabled />
        </Tabs>
      </Paper>
    </>
  );
};

export default Body;
