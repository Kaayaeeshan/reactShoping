import React from "react";
import { Link, Outlet, useNavigate, useParams } from "react-router-dom";

const Login = ()=>{
 
    let {newUser} = useParams();
    let navigate = useNavigate();

    let handleNavigate = ()=>{
        navigate("/")
    }

    return(
    <div>
        Login - {newUser}
        <button onClick={handleNavigate}> move to home </button>
    </div>
)}

export default Login;