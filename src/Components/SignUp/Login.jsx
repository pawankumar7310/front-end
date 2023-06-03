import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let data = { email: "", password: "" };
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

  const submitHandler = async () => {
    try {
      let { email, password } = inputText;
      const data = await fetch("http://localhost:5001/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const result = await data.json();
      console.log("result---", result);
      // console.log("result---", data.status);

      if (data.status == 200) {
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("token", JSON.stringify(result.auth));
        setInputText(data);
        navigate("/");
      } else {
        alert(result?.result);
      }
    } catch (error) {
      console.log("error", error.message);
    }
  };
  return (
    <div className="form-container">
      <div className="form-data">
        <div className="inputForm">
          <h1 className="text-center">Login</h1>
          <input
            type="text"
            name="email"
            placeholder="email"
            value={inputText.email}
            onChange={inputHandler}
          />
          <input
            className="mt-3"
            type="text"
            name="password"
            placeholder="password"
            value={inputText.password}
            onChange={inputHandler}
          />
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
