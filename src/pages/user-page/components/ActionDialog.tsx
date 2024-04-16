import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { useAppDispatch } from "../../../store/store";
import { deleteUser } from "../../../features/user/userSlice";

type ActionDialogProps = {
  children: React.ReactNode;
  userId: string;
};

export default function ActionDialog({ children, userId }: ActionDialogProps) {
  const [open, setOpen] = React.useState(false);

  const dispatch = useAppDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = () => {
    if (userId) {
      dispatch(deleteUser(userId));
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>{children}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this user?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onSubmitHandler} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
