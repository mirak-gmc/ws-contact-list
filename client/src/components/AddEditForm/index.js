import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch } from "react-redux";
import { addUser, editUserById } from "../../js/actions";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center",
    background: "#f9f9f9",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.4)",
    zIndex: 999,
    width: "100vw",
  },
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

function AddEditForm({ oldUser, _id }) {
  const dispatch = useDispatch();
  const addNewUser = (formData) => dispatch(addUser(formData));
  const editUser = (id, formData) => dispatch(editUserById(id, formData));

  const [modalIsOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    lastName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    oldUser
      ? setForm(oldUser)
      : setForm({
          name: "",
          lastName: "",
          email: "",
          phone: "",
        });
  }, [modalIsOpen, oldUser]);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    oldUser ? editUser(_id, form) : addNewUser(form);
    closeModal();
  };

  return (
    <React.Fragment>
      {oldUser ? (
        <span onClick={openModal}>EDIT </span>
      ) : (
        <i className="fas fa-plus add-btn" onClick={openModal} />
      )}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <h2> {oldUser ? "EDIT USER" : "ADD USER"}</h2>
        <form onSubmit={handleSubmit} className="add-edit-form">
          <label>NAME</label>
          <input
            onChange={handleChange}
            value={form.name}
            name="name"
            type="text"
            placeholder="Enter your name..."
            required
          />
          <label>LAST NAME</label>
          <input
            onChange={handleChange}
            value={form.lastName}
            name="lastName"
            type="text"
            placeholder="Enter your last name name..."
            required
          />
          <label>EMAIL</label>
          <input
            onChange={handleChange}
            value={form.email}
            name="email"
            type="email"
            placeholder="Enter your email..."
            required
          />
          <label>PHONE</label>
          <input
            onChange={handleChange}
            value={form.phone}
            name="phone"
            type="tel"
            pattern="[0-9]{8,}"
            required
            placeholder="Enter your phone..."
          />
          <div>
            <button type="submit">Confirm</button>
            <button onClick={closeModal}>Cancel</button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
}

export default AddEditForm;
