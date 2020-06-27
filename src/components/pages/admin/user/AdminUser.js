import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  MenuItem,
} from "@material-ui/core";
import { connect } from "react-redux";
import EditIcon from "@material-ui/icons/Edit";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";
import { fetchAllUser } from "../../../redux/action/adminAction";

let _ = require("lodash");
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  searchField: {
    marginBottom: 20,
    marginRight: 10,
  },
});

const AdminUser = ({ fetchAllUser, allUser }) => {
  const classes = useStyles();
  const [selectKey, setSelectKey] = useState("displayName");
  const [searchField, setSearchField] = useState("");

  const handleChange = (event) => {
    setSearchField(event.target.value);
  };

  const handleChangeSelect = (event) => {
    setSelectKey(event.target.value);
  };

  useEffect(() => {
    fetchAllUser();
  }, [fetchAllUser]);

  // filter exclusively by value
  // must be case sensitive
  const filterAllUser = (arrayData, value = null) => {
    return value
      ? _.filter(arrayData, (item) => {
          //****testing
          console.log("item", item);
          //****testing
          console.log("item.selectKey", item[selectKey]);
          return _.includes(item[selectKey].toLowerCase(), value.toLowerCase());
        })
      : arrayData;
  };

  // accepted objectKey = displayName, location, role, supervisor, position, email
  // accepted direction = desc, asc
  const sortedAllUser = (arrayData, objectKey, direction) => {
    return _.orderBy(arrayData, [objectKey], [direction]);
  };

  const stringDate = (timeStamp) => {
    return new Date(timeStamp).toLocaleDateString("en-US");
  };

  const allUserMap = Object.keys(allUser).length
    ? sortedAllUser(
        filterAllUser(allUser, searchField),
        "createdAt",
        "asc"
      ).map((item, index) => (
        <TableRow key={item.email}>
          <TableCell component="th" scope="row">
            {item.displayName}
          </TableCell>
          <TableCell align="right">{item.email}</TableCell>
          <TableCell align="right">{stringDate(item.createdAt)}</TableCell>
          <TableCell align="right">{item.position}</TableCell>
          <TableCell align="right">{item.role}</TableCell>
          <TableCell align="right">{item.location}</TableCell>
          <TableCell align="right">{item.coordinator}</TableCell>
          <TableCell align="right">
            <Link
              component={RouterLink}
              to={`/admineditaccount/${item.userId}`}
            >
              <EditIcon />
            </Link>
          </TableCell>
        </TableRow>
      ))
    : null;

  return (
    <div>
      <TextField
        id="standard-select-currency"
        select
        label="Select"
        value={selectKey}
        onChange={handleChangeSelect}
        helperText="Please select your key"
        className={classes.searchField}
      >
        <MenuItem value={"displayName"}>name</MenuItem>
        <MenuItem value={"email"}>email</MenuItem>
        <MenuItem value={"position"}>position</MenuItem>
        <MenuItem value={"role"}>role</MenuItem>
        <MenuItem value={"location"}>location</MenuItem>
        <MenuItem value={"coordinator"}>coordinator</MenuItem>
      </TextField>

      <TextField
        id="filled-required"
        label="Search"
        className={classes.searchField}
        value={searchField}
        onChange={handleChange}
      />
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Joined</TableCell>
              <TableCell align="right">Position</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Location</TableCell>
              <TableCell align="right">Coordinator</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{allUserMap}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    allUser: state.adminData.allUser,
  };
};

const mapDispatchToProps = {
  fetchAllUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminUser);
