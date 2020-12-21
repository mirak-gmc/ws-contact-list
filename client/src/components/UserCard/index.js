import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { removeUser } from "../../js/actions";
import AddEditForm from "../AddEditForm";
import "./style.css";

const UserCard = ({ user }) => {
  //user = { name , lastName , phone , email }
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const removeUserById = (id) => dispatch(removeUser(id));

  return (
    <div className="user-card" onMouseLeave={() => setShow(false)}>
      <i
        className={`fas fa-ellipsis-v ${show && "action-btn"} `}
        onClick={() => setShow(!show)}
      />
      {show && (
        <ul className="action-menu">
          <li>
            <i className="fas fa-trash" />{" "}
            <span onClick={() => removeUserById(user._id)}>DELETE</span>
          </li>
          <li>
            <i className="fas fa-pen" />
            <AddEditForm
              oldUser={{
                name: user.name,
                lastName: user.lastName,
                email: user.email,
                phone: user.phone,
              }}
              _id={user._id}
            />
          </li>
        </ul>
      )}

      <div className="avatar" style={{ background: "rgba(0,0,0,0.5)" }}>
        {user.name[0]}
      </div>
      <div className="user-info">
        <p>
          <i className="fas fa-user" />
          <span> {`${user.name} ${user.lastName}`} </span>
        </p>

        <p>
          <i className="fas fa-envelope" />
          <span> {user.email} </span>
        </p>
        <p>
          <i className="fas fa-phone" />
          <span> {user.phone}</span>
        </p>
      </div>
    </div>
  );
};

export default UserCard;
