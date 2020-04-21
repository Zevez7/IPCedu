import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginTop: 30,
  },
});

function CardUnit(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea component={RouterLink} to="/slide">
        <CardContent>
          <Typography variant="h5" color="primary" gutterBottom>
            {props.title}
          </Typography>

          <Typography variant="body1" component="p">
            {props.info}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default CardUnit;
