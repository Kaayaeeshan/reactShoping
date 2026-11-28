import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Atom } from "react-loading-indicators";
import useFetch from "./custom-hook/useFetch";
import { FaCartShopping } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../store/carSlice";

const ProductList = () => {
  let navigate = useNavigate();

  let handleDelete = (id) => {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    // 1. Ask for confirmation FIRST
    swalWithBootstrapButtons
      .fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      })
      .then((result) => {
        // 2. ONLY if user confirms, do the API call and state update
        if (result.isConfirmed) {
          axios
            .delete(`https://fakestoreapi.com/products/${id}`)
            .then(() => {
              // Update the UI state ONLY after the server confirms deletion
              let newProductList = products.filter(
                (product) => product.id !== id,
              );
              setProducts(newProductList);

              // Show success message
              swalWithBootstrapButtons.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            })
            .catch((error) => {
              // Optional: handle API errors
              swalWithBootstrapButtons.fire({
                title: "Error!",
                text: "Something went wrong.",
                icon: "error",
              });
            });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // 3. If user cancels, just show the cancel message. Do nothing else.
          swalWithBootstrapButtons.fire({
            title: "Cancelled",
            text: "Your imaginary file is safe :)",
            icon: "error",
          });
        }
      });
  };

  let { products, error, isLoading, setProducts } = useFetch(
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

  let dispatch = useDispatch();
  let cartState = useSelector((state) => {
    return state.cart;
  });

  let addItemToCart = (product) => {
    let checkProduct = cartState.some(
      cartProduct => cartProduct.id === product.id,
    )

    if (!checkProduct) {
      dispatch(addItem(product))
      Swal.fire({
          title: "Success",
          text: "Product Added Successfully",
          icon: "success",
        })
    }
    else{
      Swal.fire({
          title: "Oops!",
          text: "Product Already Added",
          icon: "error",
          footer : "<p> Add Some other Product </p>"
        })
    }
  };

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
        <article>
          <span>To create new product</span>
          <Button
            onClick={() => {
              navigate("/newProduct");
            }}
            style={{
              marginLeft: "1%",
              height: "30px",
              fontSize: "15px",
              textAlign: "center",
              justifyContent: "center",
              paddingBottom: "30px",
            }}
          >
            click me{" "}
          </Button>
        </article>
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
                    onClick={() => addItemToCart(product)}
                  >
                    <FaCartShopping />
                  </Button>
                  <Button
                    variant="secondary"
                    style={{ fontSize: "12px" }}
                    onClick={() => {
                      navigate(`/update/${product.id}`);
                    }}
                  >
                    <FaEdit />
                  </Button>
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
        )}
        {error && <p> {error} </p>}
      </div>
    );
  }
};

export default ProductList;
