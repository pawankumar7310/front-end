import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  let userName = localStorage.getItem("user");

  console.log("---------", userName);
  const logout = () => {
    localStorage.clear();
    navigate("/signup");
  };
  return (
    <header className="header-bar">
      <div className="logo fw-bold"> Logo{/* <img src={} alt='logo'/> */}</div>

      {userName ? (
        <ul className="nav p-0">
          <li>
            <Link className="header-link" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/product">
              Product
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/addproduct">
              Add Product
            </Link>
          </li>

          <li>
            <Link className="header-link" to="/profile">
              Profile
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/login" onClick={logout}>
              Logout
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/profile">
              {/* ( {JSON?.parse(userName)?.name}) */}
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="nav p-0">
          <li>
            <Link className="header-link p-0" to="/signup">
              Sign Up
            </Link>
          </li>
          <li>
            <Link className="header-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      )}
    </header>
  );
}
