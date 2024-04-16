import { ReactElement } from "react";
import { styled } from "@mui/material/styles";
import { Button } from "../../ui";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/loginSlice";
import { TextField } from "@mui/material";
import { RootState } from "../../store/store";

interface FormValues {
  email: string;
  password: string;
}

const LoginPageWrapper = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
  gap: "1rem",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1rem",
});

const FormRow = styled("div")({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  width: "300px",
});

const FullWidthButton = styled(Button)({
  width: "100%",
});

export function LoginPage(): ReactElement {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const dispatch = useDispatch();
  // const isLoading = useSelector((state: RootState) => state.login.isLoading);
  const error = useSelector((state: RootState) => state.login.error);

  console.log(error, "error");

  const onSubmit = (data: FormValues) => {
    // @ts-ignore
    dispatch(login(data));
  };

  return (
    <LoginPageWrapper>
      <div>
        <p> email: olivier@mail.com </p>
        <p>password: bestPassw0rd</p>
      </div>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormRow>
          <TextField
            label="Username"
            type="text"
            error={errors.email != null}
            helperText={errors.email && "This field is required"}
            {...register("email", { required: true })}
          />
          <TextField
            label="Password"
            type="password"
            error={errors.password != null}
            helperText={errors.password && "This field is required"}
            {...register("password", { required: true })}
          />
        </FormRow>
        <FullWidthButton type="submit" title="Login">
          Login
        </FullWidthButton>
        {error && <p>{error}</p>}
      </Form>
    </LoginPageWrapper>
  );
}
