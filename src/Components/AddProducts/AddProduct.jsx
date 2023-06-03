import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AddProduct.css";

export default function AddProduct() {
  let data = { pname: "", price: "", category: "", company: "" };
  const [inputProduct, setProduct] = useState(data);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    setProduct({ ...inputProduct, [e.target.name]: e.target.value });
  };

  const submitHandler = async () => {
    let { pname, price, category, company } = inputProduct;
    if (!pname || !price || !category || !company) {
      setError(true);
      return false;
    }

    let userId = JSON.parse(localStorage.getItem("user"))._id;
    let userName = JSON.parse(localStorage.getItem("user")).name;

    console.log(userId);
    console.log("name----", userName);
    console.log(pname, price, category, company, userId, userName, "------");

    let result = await fetch("http://localhost:5001/add-product", {
      method: "post",
      body: JSON.stringify({
        pname,
        price,
        category,
        company,
        userId,
        userName,
      }),
      headers: {
        "Content-Type": "application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log("result---", result);
    navigate("/product");

    setProduct(data);
    setError(false);
  };
  useEffect(() => {}, [submitHandler]);
  return (
    <div className="form-container">
      <div className="form-data">
        <div className="inputForm">
          <h1 className="text-center">Add Product</h1>
          <input
            type="text"
            name="pname"
            placeholder="product name"
            value={inputProduct.pname}
            onChange={inputHandler}
          />
          {error && !inputProduct.pname && (
            <span className="p-error">please enter product name</span>
          )}
          <input
            className="mt-3"
            type="text"
            name="price"
            placeholder="product price"
            value={inputProduct.price}
            onChange={inputHandler}
          />
          {error && !inputProduct.price && (
            <span className="p-error">please enter product price</span>
          )}
          <input
            className="mt-3"
            type="text"
            name="category"
            placeholder="product category"
            value={inputProduct.category}
            onChange={inputHandler}
          />
          {error && !inputProduct.category && (
            <span className="p-error">please enter Category</span>
          )}
          <input
            className="mt-3"
            type="text"
            name="company"
            placeholder="company name"
            value={inputProduct.company}
            onChange={inputHandler}
          />
          {error && !inputProduct.company && (
            <span className="p-error">please enter Company Name</span>
          )}
        </div>
        <div className="text-center pt-3">
          <button type="button" className="form-button" onClick={submitHandler}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
