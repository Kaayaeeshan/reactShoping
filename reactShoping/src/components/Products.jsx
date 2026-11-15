import React,{useEffect, useState} from "react";
import { Outlet,Link } from "react-router-dom";
import Button from "react-bootstrap/Button";


const Products = ()=>{


    return(
        <div>
            <Outlet/>
        </div>
    )
}

export default Products;