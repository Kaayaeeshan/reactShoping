import React from "react";
import { Outlet,Link } from "react-router-dom";


const Products = ()=>{
    return(
        <div>
            Products
            <Link to="list"> List </Link>
            <Link to="details"> Details </Link>
            <Outlet/>
        </div>
    )
}

export default Products;