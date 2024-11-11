import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login(props) {
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log(login);
    e.preventDefault();
    const response = await axios.post("http://localhost:7000/login", login);
    console.log(response.data);
    navigate("/");
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col-8 bg-light">
          <h1 className="display-1">
            Login To <br /> OPD <br />
            Transaction Management <br />
            Tool
          </h1>
        </div>
        <div className="col-4 p-4 border border-light">
          <h3 className="bg-light p-5"> User Login</h3>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                onChange={handleChange}
                className="form-control"
                id="username"
                name="username"
                aria-describedby="username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                onChange={handleChange}
                className="form-control"
                id="password"
                name="password"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login;
