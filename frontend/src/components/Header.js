import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="header-container">
      <div className="logo">Crio.Do</div>
      <div className="nav-links">
        <div className="nav-link">
          <a href="https://www.crio.do/learn/home/">Dashboard</a>
        </div>
      </div>
    </div>
  );
}
