import {React} from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {useNavigate} from "react-router-dom"

let schema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(/^[A-Z][a-z]+ [A-Z][a-z]+$/, "Enter your fullname"),
    email: Yup.string()
    .email()
    .required("Email is Required")
    .matches(/^[a-z0-9]+@[a-z]{3,6}\.[a-z]{2,4}$/, "Enter a valid Email"),
  age: Yup.number()
    .integer()
    .positive()
    .required("Enter Your Age")
    .min(18, "Enter Age between 18 to 30")
    .max(30, "Enter Age between 18 to 30"),
  password: Yup.string().required("Password is Required"),
  cPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("password"), null], "Password Must Watch")
});

const SignUp = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
    display: "grid",
    gap: "15px",
  };
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

 let navigate= useNavigate()

  let handleData = (data) => {
    console.log(data)
  navigate("/")
  };

  return (
    <Paper
      elevation={20}
      style={paperStyle}
      component="form"
      onSubmit={handleSubmit(handleData)}
    >
      <Typography variant="h6" align="center">
        {" "}
        Create Account{" "}
      </Typography>
      <TextField
        label="name"
        {...register("name", { required: "name is required" })}
        error={!!errors.name}
        helperText={errors.name?.message}
      />
      <TextField label="email" {...register("email")} error={!!errors.email}
        helperText={errors.email?.message}/>
      <TextField label="age" {...register("age")} error={!!errors.age}
        helperText={errors.age?.message} />
      <TextField label="password" {...register("password")}error={!!errors.password}
        helperText={errors.password?.message} />
      <TextField label="confirm password" {...register("cPassword")} error={!!errors.cPassword}
        helperText={errors.cPassword?.message}/>
      <Button variant="contained" type="submit">
        SignUp
      </Button>
    </Paper>
  );
};

export default SignUp;
