import React, { useEffect } from "react";
import CardUnit from "./CardUnit";
import { connect } from "react-redux";
import { fireStoreTopicList } from "../../redux/action";

const Home = ({ fireStoreTopicList, topicListData }) => {
  useEffect(() => {
    fireStoreTopicList();
    console.log("use Effect");
  }, [fireStoreTopicList]);

  console.log("home render");

  const topicMap = topicListData.map((item, index) => {
    return (
      <CardUnit
        title={item.title}
        info={item.info}
        key={index}
        topic={item.topic}
      />
    );
  });

  return topicMap;
};

const mapStateToProps = (state) => ({ topicListData: state.topicListData });

const mapDispatchToProps = { fireStoreTopicList };

export default connect(mapStateToProps, mapDispatchToProps)(Home);
