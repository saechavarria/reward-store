import React, { useEffect, useState } from "react";
import usePagination from "../helpers/Pagination";

import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import { IHistory } from "../services/interfaces";
import { getHistory } from "../services";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Pagination from "@material-ui/lab/Pagination";
import Loading from "./Loading";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    padding: 20,
  },
});

const ModalRedeem = () => {
  const classes = useStyles();

  const [data, setData] = useState<IHistory[]>([]);
  const [load,setLoad] = useState(true)
  const [page, setPage] = useState(1);

  const PER_PAGE = 10;

  const count = Math.ceil(data.length / PER_PAGE);
  const _DATA = usePagination(data, PER_PAGE);

  const handleChangePage = (e: any, p: any) => {
    setPage(p);
    _DATA.jump(p);
  };

  useEffect(() => {
    async function init() {
      try {
        const historyService = await getHistory();
        setData(historyService);
        setLoad(false)
      } catch (error) {
        console.log(error);
      }
    }
    init();
  }, []);

  if (load) {
    return <Loading />;
  }
  return (
    <>
      <Grid container justify="center">
        <TableContainer component={Paper}>
          <Table
            className={classes.table}
            size="small"
            aria-label="a dense table"
          >
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell align="right">PRODUCT</TableCell>
                <TableCell align="right">CATEGORY</TableCell>
                <TableCell align="right">COST&nbsp;(Points)</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {_DATA.currentData().map((row, i) => (
                <TableRow key={i}>
                  <TableCell component="th" scope="row">
                    {row.createDate}
                  </TableCell>
                  <TableCell align="right">{row.name}</TableCell>
                  <TableCell align="right">{row.category}</TableCell>
                  <TableCell align="right">{row.cost}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Grid container justify="center">
            <Pagination
              size="large"
              count={count}
              page={page}
              onChange={handleChangePage}
              color="secondary"
            />
          </Grid>
        </TableContainer>
      </Grid>
    </>
  );
};

export default ModalRedeem;
