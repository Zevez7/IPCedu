import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { editUserData } from "./../../redux/action/userAction";
import {
  fetchLocation,
  fetchRole,
  fetchCoord,
} from "./../../redux/action/index";
import { useForm } from "react-hook-form";
import { TextField, Box, Typography, Button, Paper } from "@material-ui/core";
import Divider from "./../../others/Divider";
import { Link } from "react-router-dom";

import AdminInfoTable from "./AdminInfoTable";
import AdminEditAccountSelector from "./AdminEditAccountSelector";
import { useAccountSelector } from "./useAccountSelector";

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
const AdminEditAccount = ({
  fetchLocation,
  fetchRole,
  fetchCoord,
  mapLocation,
  mapRole,
  mapCoord,
  editUserData,
  filteredUserData,
  UserData,
}) => {
  const classes = useStyles();
  const { register, handleSubmit, errors, control } = useForm();

  const [roleSelectValues, handleChangeRole] = useAccountSelector(
    UserData.role
  );
  const [locationSelectValues, handleChangeLocation] = useAccountSelector(
    UserData.location
  );
  const [positionSelectValues, handleChangePosition] = useAccountSelector(
    UserData.position
  );
  const [coordinatorSelectValues, handleChangeCoordinator] = useAccountSelector(
    UserData.coordinator
  );

  console.log("filteredUserData", filteredUserData, "UserData", UserData);
  console.log("mapLocation", mapLocation);
  console.log("mapRole", mapRole);
  console.log("mapCoord", mapCoord);

  const onSubmit = (data) => {
    editUserData(data, UserData.userId);
    return console.log("submitted data", data);
  };

  const Position = [
    { value: "Healthcare Worker", label: "Healthcare Worker" },
    { value: "Essential Worker", label: "Essential Worker" },
    { value: "Normal Worker", label: "Normal Worker" },
    { value: "N/A", label: "N/A" },
  ];

  useEffect(() => {
    console.log("useEffect called");
    fetchLocation();
    fetchRole();
    fetchCoord();
  }, [fetchLocation, fetchRole, fetchCoord]);

  return (
    <div>
      <Box align="center">
        <Typography variant="h4">ADMIN EDIT ACCOUNT</Typography>
      </Box>
      <Divider />
      <AdminInfoTable filteredUserData={filteredUserData} />
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
              id="outlined-required"
              label="Email"
              defaultValue={UserData.email}
              disabled
            />
          </Box>

          <Box pt={4}>
            <TextField
              size="small"
              className={classes.field}
              required
              id="outlined-required"
              label="Name"
              defaultValue={UserData.displayName}
              name="displayName"
              inputRef={register({ required: true })}
            />
            <Box>{errors.displayName && "Name is required"}</Box>
          </Box>

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

          {mapRole.length && (
            <AdminEditAccountSelector
              name="role"
              control={control}
              defaultValue={roleSelectValues}
              label="Role"
              valueSelect={roleSelectValues}
              handleChangeSelect={handleChangeRole}
              dataMap={mapRole}
            />
          )}
        </Box>

        <Box className={classes.buttonBox}>
          <Button
            component={Link}
            color="secondary"
            variant="outlined"
            to="/admin"
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
const mapStateToProps = (state, ownProps) => {
  const ownPropUserId = ownProps.match.params.userId;
  const allUser = state.allUserData;
  const location = state.public.location;
  const role = state.public.role;
  const coord = state.public.coord;
  // get all the user data and filter out that user data
  // that matches the userId paramater from the link

  const UserData = allUser.filter((item) => {
    return item.userId === ownPropUserId;
  })[0];

  const filteredUserData = Object.values(UserData.covid.unit);

  //create an object array out of location data
  let mapLocation;
  if (Object.values(location)) {
    mapLocation = Object.values(location).map((item) => {
      return { value: item.name, label: item.name };
    });
  }

  let mapRole;
  if (Object.values(role)) {
    mapRole = Object.values(role).map((item) => {
      return { value: item, label: item };
    });
  }

  let mapCoord;
  if (Object.values(coord)) {
    mapCoord = Object.values(coord).map((item) => {
      return { value: item, label: item };
    });
  }
  //****testing
  console.log("mapCoord", mapCoord);

  return {
    filteredUserData,
    mapLocation,
    UserData,
    mapRole,
    mapCoord,
  };
};

const mapDispatchToProps = {
  fetchLocation,
  editUserData,
  fetchRole,
  fetchCoord,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminEditAccount);
