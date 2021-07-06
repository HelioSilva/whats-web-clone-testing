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

  const { data } = useApp();
  const [inputMessage, setInputMessage] = useState("");

  const scrollToBottom = () => {
    if (messagesEndRef && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [data.chat]);

  function viewMessage(value, senderName) {
    if (value.type == "image") {
      return (
        <div key={value.id.id ? value.id.id : value.id} className="chat__image">
          <img
            className={"img"}
            loading={"lazy"}
            src={`data:image/jpeg;base64,${value.body}`}
          />
          <p className="chat__timestamp">
            {new Date(Number(value.t * 1000)).toLocaleTimeString("pt-BR", {
              hour: "numeric",
              minute: "numeric",
              hour12: false,
            })}
          </p>
        </div>
      );
    }
    if (value.type == "chat") {
      if ((value.id && value.id.fromMe == false) || value.fromMe == false) {
        //Fala de terceiros
        return (
          <div
            key={value.id.id ? value.id.id : value.id}
            className="chat__message"
          >
            <p className="chat__name">{senderName}</p>
            {value.body}
            <p className="chat__timestamp">
              {new Date(Number(value.t * 1000)).toLocaleTimeString("pt-BR", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </p>
          </div>
        );
      } else {
        return (
          <div
            key={value.id && value.id.id ? value.id.id : value.id}
            className="chat__message chat__reciever"
          >
            {value.body}
            <p className="chat__timestamp">
              {new Date(Number(value.t * 1000)).toLocaleTimeString("pt-BR", {
                hour: "numeric",
                minute: "numeric",
                hour12: false,
              })}
            </p>
          </div>
        );
      }
    }
  }

  return (
    <div className="chat">
      {data.chat == undefined ? (
        <div></div>
      ) : (
        <>
          <div className="chat__header">
            <Avatar
              src={
                data.chat
                  ? data.chat.img
                  : `https://avatars.dicebear.com/4.5/api/avataaars/${Math.random()}.svg`
              }
            />
            <div className="chat__headerInfo">
              <h3>{data.chat.name}</h3>
              <p>
                {data.chat.t &&
                  new Date(Number(data.chat.t * 1000)).toLocaleTimeString(
                    "pt-BR",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: false,
                    }
                  )}
              </p>
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
            {data.chat.mensagens &&
              data.chat.mensagens.map((elem) => {
                return viewMessage(elem, data.chat.name);
              })}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat__footer">
            <InsertEmoticon />
            <AttachFileIcon />
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                data.sendMessage(data.chat.idContact, inputMessage);
                setInputMessage("");
                // scrollToBottom();
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
