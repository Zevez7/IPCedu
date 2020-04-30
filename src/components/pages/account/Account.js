import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PublicIcon from "@material-ui/icons/Public";
import {
  Box,
  Typography,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    maxWidth: 500,
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  icon: {
    fontSize: 100,
    marginBottom: 20,
  },
  topAccount: {},
  divider: {
    border: "1px solid #3F51B5",
    marginTop: 30,
    marginBottom: 30,
  },
  bottomAccount: {},
});

const Account = ({ user }) => {
  const classes = useStyles();

  return (
    <>
      <Container className={classes.root}>
        <Box className={classes.topAccount}>
          <PublicIcon color="primary" className={classes.icon} />
          <Typography variant="h5">{user.displayName}</Typography>
          <Typography variant="body2">{user.email}</Typography>
        </Box>

        <div className={classes.divider} />
        <Box className={classes.bottomAccount}>
          <List dense>
            <ListItem>
              <ListItemText primary="Status" secondary="Member" />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Facility"
                secondary="Tampa General Hospital"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="Infection Control Education Coordinator"
                secondary="Dr Ignaz Semmelweis"
              />
            </ListItem>
          </List>
        </Box>
      </Container>
    </>
  );
};

const mapStateToProps = (state) => ({ user: state.userData });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
