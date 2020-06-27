import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { editUserData } from "./../../redux/action/userAction";
import { fetchLocation, fetchCoord } from "./../../redux/action/publicAction";
import { useForm } from "react-hook-form";
import { TextField, Box, Typography, Button } from "@material-ui/core";
import Divider from "./../../others/Divider";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import AdminEditAccountSelector from "../admin/user/AdminEditAccountSelector";
import { useAccountSelector } from "../admin/user/useAccountSelector";

const useStyles = makeStyles({
  root: {
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
  },
  field: {
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
    width: 230,
    marginLeft: "auto",
    marginRight: "auto",
  },
});
const EditAccount = ({
  fetchLocation,
  fetchCoord,
  mapLocation,
  mapCoord,
  userData,
  editUserData,
}) => {
  const classes = useStyles();
  let history = useHistory();
  const { register, handleSubmit, errors, control } = useForm();
  const [locationSelectValues, handleChangeLocation] = useAccountSelector(
    userData.location
  );
  const [positionSelectValues, handleChangePosition] = useAccountSelector(
    userData.position
  );
  const [coordinatorSelectValues, handleChangeCoordinator] = useAccountSelector(
    userData.coordinator
  );

  const Position = [
    { value: "Healthcare Worker", label: "Healthcare Worker" },
    { value: "Essential Worker", label: "Essential Worker" },
    { value: "Normal Worker", label: "Normal Worker" },
  ];

  const onSubmit = (data) => {
    editUserData(data);
    history.push("/account");

    return console.log(data);
  };

  useEffect(() => {
    fetchLocation();
    fetchCoord();
  }, [fetchLocation, fetchCoord]);

  return (
    <div>
      <Box align="center">
        <Typography variant="h4">EDIT ACCOUNT</Typography>
      </Box>
      <Divider />
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Box className={classes.containerBox}>
          <Box pt={4}>
            <TextField
              className={classes.field}
              id="outlined-required"
              label="Email"
              defaultValue={userData.email}
              variant="outlined"
              disabled
            />
          </Box>

          <Box pt={4}>
            <TextField
              className={classes.field}
              required
              id="outlined-required"
              label="Name"
              defaultValue={userData.displayName}
              variant="outlined"
              name="displayName"
              inputRef={register({ required: true })}
            />
            <Box>{errors.displayName && "Name is required"}</Box>
          </Box>
          <Box p={1}>
            {mapLocation.length && (
              <AdminEditAccountSelector
                name="location"
                control={control}
                defaultValue={locationSelectValues}
                label="Location"
                valueSelect={locationSelectValues}
                handleChangeSelect={handleChangeLocation}
                dataMap={mapLocation}
              />
            )}
            {Position.length && (
              <AdminEditAccountSelector
                name="position"
                control={control}
                defaultValue={positionSelectValues}
                label="Position"
                valueSelect={positionSelectValues}
                handleChangeSelect={handleChangePosition}
                dataMap={Position}
              />
            )}
            {mapCoord.length && (
              <AdminEditAccountSelector
                name="coordinator"
                control={control}
                defaultValue={coordinatorSelectValues}
                label="Coordinator"
                valueSelect={coordinatorSelectValues}
                handleChangeSelect={handleChangeCoordinator}
                dataMap={mapCoord}
              />
            )}
          </Box>
        </Box>

        <Box className={classes.buttonBox}>
          <Button
            component={Link}
            color="secondary"
            variant="outlined"
            to="/account"
            className={classes.MR}
          >
            Cancel
          </Button>
          <Button color="primary" variant="outlined" type="submit">
            Save
          </Button>
        </Box>
      </form>
    </div>
  );
};
const mapStateToProps = (state) => {
  const location = state.publicData.location;
  const coord = state.publicData.coord;

  let mapLocation;
  if (Object.values(location)) {
    mapLocation = Object.values(location).map((item) => {
      return { value: item.name, label: item.name };
    });
  }

  let mapCoord;
  if (Object.values(coord)) {
    mapCoord = Object.values(coord).map((item) => {
      return { value: item, label: item };
    });
  }

  return {
    userData: state.userData,
    mapLocation,
    mapCoord,
  };
};

const mapDispatchToProps = { fetchLocation, editUserData, fetchCoord };

export default connect(mapStateToProps, mapDispatchToProps)(EditAccount);
