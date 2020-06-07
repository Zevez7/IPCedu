import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, MenuItem, Box } from "@material-ui/core";
import { Controller } from "react-hook-form";

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
});

const AdminEditAccountSelector = ({
  name,
  defaultValue,
  label,
  valueSelect,
  handleChangeSelect,
  dataMap,
  control,
}) => {
  const classes = useStyles();

  return (
    <Box pt={4}>
      <Controller
        name={`${name}`}
        control={control}
        defaultValue={defaultValue}
        rules={{ required: true }}
        as={
          <TextField
            size="small"
            className={classes.field}
            id="outlined-select-currency"
            select
            label={`${label}`}
            value={valueSelect}
            onChange={handleChangeSelect}
          >
            {dataMap.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        }
      />
    </Box>
  );
};

export default AdminEditAccountSelector;
