import React from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";

import { useApp } from "./context/application";

function viewSidebars(value) {
  return <SidebarChat key={value.idContact} dados={value} />;
}

function Sidebar() {
  const variavel = useApp();
  console.log("seidebarrr");
  console.log(variavel());
  const { data } = variavel();

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <Avatar />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>

          <IconButton>
            <ChatIcon />
          </IconButton>

          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlined />
          <input
            placeholder="Pesquisar ou começar uma nova conversa"
            type="text"
          />
        </div>
      </div>
      <div className="sidebar__chats">
        {/* <SidebarChat addNewChat={true} /> */}
        {data.chats && data.chats.map(viewSidebars)}
      </div>
    </div>
  );
}

export default Sidebar;
