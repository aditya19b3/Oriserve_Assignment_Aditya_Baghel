import React from "react";
import Search from "./search";
import "./App.css";

function Header({ onSearch }) {
  return (
    <header className="header">
      <h1>Search Photos</h1>
      <Search onSearch={onSearch} /> {/* Render the Search component */}
    </header>
  );
}

export default Header;
