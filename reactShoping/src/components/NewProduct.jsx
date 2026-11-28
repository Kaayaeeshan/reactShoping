import React, { useState } from "react";
import { Paper, TextField, Typography, Grid, Button, Box } from "@mui/material";

const NewProduct = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  let [newProduct, setNewProduct] = useState({
    title: "",
    price: 0,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  let handleChange = (e) => {
    let { value, name } = e.target;
    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setNewProduct({
        ...newProduct,
        rating: {
          ...newProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setNewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  console.log(newProduct);
  let handleAdd = (e) => {
    e.preventDefault();

    fetch("https://fakestoreapi.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct)
    }).then(() => {
      alert("Data Added Sucessfully");
      setNewProduct({
        title: "",
        price: 0,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    });
  };

  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography variant="h5" align="center">
        Create new products
      </Typography>
      <Grid
        component="form"
        style={{ display: "grid", gap: "20px" }}
        onSubmit={handleAdd}
      >
        <TextField
          value={newProduct.title}
          variant="outlined"
          name="title"
          label="Title"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          value={newProduct.category}
          variant="outlined"
          name="category"
          label="Category"
          fullWidth
          onChange={handleChange}
        />
        <TextField
          value={newProduct.price}
          variant="outlined"
          name="price"
          label="Price"
          type="number"
          fullWidth
          onChange={handleChange}
        />
        <Grid container spacing={2}>
          <Grid size={6}>
            <TextField
              value={newProduct.rating.rate}
              variant="outlined"
              name="rating.rate"
              label="Rate"
              type="number"
              onChange={handleChange}
            />
          </Grid>
          <Grid size={6}>
            <TextField
              value={newProduct.rating.count}
              variant="outlined"
              name="rating.count"
              label="Count"
              type="number"
              onChange={handleChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" fullWidth>
          Add
        </Button>
      </Grid>
    </Paper>
  );
};

export default NewProduct;
