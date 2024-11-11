import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Register(props) {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    console.log(user);
    e.preventDefault();

    if (user.name !== "") {
      const response = await axios.post("http://localhost:7000/register", user);
      console.log(response);
      navigate(`/login`);
    }
  };
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-6 bg-light">
            <h1 className="display-3 pt-5">
              Only Registered
              <br /> User will <br />
              Be Able <br />
              to Access
            </h1>
          </div>
          <div className="col-6">
            <h3 className="bg-light p-3">Register Now </h3>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                className="form-control"
                name="email"
                placeholder="Email"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                className="form-control"
                name="name"
                placeholder="Name"
                onChange={handleChange}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                className="form-control"
                name="phone"
                placeholder="Phone No"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">User Name</label>
              <input
                className="form-control"
                name="username"
                placeholder="User Name"
                onChange={handleChange}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                className="form-control"
                name="password"
                placeholder="Password"
                onChange={handleChange}
              />
            </div>
            <div>
              <button className="btn btn-success">Create Account</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
export default Register;
