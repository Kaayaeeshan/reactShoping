import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Atom } from "react-loading-indicators";

const ProductList = () => {
  let [products, setProducts] = useState([]);
  let [error, setError] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:4000/products", { method: "GET" })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Search proper data");
        }
      })

      .then((data) => {
        setProducts(data);
      })

      .catch((error) => {
        setError(error.message);
      })

      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div>
        <center>
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
                style={{ width: "17rem" }}
                className="product"
                key={product.id}
              >
                <center>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ width: "9rem", height: "12rem" }}
                  />
                </center>
                <Card.Body>
                  <Card.Title style={{ overflow: "scroll", height: "80px" }}>
                    {product.title}
                  </Card.Title>
                  <Card.Text style={{ overflow: "scroll", height: "200px" }}>
                    {product.description}
                  </Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Card.Text>${product.price}</Card.Text>
                  <Button variant="primary">Add to Card</Button>
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
