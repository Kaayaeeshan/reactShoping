import React, { useEffect, useState } from "react";
import { Paper, TextField, Typography, Grid, Button } from "@mui/material";
import { data, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Atom } from "react-loading-indicators";

const NewProduct = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  let [updateProduct, setUpdateProduct] = useState(null);

  let { id } = useParams();
  let navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${id}`)

      .then((res) => {
        setUpdateProduct(res.data);
      });
  }, []);

  let handleChange = (e) => {
    let { value, name } = e.target;
    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setUpdateProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setUpdateProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  console.log(updateProduct);
  let handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then(() => {
      alert("Data Saved Sucessfully");
      navigate("/products");
    });
  };
  if (updateProduct !== null) {
    return (
      <Paper elevation={20} style={paperStyle}>
        <Typography variant="h5" align="center">
          Update New Product
        </Typography>
        <Grid
          component="form"
          style={{ display: "grid", gap: "20px" }}
          onSubmit={handleUpdate}
        >
          <TextField
            value={updateProduct.title}
            variant="outlined"
            name="title"
            label="Title"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={updateProduct.category}
            variant="outlined"
            name="category"
            label="Category"
            fullWidth
            onChange={handleChange}
          />
          <TextField
            value={updateProduct.price}
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
                value={updateProduct.rating.rate}
                variant="outlined"
                name="rating.rate"
                label="Rate"
                type="number"
                onChange={handleChange}
              />
            </Grid>
            <Grid size={6}>
              <TextField
                value={updateProduct.rating.count}
                variant="outlined"
                name="rating.count"
                label="Count"
                type="number"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="success" fullWidth>
            Save
          </Button>
        </Grid>
      </Paper>
    );
  } else {
    <div>
      <Atom color="#32cd32" size="large" text="Loding..." textColor="#f7520b" />
    </div>;
  }
};

export default NewProduct;
