import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { removeItem } from "../store/carSlice";

const WishList = () => {

    let dispatch = useDispatch()
    let handleDelete =(reduxItem)=>{
        dispatch(removeItem(reduxItem))
    }

  let cartProducts = useSelector((state) => {
    return state.cart;
  });
  console.log(cartProducts);
  return (
    <div>
      <h1> Wish List </h1>
      {cartProducts.length !== 0 ? (
        <section className="products">
          {cartProducts.map((product) => (
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
                  variant="danger"
                  style={{ fontSize: "12px" }}
                  onClick={() => {
                    handleDelete(product.id);
                  }}
                >
                  <RiDeleteBin5Fill />
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </section>
      ) : (
        <h1>Please Purchase Something</h1>
      )}
    </div>
  );
};

export default WishList;
