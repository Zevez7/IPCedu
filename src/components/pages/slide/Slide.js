import React, { useState, useEffect } from "react";
import { Pagination, Skeleton } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Box, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { fireStoreTopicUnitFetch } from "./../../redux/action";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    marginLeft: "auto",
    marginRight: "auto",
    position: "fixed",
    bottom: 55,
    left: -3,
    display: "flex",
    justifyContent: "center",
    height: 30,
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 30,
  },
  marginBottom: {
    marginBottom: 150,
  },
}));

const Slide = ({ fireStoreTopicUnitFetch, match, fsData }) => {
  const classes = useStyles();

  // passing unit and topic from topic unit link
  const { topic, unit } = match.params;
  let slide;
  let content;
  let list;
  let DataListArray;
  let mapList;
  let contentList;
  const [page, setPage] = useState(1);

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
    fireStoreTopicUnitFetch(topic, unit);

    console.log("useEffect call");
  }, [topic, unit, fireStoreTopicUnitFetch]);

  //****testing
  console.log("fsData", fsData);

  // once fsData is populated, set the slide, content and list
  if (Object.keys(fsData).length > 0) {
    console.log("dataloaded");
    slide = fsData.slide;
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
  let slideCount = slide && slide.length;

  // whenever page button clicked, a new page is set
  const handleChange = (event, value) => {
    setPage(value);
  };

  // this is the content that's display based on the setPage value
  // const currentSlideContent = slide && slide[page - 1];

  return (
    <>
      {Object.keys(fsData).length > 0 ? (
        <>
          <Box py={4}>
            <Typography variant="h5"> {fsData.title}</Typography>
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
          count={slideCount}
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
  data: state.data,
  fsData: state.fireData,
});

const mapDispatchToProps = { fireStoreTopicUnitFetch };

export default connect(mapStateToProps, mapDispatchToProps)(Slide);
