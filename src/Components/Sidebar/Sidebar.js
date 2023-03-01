import React, { useState } from "react";
import SearchFeature from "../SearchFeature/SearchFeature";
import { FaInfoCircle, FaSearchLocation, FaBars } from "react-icons/fa";

import "./Sidebar.css";

const Sidebar = ({ pointsOfInterest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDisplayOpen, setIsDisplayOpen] = useState(false);
  const [selected, setSelected] = useState("Search");

  const toggle = (id) => {
    setIsOpen(!isOpen);
  };

  const toggleWindow = (e) => {
    const selectedTab = e.currentTarget.id;
    setSelected(selectedTab);

    if (selected === selectedTab) {
      setIsDisplayOpen(!isDisplayOpen);
    }
  };

  const menuItems = [
    {
      name: "Search",
      icon: <FaSearchLocation />,
      page: (
        <SearchFeature
          pointsOfInterest={pointsOfInterest}
          isOpen={isOpen}
          isDisplayOpen={isDisplayOpen}
        />
      ),
    },
    {
      name: "About Explore SC",
      icon: <FaInfoCircle />,
    },
  ];

  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <div className="top_section">
          <div className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        {menuItems.map((item, idx) => {
          return (
            <div
              style={
                ({ visibility: isOpen ? "visible" : "hidden" },
                { opacity: isOpen ? 1 : 0 })
              }
              className="sidebar-item"
              id={item.name}
              key={idx}
              title={item.name}
              onClick={(e) => toggleWindow(e)}
            >
              <div className="sidebar-icon">{item.icon}</div>
            </div>
          );
        })}
      </div>
      <div
        className="sidebar-window"
        style={
          ({ visibility: isDisplayOpen && isOpen ? "visible" : "hidden" },
          { opacity: isDisplayOpen && isOpen ? 1 : 0 })
        }
      >
        {selected
          ? menuItems.find((item) => item.name === selected).page
          : null}
      </div>
    </div>
  );
};

export default Sidebar;
