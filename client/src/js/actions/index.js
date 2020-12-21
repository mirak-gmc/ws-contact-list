import { GET_USERS, ADD_USER } from "../actionTypes";
import axios from "axios";

//ADD A NEW USER
//PATH : /api/add_user
// RESPONSE : newUser object

/******** */

//GET ALL USERS
// PATH : /api/users
//response : ARRAY OF USERS

/******* */
//DELETE USER BY ID
//PATH : /api/users/:userID

/** */

//UPDATE USER BY ID
//PATH : /api/users/:userID
//RESPONSE THE EDITED USER OBJECT

export const getUsers = () => (dispatch) => {
  axios.get("/api/users").then((res) => {
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  });
};

export const removeUser = (id) => (dispatch) => {
  axios
    .delete(`/api/users/${id}`)
    .then((res) => dispatch(getUsers()))
    .catch((err) => {
      //err.response.data = { msg :"Error " }
      alert("ERROR DELETE");
    });
};

export const addUser = (newUser) => (dispatch) => {
  //newUser = { name , lastName , email , phone }
  axios
    .post("/api/add_user", newUser)
    .then((res) =>
      dispatch({
        type: ADD_USER,
        payload: res.data, // a newUser object
      })
    )
    .catch((err) => alert("ADD ERROR "));
};

export const editUserById = (id, formData) => (dispatch) => {
  axios.put(`/api/users/${id}`, formData).then((res) => dispatch(getUsers()));
};
