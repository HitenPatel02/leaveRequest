import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import axios from "axios";
function Addleave(props) {
  const location = useLocation();
  const navigate = useNavigate();
  let [total, setTotal] = useState(0);
  let [showUpdate, setShowUpdate] = useState(false);
  let [showAdd, setShowAdd] = useState(true);
  let [id, setId] = useState("");
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [record, setRecord] = useState({
    studentname: "",
    year: "",
    fromdate: "",
    todate: "",
    purpose: "",
    reason: "",
    course: "",
  });

  useEffect(() => {
    var query = window.location.search.substring(1);
    if (query) {
      let id = query.split("=")[1];
      axios
        .post("http://localhost:7000/getleaverequest", {
          _id: id,
        })
        .then(async (response) => {
          console.log(response);
          setRecord(response.data[0]);
          if (response.data[0].year === "firstyear") {
            document.getElementById("rdbFy").setAttribute("checked", "checked");
          } else if (response.data[0].year === "secondyear") {
            document.getElementById("rdbSy").setAttribute("checked", "checked");
          } else {
            document.getElementById("rdbTy").setAttribute("checked", "checked");
          }
          await response.data[0];
          await setShowUpdate(true);
          await setShowAdd(false);
          await setId(id);
          document
            .getElementById("feesUpload")
            .setAttribute("disabled", "disabled");
        });
    } else {
      setRecord({
        studentname: "",
        year: "",
        fromdate: "",
        todate: "",
        purpose: "",
        reason: "",
        course: "",
      });
      setShowUpdate(false);
      setShowAdd(true);
    }
  }, [location]);
  const handleChange = async (e) => {
    await setRecord({ ...record, [e.target.name]: e.target.value });
  };
  const handleRdbClick = async (e) => {
    e.target.setAttribute("checked", "checked");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let data = record;

    const response = await axios.post(
      "http://localhost:7000/Addleaverequest",
      data
    );
    if (response.data._id) {
      alert("Record Added Successfully.");
      console.log(response.data);
      navigate(`/`);
    } else {
      alert("Unable add record. Try again After Some Time.");
      console.log(response);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:7000/updateleaverequest/${id}`, record)
      .then((response) => {
        console.log(response);
        alert("Record Updated Successfully.");
        navigate(`/Viewleave`);
      });
  };
  const saveFile = async (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  return (
    <div className="container">
      <div className="row bg-dark p-3">
        <div className="col-12 text-center text-white">
          <h1 className="display-5">Apply Leave</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-12 p-0">
          <form
            encType="multipart/form-data"
            className="bg-white bg-gradient p-4 m-auto"
            onSubmit={handleSubmit}
          >
            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Student Name</p>
              </div>
              <div className="col-lg-9">
                <input
                  name="studentname"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  required
                  value={record.studentname}
                />
              </div>
              <div className="col-lg-4"></div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Course</p>
              </div>
              <div className="col-lg-4">
                <input
                  name="course"
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  required
                  value={record.course}
                  list="courses"
                  autoComplete="off"
                />
                <datalist id="courses">
                  <option value="BCA" />
                  <option value="BBA" />
                  <option value="BCOM" />
                  <option value="BSC" />
                </datalist>
              </div>
              <div className="col-lg-1">
                <p>
                  <strong>Year</strong>
                </p>
              </div>
              <div className="col-lg-5 d-flex">
                <div className="form-check">
                  <input
                    onChange={handleChange}
                    className="form-check-input"
                    type="radio"
                    name="year"
                    value="firstyear"
                    id="rdbFy"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    First Year
                  </label>
                </div>
                <div className="form-check mx-3">
                  <input
                    onChange={handleChange}
                    className="form-check-input"
                    type="radio"
                    name="year"
                    value="secondyear"
                    id="rdbSy"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Second Year
                  </label>
                </div>
                <div className="form-check mx-3">
                  <input
                    onChange={handleChange}
                    className="form-check-input"
                    type="radio"
                    name="year"
                    value="thirdyear"
                    id="rdbTy"
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Third Year
                  </label>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-2">
                <p>From Date</p>
              </div>
              <div className="col-lg-4">
                <input
                  onChange={handleChange}
                  onBlur={handleChange}
                  type="date"
                  className="form-control"
                  name="fromdate"
                  id="fromdate"
                  required
                  value={record.fromdate}
                />
              </div>
              <div className="col-lg-1">
                <p>To Date</p>
              </div>
              <div className="col-lg-4">
                <input
                  onChange={handleChange}
                  onBlur={handleChange}
                  type="date"
                  className="form-control"
                  name="todate"
                  id="todate"
                  required
                  value={record.todate}
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Purpose</p>
              </div>
              <div className="col-lg-9">
                <input
                  onChange={handleChange}
                  type="text"
                  className="form-control"
                  name="purpose"
                  id="purpose"
                  required
                  value={record.purpose}
                />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-lg-2">
                <p>Detailed Reason of Leave </p>
              </div>
              <div className="col-lg-9">
                <textarea
                  className="form-control"
                  rows="5"
                  name="reason"
                  onChange={handleChange}
                  value={record.reason}
                ></textarea>
              </div>
            </div>

            {showAdd ? (
              <button type="submit" className="btn btn-dark">
                Submit Leave Request
              </button>
            ) : (
              ""
            )}

            {showUpdate ? (
              <button onClick={handleUpdate} className="btn btn-warning">
                Update Leave Request
              </button>
            ) : (
              ""
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
export default Addleave;
