import React, { useEffect } from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from "@material-ui/icons/Public";
import Divider from "./../../others/Divider";
import { Link } from "react-router-dom";

import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@material-ui/core";
import { deleteUser } from "./../../redux/action/userAction";
import { fetchLocation } from "./../../redux/action/publicAction";
import AlertDialog from "../../others/AlertDialog";

const useStyles = makeStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  icon: {
    fontSize: 100,
    marginBottom: 20,
  },
  editButton: {
    marginRight: 20,
    float: "right",
  },
  adminPanel: {
    marginTop: 20,
  },
});

const Account = ({ user, fetchLocation, deleteUser }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchLocation();
  }, [fetchLocation]);
  return (
    <>
      <Box className={classes.root}>
        <Box>
          <PublicIcon color="primary" className={classes.icon} />
          <Typography variant="h5">{user.displayName}</Typography>
          <Typography variant="body2">{user.email}</Typography>
          {user.role === "admin" && (
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/admin"
              className={classes.adminPanel}
            >
              Admin Panel
            </Button>
          )}
          <br />
          {(user.role === "admin" || user.role === "coordinator") && (
            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/coordinator"
              className={classes.adminPanel}
            >
              Coordinator Panel
            </Button>
          )}
        </Box>
        <Divider />
        <Box>
          <List>
            <ListItem>
              <ListItemText primary={user.location} secondary="LOCATION" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary={user.coordinator}
                secondary="COORDINATOR"
              />
            </ListItem>
            <ListItem>
              <ListItemText primary={user.position} secondary="POSITION" />
            </ListItem>
            <ListItem>
              <ListItemText primary={user.role} secondary="ACCOUNT TYPE" />
            </ListItem>
          </List>
        </Box>

        <Box>
          <Button
            color="primary"
            variant="outlined"
            component={Link}
            to="/accountEdit"
            className={classes.editButton}
          >
            Edit
          </Button>
          <AlertDialog
            alertButtonText="Delete Account"
            alertDialogTitle="Delete Account Confirmation"
            alertDialogDescription="Are you sure you want to delete your account?
            You will need to re-login again to delete account"
            handleCancelButtonText="Cancel"
            handleConfirmButtonText="Delete Account"
            className={classes.editButton}
            confirmColor="secondary"
            confirmActionFunction={deleteUser}
          />
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({ user: state.userData });

const mapDispatchToProps = { fetchLocation, deleteUser };

export default connect(mapStateToProps, mapDispatchToProps)(Account);
