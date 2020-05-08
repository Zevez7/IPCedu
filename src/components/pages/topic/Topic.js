import React from "react";

import { Typography, Box } from "@material-ui/core";
import TopicUnit from "./TopicUnit";

import { connect } from "react-redux";
import { slideCount } from "../../redux/action/index";

const Topic = ({ match, topicListData, slideCount }) => {
  //****testing
  console.log("topicListData", topicListData);
  //****testing

  // react router paramater sent from home page to topic page
  const { topic } = match.params;

  //****testing
  console.log("topic", topic);
  // filter out topicData with the match params Topic param
  // [0] grab the first object from the array
  const selectedTopic = topicListData.filter((item) => {
    return item.topic === topic;
  })[0];

  // grabbing all the different units and unit info for the selected topic
  const selectedUnit = selectedTopic.unit;

  slideCount(1);

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
    <>
      <Box align="center">
        <Typography variant="h4">{selectedTopic.title}</Typography>
      </Box>
      {TopicMap}
    </>
  );
};

const mapStateToProps = (state) => ({ topicListData: state.topicListData });

const mapDispatchToProps = { slideCount };

export default connect(mapStateToProps, mapDispatchToProps)(Topic);
