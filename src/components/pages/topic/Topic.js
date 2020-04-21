import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import { Container, Typography, Box } from "@material-ui/core";
import TopicUnit from "./TopicUnit";

import { connect } from "react-redux";
import topicDataImport from "../../../Data/topicData.json";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 30,
  },
  fixedWidth: {
    maxWidth: 600,
  },
});

const Topic = ({ match, data }) => {
  const classes = useStyles();

  // react router paramater sent from home page to topic page
  const { topic } = match.params;

  // filter out topicData with the match params Topic param
  // [0] grab the first object from the array
  const selectedTopic = topicDataImport.filter((item) => {
    return item.topic === topic;
  })[0];

  // grabbing all the different units and unit info for the selected topic
  const selectedUnit = selectedTopic.unit;

  const TopicMap =
    selectedUnit &&
    selectedUnit.map((item, index) => {
      return (
        <TopicUnit
          unit={item.unitNum}
          info={item.info}
          key={index}
          topic={selectedTopic.topic}
        />
      );
    });

  return (
    <div>
      <Container className={classes.fixedWidth}>
        <Box align="center">
          <Typography variant="h4">{selectedTopic.title}</Typography>
        </Box>
        {TopicMap}
      </Container>
    </div>
  );
};

const mapStateToProps = (state) => ({ data: state.data });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
