import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUsers } from "../../js/actions/index";
import AddEditForm from "../AddEditForm";
import UserCard from "../UserCard";

const UsersList = () => {
  //useSelector to get the state form the store
  const { users, loading } = useSelector((state) => state);

  // useDispatch to get the dispatch function in the component
  const dispatch = useDispatch();
  const getAllUsers = () => dispatch(getUsers());

  useEffect(() => {
    getAllUsers();
  }, []);

  if (loading) {
    return <h1>Loading.......</h1>;
  }

  return (
    <div>
      <AddEditForm />
      <div className="users-container">
        {users.map((user, i) => (
          <UserCard key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
