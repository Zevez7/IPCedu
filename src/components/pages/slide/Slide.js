import React, { useState, useEffect } from "react";
import { Pagination, Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Divider, Button } from "@material-ui/core";
import { connect } from "react-redux";
import { fetchTopicUnit } from "./../../redux/action/publicAction";
import {
  slideCount,
  updateCurrentSlide,
} from "./../../redux/action/slideAction";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    position: "fixed",
    bottom: 55,
    left: -3,
    display: "flex",
    justifyContent: "center",
    height: 30,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 30,
  },
  marginBottom: {
    marginBottom: 150,
  },
  saveProgress: { marginLeft: "auto" },
  buttonBox: {
    width: "100%",
    display: "flex",
  },
}));

const Slide = ({
  fetchTopicUnit,
  match,
  topicUnit,
  slidePage,
  slideCount,
  updateCurrentSlide,
  user,
}) => {
  const classes = useStyles();

  // passing unit and topic from topic unit link
  const { topic, unit } = match.params;
  let slide;
  let content;
  let list;
  let DataListArray;
  let mapList;
  let contentList;

  const [page, setPage] = useState(slidePage || 1);

  const [isLoading, setisLoading] = useState(true);

  //****testing
  console.log("isLoading", isLoading);

  const LoadingPlaceHolder = (
    <div className={classes.slideContainer}>
      <Box pt={3} />
      <Skeleton animation="wave" height={50} />
      <Divider />
      <Skeleton animation="wave" />
      <Box pt={3} />
      <Skeleton variant="rect" height={200} />
    </div>
  );

  // useEffect to fetch from firestoreDB,
  // passing along the topic and unit to right database

  useEffect(() => {
    fetchTopicUnit(topic, unit).then(() => {
      //****testing
      console.log("cat");
      setisLoading(false);
    });
  }, [topic, unit, fetchTopicUnit]);

  // once topicUnit is populated, set the slide, content and list
  if (!isLoading) {
    console.log("dataloaded");
    //****testing
    console.log("page", page);
    slide = topicUnit.slide;
    // find the content info
    content = slide[page - 1].content;
    // find the slide
    list = slide[page - 1].list;

    // split the slide string into an array of element with map
    if (list !== undefined) {
      DataListArray = list.split(", ");
      mapList = DataListArray.map((item, index) => {
        return <li key={index}>{item}</li>;
      });
    }

    // add content and maplist into a single element
    contentList = (
      <>
        {content} <ul>{mapList}</ul>
      </>
    );
  }

  // how many slide in each unit
  let slideCountPage = slide && slide.length;

  // whenever page button clicked, a new page is set
  const handleChange = (event, value) => {
    setPage(value);
    slideCount(value);
  };

  // this is the content that's display based on the setPage value
  // const currentSlideContent = slide && slide[page - 1];

  const handleSaveProgress = (topic, unit, page) => {
    //****testing
    console.log("topic, unit, page, handleSave", topic, unit, page);
    updateCurrentSlide(topic, unit, page);
  };

  //****testing
  console.log("user", user);
  return (
    <>
      {!isLoading ? (
        <>
          <Box py={4}>
            {user.userId && (
              <Box className={classes.buttonBox}>
                <Button
                  className={classes.saveProgress}
                  size="small"
                  color="primary"
                  onClick={() => handleSaveProgress(topic, unit, page)}
                >
                  Save Progress
                </Button>
              </Box>
            )}
            <Typography variant="h5">{topicUnit.info}</Typography>
            <Divider />
            <Typography variant="body1">
              Unit {unit} - Slide {page}
            </Typography>
          </Box>
          <Box className={classes.marginBottom}>{contentList}</Box>
        </>
      ) : (
        LoadingPlaceHolder
      )}
      <div className={classes.root}>
        <Pagination
          count={slideCountPage}
          page={page}
          onChange={handleChange}
          variant="outlined"
          color="primary"
          siblingCount={1}
          boundaryCount={1}
          className={classes.pagination}
          shape="rounded"
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.userData,
  topicUnit: state.publicData.topicUnit,
  slidePage: state.slideData.slide_counter,
});

const mapDispatchToProps = {
  fetchTopicUnit,
  slideCount,
  updateCurrentSlide,
};

export default connect(mapStateToProps, mapDispatchToProps)(Slide);
