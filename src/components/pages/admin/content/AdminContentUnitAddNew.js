import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Paper, TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { stringDate } from "../../../others/Time";
import TitleHeader from "../../../titleHeader/TitleHeader";
import { connect } from "react-redux";
import { addNewUnit } from "../../../redux/action/adminAction";

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

const AdminContentUnitAddNew = ({ addNewUnit }) => {
  const classes = useStyles();

  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      slide: [{ content: "", list: "" }],
    },
  });

  const onSubmit = (data) => {
    if (data.list === "true") {
      data.list = true;
    } else {
      data.list = false;
    }

    data.unit = parseInt(data.unit);

    addNewUnit("covid", data.info, data);

    return console.log("submitted data", data);
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "slide",
  });

  return (
    <div>
      <TitleHeader title="Add New Unit" />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box component={Paper} className={classes.containerBox}>
          <Box pt={4}>
            <TextField
              size="small"
              className={classes.field}
              required
              disabled
              label="title"
              defaultValue={"COVID-19 Infection Control"}
              name="title"
              inputRef={register({ required: true })}
            />
          </Box>

          <Box pt={4}>
            <TextField
              size="small"
              className={classes.field}
              required
              disabled
              label="topic"
              defaultValue={"covid"}
              name="topic"
              inputRef={register({ required: true })}
            />
          </Box>

          <Box pt={4}>
            <TextField
              size="small"
              className={classes.field}
              required
              disabled
              label="list"
              defaultValue={true}
              name="list"
              inputRef={register({ required: true })}
            />
          </Box>
          <Box pt={4}>
            <TextField
              size="small"
              className={classes.field}
              required
              disabled
              label="date"
              defaultValue={stringDate(new Date())}
              name="date"
              inputRef={register({ required: true })}
            />
          </Box>

          <Box pt={4}>
            <TextField
              size="small"
              className={classes.field}
              required
              label="info"
              defaultValue={""}
              name="info"
              inputRef={register({ required: true })}
            />
          </Box>
          <Box pt={4}>
            <TextField
              size="small"
              className={classes.field}
              required
              label="unit"
              defaultValue={""}
              name="unit"
              inputRef={register({ required: true })}
            />
          </Box>
        </Box>
        <Box component={Paper} className={classes.containerBox}>
          <Box mt={2}>
            {fields.map((item, index) => {
              return (
                <Box key={index} px={2} py={1} mt={2}>
                  <Box>
                    Slide #{index + 1}
                    <TextField
                      size="small"
                      className={classes.field}
                      required
                      label="content"
                      name={`slide[${index}].content`}
                      defaultValue={`${item.content}`} // make sure to set up defaultValue
                      inputRef={register({ required: true })}
                    />
                  </Box>
                  <Box pt={4}>
                    <TextField
                      size="small"
                      className={classes.field}
                      label="list"
                      name={`slide[${index}].list`}
                      defaultValue={`${item.list}`} // make sure to set up defaultValue
                      inputRef={register()}
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
                append({ content: "", list: "" });
              }}
            >
              ADD SLIDE
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
              DELETE SLIDE
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

const mapDispatchToProps = {
  addNewUnit,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdminContentUnitAddNew);
