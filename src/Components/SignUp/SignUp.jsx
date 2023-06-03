import React, { useEffect, useState } from "react";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  let data = { name: "", email: "", password: "" };
  const [inputText, setInputText] = useState(data);
  const navigate = useNavigate();

  useEffect(() => {
    let auth = localStorage.getItem("user");
    if (auth) {
      navigate("/");
    }
  }, []);

  const inputHandler = (e) => {
    setInputText({ ...inputText, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    let { name, email, password } = inputText;
    let result = await fetch("http://localhost:5001/register", {
      method: "post",
      body: JSON.stringify({ name, email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    result = await result.json();
    if (
      inputText.name != "" ||
      inputText.email != "" ||
      inputText.password != ""
    ) {
      localStorage.setItem("user", JSON.stringify(result.result));
      localStorage.setItem("token", JSON.stringify(result.auth));
      navigate("/");
      setInputText(data);
    } else {
      alert("please enter valid email");
    }
    console.log("result---", result);
  };

  return (
    <div className="form-container">
      <div className="form-data">
        <div className="inputForm">
          <h1 className="text-center">Sign up</h1>
          <input
            type="text"
            name="name"
            placeholder="name"
            value={inputText.name}
            onChange={inputHandler}
          />

          <input
            className="my-3"
            type="email"
            name="email"
            placeholder="email"
            value={inputText.email}
            onChange={inputHandler}
          />

          <input
            type="text"
            name="password"
            placeholder="password"
            value={inputText.password}
            onChange={inputHandler}
          />
        </div>
        <div className="text-center pt-3">
          <button type="button" className="form-button" onClick={handleSubmit}>
            submit
          </button>
        </div>
      </div>
    </div>
  );
}
