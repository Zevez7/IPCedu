import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    marginTop: 20,
    backgroundColor: "whitesmoke",
  },
});

function TopicUnit({ unit, info, topic }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={RouterLink} to={`/slide/${topic}/${unit}`}>
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            Unit {unit && unit}
          </Typography>

          <Typography variant="body1" component="p">
            {info && info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default TopicUnit;
