import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import { Avatar, IconButton } from "@material-ui/core";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import SidebarChat from "./SidebarChat";

import api from "./services/api";

function Sidebar() {
  const [contato, setContato] = useState({ name: "Indefinido", img: "" });

  useEffect(() => {
    (async () => {
      const call = api;
      console.log("requisicao");
      const conversa = await call.get("/whats/allmessages", {});
      const resultadoAPI = conversa.data.body.chat.contact;
      console.log(resultadoAPI);
      setContato({
        name: resultadoAPI.name,
        img: resultadoAPI.profilePicThumbObj.eurl,
      });
    })();
  }, []);

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
        <SidebarChat addNewChat={true} />
        <SidebarChat dados={contato} />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
