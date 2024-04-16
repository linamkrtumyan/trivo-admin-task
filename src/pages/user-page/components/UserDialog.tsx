import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import { User, createUser, editUser } from "../../../features/user/userSlice";
import { useAppDispatch } from "../../../store/store";

type UserDialogProps = {
  type: "edit" | "create";
  children: React.ReactNode;
  user?: User;
};

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem", 
  width: "400px",
});

interface FormValues {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
}

export default function UserDialog({
  type,
  children,
  user,
}:
UserDialogProps) {
  const [open, setOpen] = React.useState(false);
  const isCreate = type === "create";

  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmitHandler = (formData: FormValues, id: string) => {
    if (isCreate) {
      dispatch(createUser(formData));
    } else if (id) {
      dispatch(editUser({ editedUser: formData, id }));
    }
    handleClose();
  };

  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>{children}</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {isCreate ? "Create user" : "Edit user"}
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <Form
            onSubmit={handleSubmit((formData) =>
              onSubmitHandler(formData, user?.id || "")
            )}
          >
            <TextField
              label="Name"
              type="text"
              error={errors.name != null}
              helperText={errors.name && "This field is required"}
              {...register("name", { required: true })}
              defaultValue={user?.name || ""}
              fullWidth
            />

            <TextField
              label="Username"
              type="text"
              error={errors.username != null}
              helperText={errors.username && "This field is required"}
              {...register("username", { required: true })}
              defaultValue={user?.username || ""}
              fullWidth
            />

            <TextField
              label="Email"
              type="text"
              error={errors.email != null}
              helperText={errors.email && "This field is required"}
              {...register("email", { required: true })}
              defaultValue={user?.email || ""}
              fullWidth
            />

            <TextField
              label="Phone"
              type="text"
              error={errors.phone != null}
              helperText={errors.phone && "This field is required"}
              {...register("phone", { required: true })}
              defaultValue={user?.phone || ""}
              fullWidth
            />

            <Button
              color="primary"
              type="submit"
              variant="contained"
              title={isCreate ? "Create" : "Save changes"}
            >
              {isCreate ? "Create" : "Save changes"}
            </Button>
          </Form>
        </DialogContent>
      </BootstrapDialog>
    </React.Fragment>
  );
}
