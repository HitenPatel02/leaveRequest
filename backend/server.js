const express = require("express");
const fileupload = require("express-fileupload");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const { response } = require("express");

const app = express();
app.use(cors());
app.use(fileupload());
app.use(express.static("files"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

const port = 7000;

mongoose.connect("mongodb://localhost:27017/leaverequestdb");
const User = mongoose.model("user", {
  name: String,
  email: String,
  phone: String,
  username: String,
  password: String,
});
const leaverequest = mongoose.model("tbl_leave_request", {
  studentname: String,
  year: String,
  fromdate: String,
  todate: String,
  purpose: String,
  reason: String,
  course: String,
});
/*----------User Endoints-----------*/
//API ENDPOINT to Get All Users
app.get("/getUsers", async (req, res) => {
  console.log("here");
  let response = await User.find();
  console.log(response);
  res.send(response);
});
//API ENDPOINT to Get user detail
app.get("/getUser/:id", (req, res) => {
  User.find(function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//API ENDPOINT to Add New User
app.post("/register", async (req, res) => {
  let data = await req.body;
  console.log(data);
  const user = new User(data);
  user.save(function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//API ENDPOINT ro LOGIN user
app.post("/login", async (req, res) => {
  try {
    let data = req.body;
    console.log("data", data);
    let reply = await User.findOne(data).exec();
    console.log("result", reply);
    res.send(reply);
  } catch (error) {
    res.send(err);
  }
});
/*----------leaverequest Endoints-----------*/
app.post("/uploadfees", async (req, res) => {
  const newpath = __dirname + "/files/";
  console.log(req.files.file);
  const file = req.files.file;
  const filename = file.name;
  console.log(file.name);
  file.mv(`${newpath}${filename}`, (err) => {
    if (err) {
      res.status(500).send({ message: "File upload failed", code: 200 });
    }

    res.status(200).send({ message: "File Uploaded", code: 200 });
  });
});
//API ENDPOINT to Add New leaverequest
app.post("/Addleaverequest", async (req, res) => {
  let data = await req.body;
  console.log(data);
  const assignmemt = new leaverequest(data);

  assignmemt.save(function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//API ENDPOINT to Get All leaverequest
app.get("/getleaverequest", async (req, res) => {
  try {
    let response = await leaverequest.find().exec();

    res.send(response);
  } catch (error) {
    console.log("error", error);
  }
});
//API ENDPOINT to Get filtered leaverequest
app.post("/getleaverequest", (req, res) => {
  let filter = req.body;
  leaverequest.find({ filter }, function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
//Api ENDPOINT to update record
app.patch("/updateleaverequest/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let response = await leaverequest.findOneAndUpdate({ _id: id }, data);
    console.log(response);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
});

app.delete("/deleteleaverequest/:id", async (req, res) => {
  let id = req.params.id;
  leaverequest.findOneAndDelete({ id }, function (err, response) {
    if (err) return console.error(err);
    console.log(response);
    res.send(response);
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
