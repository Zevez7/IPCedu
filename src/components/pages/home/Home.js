import React from "react";
import CardUnit from "./CardUnit";
import { Container } from "@material-ui/core";
import topicData from "../../../Data/topicData.json";

const Home = () => {
  const topicMap = topicData.map((item, index) => {
    return (
      <CardUnit
        title={item.title}
        info={item.info}
        key={index}
        topic={item.topic}
      />
    );
  });

  return <Container>{topicMap}</Container>;
};

export default Home;
