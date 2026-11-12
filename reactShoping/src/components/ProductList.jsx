import React, { useEffect, useState } from 'react'

const ProductList = () => {

let [products,setProducts]= useState([]);
console.log(products);


useEffect(
  ()=>{
    fetch("http://localhost:4000/products",{method:"GET"})

    .then((response)=>{
      return response.json()
    })

    .then((data)=>{
      setProducts(data);
    })

  },[]
)

  return (
    <div>
      ProductList     
    </div>
  )
}

export default ProductList