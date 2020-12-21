import React from "react";
import Navbar from "./components/Navbar";
import UserCard from "./components/UserCard";
import UsersList from "./components/UsersList";
import "./App.css";

function App() {
  return (
    <div>
      <Navbar />
      <UsersList />
    </div>
  );
}

export default App;
