import React from "react";
import Home from "./components/home";
import TodoApp from "./components/TodoApp";
import Products from "./components/Products";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import {BrowserRouter as Router, Routes,Route, Link} from "react-router-dom";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";


function App(){

    let user = "Kaayaeeshan";

    return(
    <div className="app">

        <Router>
         <ol>
            <li> <Link to="/"> home </Link> </li>
            <li> <Link to="/products"> products </Link> </li>
            <li> <Link to= {`/login/${user}`}> login </Link> </li>
            <li> <Link to="/sign-up"> signup </Link> </li>
            <li> <Link to="/todo"> todo </Link> </li>
        </ol>
        
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/products" element ={<Products/>}>
                    <Route index element={<ProductList/>}/>
                    <Route path="list" element={<ProductList/>}/>
                    <Route path="details" element={<ProductDetails/>}/>
                </Route>
                <Route path="/login/:newUser" element={<Login/>}/>
                <Route path="/sign-up" element={<SignUp/>}/>
                <Route path="/todo" element={<TodoApp/>}/>
            </Routes>
        </Router>
    </div>
    );
}

export default App;