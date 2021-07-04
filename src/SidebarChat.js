import React from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";
import { useApp, useFunc } from "./context/application";

function SidebarChat({ dados }) {
  const context = useApp();

  const { alterChatActive } = useFunc();
  return (
    <div
      className={
        dados.idContact == context.data.chat.idContact
          ? "sidebarChat sidebarChatActive"
          : "sidebarChat"
      }
      style={{ flex: 1 }}
      onClick={() => {
        alterChatActive(dados.idContact);
      }}
    >
      <div style={{ flexGrow: 4, display: "flex" }}>
        <Avatar
          src={
            dados
              ? dados.img
              : `https://avatars.dicebear.com/4.5/api/avataaars/${Math.random()}.svg`
          }
        />
        <div className="sidebarChat__info">
          <h2>{`${dados ? dados.name : ""}`}</h2>
          <p>{dados.ultimaMensagem}</p>
        </div>
      </div>

      <div
        style={{
          // flexGrow: 1,
          flexBasis: "30px",
          // width: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "10px",
        }}
      >
        {dados.unreadCount > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#06D755",
              width: "21px",
              height: "21px",
              borderRadius: "12px",
            }}
          >
            <p style={{ fontSize: 11, color: "#fff" }}>{dados.unreadCount}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SidebarChat;
