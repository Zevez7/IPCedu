import React from "react";
import CourseUnit from "./CourseUnit";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import covidData from "../../../Data/covid/covid.json";

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

export const Courses = ({ userData }) => {
  const classes = useStyles();

  let course = userData.userId ? userData.covid : covidData;

  const courseMap = course && (
    <Box className={classes.courses}>
      {course.unit &&
        Object.values(course.unit).map((courseUnit, index) => {
          return (
            <CourseUnit
              unit={courseUnit.unitNum}
              info={courseUnit.info}
              topic={course.topic}
              progress={(courseUnit.currentSlide / courseUnit.totalSlide) * 100}
              currentSlide={courseUnit.currentSlide}
              key={courseUnit.info + index}
            />
          );
        })}
    </Box>
  );

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

const mapStateToProps = (state) => ({
  userCourse: state.userData.savedTopic,
  userData: state.userData,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
