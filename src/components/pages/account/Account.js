import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from "@material-ui/icons/Public";
import Divider from "./../../others/Divider";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

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
  topAccount: {},

  bottomAccount: {},
});

const Account = ({ user }) => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.root}>
        <Box className={classes.topAccount}>
          <PublicIcon color="primary" className={classes.icon} />
          <Typography variant="h5">{user.displayName}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>
        <Divider />
        <Box className={classes.bottomAccount}>
          <List dense>
            <ListItem>
              <ListItemText primary="Status" secondary="Active" />
            </ListItem>
            <ListItem>
              <ListItemText primary="Facility" secondary={user.location} />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Infection Control Education Coordinator"
                secondary={user.supervisor}
              />
            </ListItem>
          </List>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({ user: state.userData });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
