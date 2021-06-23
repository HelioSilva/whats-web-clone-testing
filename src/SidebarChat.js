import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat({ addNewChat, dados }) {
  const createChat = () => {
    const roomName = prompt("Insira um nome para o novo chat 😀");

    if (roomName) {
      //fazer uma coisa sapeca
    }
  };

  return addNewChat ? (
    <div onClick={createChat} className="sidebarChat">
      <h2>Adicionar novo chat</h2>
    </div>
  ) : (
    <div className="sidebarChat">
      <Avatar
        src={
          dados
            ? dados.chat.contact.profilePicThumbObj.eurl
            : `https://avatars.dicebear.com/4.5/api/avataaars/${Math.random()}.svg`
        }
      />
      <div className="sidebarChat__info">
        <h2>{`${dados ? dados.chat.contact.formattedName : ""}`}</h2>
        <p>
          {dados
            ? dados.messages[dados.messages.length - 1].type == "chat"
              ? dados.messages[dados.messages.length - 1].body
              : "Imagem"
            : "----"}
        </p>
      </div>
    </div>
  );
}

export default SidebarChat;
