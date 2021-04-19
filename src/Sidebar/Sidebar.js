import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h3 className="sidebar-heading">
        <strong>Ticket Me</strong>
      </h3>
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/" className="list-item">
              <i className="fa fa-home mr-3"></i>Home
            </Link>
          </li>
          <li>
            <Link to="/tickets" className="list-item">
              <i className="fa fa-ticket mr-3"></i>Tickets
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
