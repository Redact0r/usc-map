import React, { useState } from "react";
import { FaInfoCircle, FaCog, FaSearchLocation, FaBars } from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("Search");

  const toggle = (id) => {
    setIsOpen(!isOpen);
    setSelected(isOpen ? id : null);
  };

  const menuItems = [
    {
      name: "Search",
      icon: <FaSearchLocation />,
    },
    {
      name: "Settings",
      icon: <FaCog />,
    },
    {
      name: "About Explore SC",
      icon: <FaInfoCircle />,
    },
  ];

  return (
    <div className="sidebar-container">
      <div style={{ width: isOpen ? "250px" : "50px" }} className="sidebar">
        <div className="top_section">
          <h1 className="logo" style={{ display: isOpen ? "block" : "none" }}>
            Logo
          </h1>
          <div style={{ marginLeft: isOpen ? "50px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, idx) => {
          return (
            <div
              className="sidebar-item"
              id={item.name}
              key={idx}
              title={item.name}
            >
              <div className="sidebar-icon">{item.icon}</div>
              <div
                style={{ display: isOpen ? "block" : "none" }}
                className="sidebar-link-text"
              >
                {item.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
