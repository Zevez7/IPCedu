import React from "react";
import CourseUnit from "./CourseUnit";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles({
  divider: {
    border: "1px solid #3F51B5",
    marginTop: 20,
    marginBottom: 30,
  },
  courses: {
    marginTop: 20,
  },
});

export const Courses = ({ userCourse }) => {
  const classes = useStyles();


  const courseMap =
    userCourse &&
    Object.values(userCourse).map((item, index) => {
      return (
        <Box className={classes.courses} key={item.title + index}>
          <Typography variant="h5">{item.title}</Typography>
          {item.unit &&
            Object.values(item.unit).map((courseUnit, index) => {
              return (
                <CourseUnit
                  unit={courseUnit.unitNum}
                  info={courseUnit.info}
                  topic={item.topic}
                  progress={
                    (courseUnit.currentSlide / courseUnit.totalSlide) * 100
                  }
                  currentSlide={courseUnit.currentSlide}
                  key={courseUnit.info + index}
                />
              );
            })}
        </Box>
      );
    });
  return (
    <>
      <Box align="center">
        <Typography variant="h4">COURSES</Typography>
      </Box>
      <div className={classes.divider} />

      {courseMap}
    </>
  );
};

const mapStateToProps = (state) => ({ userCourse: state.userData.savedTopic });

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
