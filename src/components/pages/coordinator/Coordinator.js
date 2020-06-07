import React, { useEffect } from "react";
import Divider from "../../others/Divider";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Typography,
} from "@material-ui/core/";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import CoordInfoTable from "./CoordInfoTable";
import { connect } from "react-redux";
import { fetchCoordinatorUser } from "../../redux/action/coordinatorAction";
import { stringDate } from "../../others/Time";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    marginLeft: "auto",
    marginRight: "auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "50%",
    flexShrink: 1,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  expansionPanelDetail: {
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  expansionPanel: {
    backgroundColor: "whitesmoke",
  },
}));

const Coordinator = ({
  fetchCoordinatorUser,
  userData,
  coordinatorUserData,
}) => {
  const classes = useStyles();

  //****testing
  console.log("coordinatorUserData", coordinatorUserData);

  useEffect(() => {
    fetchCoordinatorUser(userData.displayName);
  }, [fetchCoordinatorUser, userData]);

  //****testing

  console.log("coordinatorUserData[0]", coordinatorUserData[0]);

  // find the completed unit with 100% vs the total unit
  const getCompletedUserData = (item) => {
    const objectValue = Object.values(item.covid.unit);
    const totalUnit = objectValue.length;

    let completedUnit = 0;

    objectValue.forEach((item) => {
      if (item.currentSlide === item.totalSlide) {
        return completedUnit++;
      }
    });

    return `${completedUnit}/${totalUnit}`;
  };

  return (
    <div>
      <Box align="center">
        <Typography variant="h4">COORDINATOR PANEL</Typography>
      </Box>
      <Divider />
      <Box pb={3}>
        <Typography variant="h6">
          Coordinator Name: {userData.displayName}
        </Typography>
        <Typography variant="body1">
          Coordinator Location: {userData.location}
        </Typography>
      </Box>
      <div className={classes.root}>
        {coordinatorUserData.length
          ? coordinatorUserData.map((item, index) => (
              <ExpansionPanel
                TransitionProps={{ unmountOnExit: true }}
                className={classes.expansionPanel}
                key={index}
              >
                <ExpansionPanelSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                >
                  <Typography className={classes.heading}>
                    {item.displayName}
                  </Typography>
                  <Typography className={classes.heading}>
                    Completed {getCompletedUserData(item)}
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails className={classes.expansionPanelDetail}>
                  <Typography variant="body2">{item.email}</Typography>
                  <Typography variant="body2">
                    {stringDate(item.createdAt)}
                  </Typography>
                  <Typography variant="body2">{item.location}</Typography>
                  <Typography variant="body2">{item.position}</Typography>
                  <CoordInfoTable
                    filteredUserData={Object.values(item.covid.unit)}
                  />
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))
          : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userData: state.userData,
    coordinatorUserData: state.coordinatorUserData,
  };
};

const mapDispatchToProps = { fetchCoordinatorUser };

export default connect(mapStateToProps, mapDispatchToProps)(Coordinator);
