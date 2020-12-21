const express = require("express");

const app = express();

//3-SETUP YOUR ENV VARIABLES
require("dotenv").config({ path: "./config/.env" });

const connectDB = require("./config/connectDB");

//5-SETUP THE JSON MIDDLEWARE
app.use(express.json());

//2-CONNECT THE DATABASE
connectDB();

/***************START CRUD ******************/
//4-Create Your Schema
const User = require("./models/User");

//ADD A NEW USER
//PATH : /api/add_user
app.post("/api/add_user", (req, res) => {
  const { name, lastName, email, phone } = req.body;
  const newUser = new User({ name, lastName, email, phone }); // create a new document
  newUser
    .save()
    .then((user) => res.send(user))
    .catch((err) => res.status(400).send({ msg: "ERROR ADD" }));
});

//GET ALL USERS
// PATH : /api/users
app.get("/api/users", (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => res.status(400).send({ msg: "ERROR GET USERS" }));
});

//GET USER BY ID
//PATH : /api/users/:userID
app.get("/api/users/:userID", (req, res) => {
  const id = req.params.userID;
  User.findById(id)
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User Not Found " });
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send({ msg: "ERROR GET USER BY ID" }));
});

//DELETE USER BY ID
//PATH : /api/users/:userID
app.delete("/api/users/:userID", (req, res) => {
  const id = req.params.userID;
  User.findByIdAndDelete(id) //findOneAndDelete( {_id : value of the id }  )
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User Not Found " });
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send({ msg: "Error Remove user " }));
});

//UPDATE USER BY ID
//PATH : /api/users/:userID
app.put("/api/users/:userID", (req, res) => {
  const userID = req.params.userID;
  User.findByIdAndUpdate(userID, req.body, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ msg: "User Not Found " });
      }
      res.send(user);
    })
    .catch((err) => res.status(400).send({ msg: "ERROR" }));
});

/****************END CRUD *******************/

//1-START THE SERVER
const port = process.env.PORT;

app.listen(port, () => {
  console.log(`The Server is Running ${port}....`);
});
