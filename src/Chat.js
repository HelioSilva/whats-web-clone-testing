import React, { useState, useEffect, useRef } from "react";
import "./Chat.css";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import InsertEmoticon from "@material-ui/icons/InsertEmoticon";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import Mic from "@material-ui/icons/Mic";
import SendIcon from "@material-ui/icons/Send";
import { useApp } from "./context/application";

function Chat() {
  const messagesEndRef = useRef();
  const { selectChat, sendMessage } = useApp();
  const [inputMessage, setInputMessage] = useState("");

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectChat.messages]);

  function viewMessage(value) {
    if (value.type == "chat") {
      if (value.fromMe == false) {
        //Fala de terceiros
        return (
          <p key={value.id} className="chat__message">
            <p className="chat__name">{value.sender.name}</p>
            {value.body}
            <p className="chat__timestamp">15:27</p>
          </p>
        );
      } else {
        return (
          <p key={value.id} className="chat__message chat__reciever">
            {value.body}
            <p className="chat__timestamp">15:27</p>
          </p>
        );
      }
    }

    if (messagesEndRef) {
      scrollToBottom(messagesEndRef);
    }
  }

  return (
    <div className="chat">
      {selectChat.contact == undefined ? (
        <div></div>
      ) : (
        <>
          <div className="chat__header">
            <Avatar
              src={
                selectChat
                  ? selectChat.contact.profilePicThumbObj.eurl
                  : `https://avatars.dicebear.com/4.5/api/avataaars/${Math.random()}.svg`
              }
            />
            <div className="chat__headerInfo">
              <h3>{selectChat.contact.name}</h3>
              <p>Visto à 2 semanas</p>
            </div>

            <div className="chat__headerRight">
              <IconButton>
                <MoreVertIcon />
              </IconButton>
              <IconButton>
                <SearchOutlined />
              </IconButton>
            </div>
          </div>

          <div className="chat__body">
            {selectChat.messages.map(viewMessage)}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat__footer">
            <InsertEmoticon />
            <AttachFileIcon />
            <form
              onSubmit={async (event) => {
                event.preventDefault();

                await sendMessage(selectChat.contact.id.user, inputMessage);
                setInputMessage("");
              }}
            >
              <input
                value={inputMessage}
                onChange={(event) => {
                  setInputMessage(event.target.value);
                }}
                placeholder="Digite uma mensagem"
                type="text"
              />
              <button type="submit" style={{ display: "none" }}>
                {""}
              </button>
            </form>

            <SendIcon />
            <Mic />
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
