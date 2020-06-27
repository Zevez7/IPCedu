import React, { useEffect } from "react";
import CourseUnit from "./CourseUnit";
import { makeStyles } from "@material-ui/core/styles";

import { Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import Divider from "./../../others/Divider";
import { fetchCovidList } from "../../redux/action/publicAction";
const useStyles = makeStyles({
  courses: {
    marginTop: 20,
  },
});

export const Courses = ({ userData, fetchCovidList, covidListData }) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCovidList();
  }, [fetchCovidList]);

  let course = userData.userId ? userData.covid : covidListData;
  const courseMap = course && (
    <Box className={classes.courses}>
      <Typography variant="h5">{course.title}</Typography>

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
      <Divider />
      {courseMap}
    </>
  );
};

const mapStateToProps = (state) => ({
  userCourse: state.userData.savedTopic,
  userData: state.userData,
  covidListData: state.publicData.covidList,
});

const mapDispatchToProps = { fetchCovidList };

export default connect(mapStateToProps, mapDispatchToProps)(Courses);
