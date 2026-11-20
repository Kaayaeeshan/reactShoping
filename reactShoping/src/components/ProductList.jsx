import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Atom } from "react-loading-indicators";
import useFetch from "./custom-hook/useFetch";
import { FaCartShopping } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  let navigate = useNavigate();

  let { products, error, isLoading } = useFetch(
    "http://localhost:4000/products",
  );

  //   let [products, setProducts] = useState([]);
  //   let [error, setError] = useState("");
  //   let [isLoading, setIsLoading] = useState(true);

  //   useEffect(() => {
  //     fetch("http://localhost:4000/products", { method: "GET" })
  //       .then((response) => {
  //         if (response.ok) {
  //           return response.json();
  //         } else {
  //           throw new Error("Search proper data");
  //         }
  //       })

  //       .then((data) => {
  //         setProducts(data);
  //       })

  //       .catch((error) => {
  //         setError(error.message);
  //       })

  //       .finally(() => {
  //         setIsLoading(false);
  //       });
  //   }, []);

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
        <h1> Product List </h1>
        {products.length !== 0 && (
          <section className="products">
            {products.map((product) => (
              <Card
                style={{ width: "12rem", height: "17rem" }}
                className="product"
                key={product.id}
              >
                <center>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ width: "7rem", height: "8rem" }}
                  />
                </center>
                <Card.Body>
                  <Card.Title style={{ fontSize: "16px" }}>
                    <b>{product.title}</b>
                  </Card.Title>
                  <Card.Text style={{ fontSize: "14px" }}>
                    ${product.price}
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                    height: "2rem",
                    width: "auto",
                  }}
                >
                  <Button
                    variant="primary"
                    style={{
                      fontSize: "12px",
                      height: "1.6rem",
                      paddingtop: "0px",
                    }}
                  >
                    <FaCartShopping />
                  </Button>
                  <Button
                    variant="secondary"
                    style={{ fontSize: "12px" }}
                    onClick={() => {
                      navigate(`/update/${product.id}`)
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button variant="danger" style={{ fontSize: "12px" }}>
                    <RiDeleteBin5Fill />
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </section>
        )}
        {error && <p> {error} </p>}
      </div>
    );
  }
};

export default ProductList;
