import React from "react";
import useFetch from "./custom-hook/useFetch";
import { Atom } from "react-loading-indicators";

const Home = () => {
  let { products, error, isLoading } = useFetch(
    "http://localhost:4000/products",
  );
  if (isLoading) {
    return (
      <div>
        <center>
          {console.log(isLoading)}
          <Atom
            color="#32cd32"
            size="large"
            text="Loding..."
            textColor="#f7520b"
          />
        </center>
      </div>
    );
  } else {
    return (
      <div>
        {products.length !== 0 && (
          <h1>Home - Total products = {products.length}</h1>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  }
};

export default Home;
