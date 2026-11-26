import React from "react";
import { Paper, TextField, Typography, Button } from "@mui/material";
import { useForm } from "react-hook-form";

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
  } = useForm();

  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography variant="h6"> Create Account </Typography>
      <TextField label="name" {...register("name")} />
      <TextField label="email" {...register("email")} />
      <TextField label="age" {...register("age")} />
      <TextField label="password" {...register("password")} />
      <TextField label="confirm password" {...register("cPassword")} />
      <Button variant="contained" type="submit">
        SignUp
      </Button>
    </Paper>
  );
};

export default SignUp;
