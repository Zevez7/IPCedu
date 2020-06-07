import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core/";

export default function AlertDialog({
  alertButtonText,
  alertDialogTitle,
  alertDialogDescription,
  handleCancelButtonText,
  handleConfirmButtonText,
  className,
  cancelColor = "primary",
  confirmColor = "primary",
  confirmActionFunction,
}) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    confirmActionFunction();
  };

  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
        className={className}
      >
        {alertButtonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{alertDialogTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {alertDialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color={cancelColor}>
            {handleCancelButtonText}
          </Button>
          <Button onClick={handleConfirm} color={confirmColor} autoFocus>
            {handleConfirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
