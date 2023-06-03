import { Outlet, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header/Header";
import Product from "./Components/Products/Product";
import Logout from "./Components/Logout/Logout";
import Profile from "./Components/Profile/Profile";
import SignUp from "./Components/SignUp/SignUp";
import AddProduct from "./Components/AddProducts/AddProduct";
import UpdateProduct from "./Components/UpdateProduct/UpdateProduct";
import PrivateComponent from "./Components/PrivateComponent";
import Login from "./Components/SignUp/Login";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route element={<PrivateComponent />}>
          <Route path="/" element={<h1>home</h1>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/product" element={<Product />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
          <Route path="/addproduct" element={<AddProduct />} />
        </Route>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
