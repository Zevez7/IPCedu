import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import LinearProgress from "@material-ui/core/LinearProgress";
import { slideCount } from "../../redux/action/slideAction";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    backgroundColor: "whitesmoke",
    marginTop: 20,
    marginBottom: 10,
  },
  progressBar: {
    marginTop: 10,
  },
});

const BorderLinearProgress = withStyles({
  root: {
    height: 10,
  },
  bar: {
    borderRadius: 20,
  },
})(LinearProgress);

function CourseUnit({ unit, info, topic, progress, slideCount, currentSlide }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea
        component={RouterLink}
        to={`/slide/${topic}/${unit}`}
        onClick={() => slideCount(currentSlide)}
      >
        <CardContent>
          <Typography variant="body1" color="primary">
            {info && info}
          </Typography>
          <Typography variant="body2">Unit {unit && unit}</Typography>

          {!Number.isNaN(progress) ? (
            <BorderLinearProgress
              className={classes.progressBar}
              variant="determinate"
              color="primary"
              value={progress}
            />
          ) : null}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = { slideCount };

export default connect(mapStateToProps, mapDispatchToProps)(CourseUnit);
