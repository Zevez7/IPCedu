import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

const useStyles = makeStyles({
  tableContainer: {
    marginTop: 10,
    marginLeft: "auto",
    marginRight: "auto",
  }
});

export default function AdminInfoTable({ filteredUserData }) {
  const classes = useStyles();

  return (
    <>
      <TableContainer className={classes.tableContainer}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell align="right">current/total</TableCell>
              <TableCell align="right">%</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUserData.map((item) => (
              <TableRow key={item.info}>
                <TableCell component="th" scope="row">
                  {item.info}
                </TableCell>
                <TableCell align="right">{`${item.currentSlide} / ${item.totalSlide}`}</TableCell>
                <TableCell align="right">
                  {Math.floor((item.currentSlide / item.totalSlide) * 100)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
