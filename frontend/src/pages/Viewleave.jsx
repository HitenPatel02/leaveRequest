import axios from "axios";
import DataTable, { createTheme } from "react-data-table-component";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

createTheme("dark", {
  background: {
    default: "transparent",
  },
  text: {
    primary: "#000000",
    secondary: "#000000",
  },
  divider: {
    default: "#000000",
  },
});

function Viewleave(props) {
  const navigate = useNavigate();
  let [records, setRecords] = useState("");
  const columns = [
    {
      name: "#",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Student Name",
      selector: (row) => row.studentname,
      sortable: true,
    },
    {
      name: "Course",
      selector: (row) => row.course,
      sortable: true,
    },
    {
      name: "Year",
      selector: (row) => row.year,
      sortable: true,
    },
    {
      name: "From Date",
      selector: (row) => row.fromdate,
      sortable: true,
    },
    {
      name: "To Date",
      selector: (row) => row.todate,
      sortable: true,
    },
    {
      name: "Purpose",
      selector: (row) => row.purpose,
      sortable: true,
    },
    {
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteStudentProfile(row._id)}
        >
          Delete
        </button>
      ),
    },
    {
      cell: (row) => (
        <button
          className="btn btn-warning btn-sm"
          onClick={() => updateStudentProfile(row._id)}
        >
          Update
        </button>
      ),
    },
  ];
  useEffect(() => {
    loadData();
  }, []);
  let loadData = () => {
    axios.get("http://localhost:7000/getleaverequest").then((response) => {
      console.log(response);
      setRecords(response.data);
    });
  };
  let deleteStudentProfile = (id) => {
    let isConfirmDelete = window.confirm("Do you Want to Delete this Record ?");
    console.log(isConfirmDelete);
    if (isConfirmDelete) {
      axios
        .delete(`http://localhost:7000/deleteleaverequest/${id}`)
        .then((response) => {
          loadData();
          console.log(response);
        });
    }
  };
  let updateStudentProfile = (id) => {
    navigate(`/Addleave?id=${id}`);
  };
  const data = records;

  return (
    <div className="container">
      <div className="row bg-dark">
        <div className="col-12 p-3">
          <h1 className="text-center text-white display-5">
            Student fees Data
          </h1>
        </div>
      </div>
      <div className="row bg-white p-2">
        <div className="col-12">
          <DataTable
            className="border border-dark"
            columns={columns}
            data={data}
            theme="dark"
          />
        </div>
      </div>
    </div>
  );
}
export default Viewleave;
