import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import TitleHeader from "../../../titleHeader/TitleHeader";
import { connect } from "react-redux";

const useStyles = makeStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  field: {
    width: "100%",
    textAlign: "left",
  },
  menuItem: {
    textAlign: "left",
  },
  MR: {
    marginRight: 40,
  },
  buttonBox: {
    marginTop: 100,
  },
  containerBox: {
    maxWidth: 360,
    marginTop: 20,
    marginLeft: "auto",
    marginRight: "auto",
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

const CovidListEdit = () => {
  const classes = useStyles();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      covidList: [{ unit: 1, info: "OVERVIEW" }],
    },
  });

  const onSubmit = (data) => {

    return console.log("submitted data", data);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "covidList",
  });

  return (
    <div>
      <TitleHeader title="ADD NEW COVID LIST ITEM" />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box component={Paper} className={classes.containerBox}>
          <Box mt={2}>
            {fields.map((item, index) => {
              return (
                <Box key={index} px={2} py={1} mt={2}>
                  <Box>
                    <TextField
                      size="small"
                      className={classes.field}
                      required
                      label="Unit"
                      name={`covidList[${index}].unit`}
                      defaultValue={`${item.unit}`} // make sure to set up defaultValue
                      inputRef={register({ required: true })}
                    />
                  </Box>
                  <Box pt={4}>
                    <TextField
                      size="small"
                      className={classes.field}
                      required
                      label="Info"
                      name={`covidList[${index}].info`}
                      defaultValue={`${item.info}`} // make sure to set up defaultValue
                      inputRef={register({ required: true })}
                    />
                  </Box>
                </Box>
              );
            })}
          </Box>

          <Box mt={3}>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              className={classes.MR}
              onClick={() => {
                append({ unit: "", info: "" });
              }}
            >
              ADD ITEM
            </Button>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              disabled={fields.length <= 0 ? true : false}
              onClick={() => {
                remove(fields.length - 1);
              }}
            >
              DELETE ITEM
            </Button>
          </Box>
        </Box>

        <Box className={classes.buttonBox}>
          <Button
            component={Link}
            color="secondary"
            variant="outlined"
            to="/admin/content"
            className={classes.MR}
          >
            Cancel
          </Button>
          <Button color="primary" variant="outlined" type="submit">
            Submit
          </Button>
        </Box>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(CovidListEdit);
