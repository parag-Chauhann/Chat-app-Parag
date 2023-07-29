import React from "react";
import Chats from "./SubComponents/Chats";
import Navbar from "./SubComponents/Navbar";
import Search from "./SubComponents/Search";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <Navbar />
      <Search/>
      <Chats/>
    </div>
  );
};

export default Sidebar;
