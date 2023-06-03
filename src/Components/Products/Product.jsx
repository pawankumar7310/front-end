import { useEffect, useState } from "react";
import "./Product.css";
import { Link } from "react-router-dom";

export default function Product() {
  const [productList, setProductList] = useState([]);

  const getProduct = async () => {
    let result = await fetch("http://localhost:5001/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    console.log(result);
    setProductList(result);
    console.log("product list", productList);
  };

  const deleteProduct = async (id) => {
    let result = await fetch(`http://localhost:5001/product/${id}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProduct();
    }
  };

  //  search method
  const searchHandler = async (e) => {
    let key = e.target.value;
    if (key) {
      let result = await fetch(`http://localhost:5001/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      setProductList(result);
    } else {
      getProduct();
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div div className="form-container ">
      <h1>Product List</h1>
      <input type="text" placeholder="search" onChange={searchHandler} />
      <table className="form-data">
        <tr className="t-row">
          <th>S.NO</th>
          <th>Product Name</th>
          <th>Price</th>
          <th>Company Name</th>
          <th>Operations</th>
        </tr>

        {productList.length ? (
          productList.map((plist, index) => (
            <tr key={plist._id} className="t-row">
              <td>{index + 1}</td>
              <td>{plist.pname}</td>
              <td>{plist.price}</td>
              <td>{plist.company}</td>
              <td>
                <button onClick={() => deleteProduct(plist._id)}>Delete</button>
                <Link to={`/updateproduct/${plist._id}`}>update</Link>
              </td>
            </tr>
          ))
        ) : (
          <tr className="text-center">
            <td colspan="5">
              <h1>No Data Found</h1>
            </td>
          </tr>
        )}
      </table>
    </div>
  );
}
