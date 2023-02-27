import React, { useState } from "react";
import { Sidebar, Tab } from "react-leaflet-sidebarv2";
import "./SidebarContainer.css";

const SidebarContainer = (props) => {
  const [collapsed, setCollapsed] = useState(true);
  const [selected, setSelected] = useState("home");

  const onOpen = (id) => {
    setCollapsed(false);
    setSelected(id);
  };
  const onClose = () => {
    setCollapsed(true);
  };

  return (
    <Sidebar
      id="sidebar"
      collapsed={collapsed}
      selected={selected}
      onOpen={onOpen}
      onClose={onClose}
    >
      <Tab id="home" header="Home" icon="fa fa-home">
        <p>No place like home!</p>
      </Tab>
      <Tab id="settings" header="Settings" icon="fa fa-cog" anchor="bottom">
        <p>Settings dialogue.</p>
      </Tab>
    </Sidebar>
  );
};

export default SidebarContainer;
