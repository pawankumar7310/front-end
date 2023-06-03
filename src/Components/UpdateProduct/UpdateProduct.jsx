import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateProduct() {
  let data = { pname: "", price: "", category: "", company: "" };
  const [inputProduct, setProduct] = useState(data);

  // react router dom
  const navigate = useNavigate();
  const params = useParams();

  // onChange update here
  const inputHandler = (e) => {
    setProduct({ ...inputProduct, [e.target.name]: e.target.value });
  };

  // call api function and re-render when setProduct update
  useEffect(() => {
    getProduct();
  }, [setProduct]);

  // get one product base on params
  const getProduct = async () => {
    let result = await fetch(`http://localhost:5001/product/${params.id}`, {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    setProduct(result);
  };

  // reset new product data using put method
  const submitHandler = async () => {
    let { pname, price, category, company } = inputProduct;
    let result = await fetch(`http://localhost:5001/product/${params.id}`, {
      method: "put",
      body: JSON.stringify({ pname, price, category, company }),
      headers: {
        "Content-Type": "Application/json",
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      setProduct(result);
      navigate("/product");
    }
    console.log("update product", pname, price, category, company);
    setProduct(data);
  };
  return (
    <div className="form-container">
      <div className="form-data">
        <div className="inputForm">
          <h1 className="text-center">update Product</h1>
          <input
            type="text"
            name="pname"
            placeholder="product name"
            value={inputProduct.pname}
            onChange={inputHandler}
          />

          <input
            className="mt-3"
            type="text"
            name="price"
            placeholder="product price"
            value={inputProduct.price}
            onChange={inputHandler}
          />

          <input
            className="mt-3"
            type="text"
            name="category"
            placeholder="product category"
            value={inputProduct.category}
            onChange={inputHandler}
          />

          <input
            className="mt-3"
            type="text"
            name="company"
            placeholder="company name"
            value={inputProduct.company}
            onChange={inputHandler}
          />
        </div>
        <div className="text-center pt-3">
          <button type="button" className="form-button" onClick={submitHandler}>
            update
          </button>
        </div>
      </div>
    </div>
  );
}
