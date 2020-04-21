import React, { useState, useEffect } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Divider } from "@material-ui/core";
import { connect } from "react-redux";
import { fireStoreTopicUnitFetch } from "./../../redux/action";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
    position: "fixed",
    bottom: 100,
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
}));

const Slide = ({ fireStoreTopicUnitFetch, match, fsData }) => {
  const classes = useStyles();

  // passing unit and topic from topic unit link
  const { topic, unit } = match.params;

  // useEffect to fetch from firestoreDB,
  // passing along the topic and unit to right database
  useEffect(() => {
    fireStoreTopicUnitFetch(topic, unit);
    console.log("useEffect call");
  }, [topic, unit, fireStoreTopicUnitFetch]);

  // slide for the unit
  let slide = fsData.slide;

  // how many slide in each unit
  let slideCount = slide && slide.length;

  // whenever page button clicked, a new page is set
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  // this is the content that's display based on the setPage value
  const currentSlideContent = slide && slide[page - 1];

  return (
    <>
      <Container>
        <Box py={5}>
          <Typography variant="h5"> {fsData.title}</Typography>
          <Divider />
          <Typography variant="body1">
            Unit {unit} - Slide {page}
          </Typography>
        </Box>
        <Box py={2}>
          {currentSlideContent && (
            <Typography>
              {currentSlideContent} {fsData.title} - Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Dolorem error minus ipsam explicabo
              maxime, incidunt soluta? Fuga possimus quasi voluptas sapiente?
              Perferendis, quo expedita perspiciatis beatae aperiam adipisci
              consectetur molestiae!
            </Typography>
          )}
        </Box>
      </Container>
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
