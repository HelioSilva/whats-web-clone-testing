import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import api from "./services/api";
import { useSocket, useApp } from "./context/application";

function App() {
  const socket = useSocket();
  const { data, setData } = useApp();

  const cargaInicial = async () => {
    console.log("inicializando");
    const call = api;
    const conversa = await call.get("/whats/allchats", {});
    const resultadoAPI = conversa.data.body;

    const newChat = resultadoAPI[1];

    const testeDenovo = {
      idContact: newChat.idContact,
      name: newChat.name,
      img: newChat.img,
      pendingMsgs: newChat.pendingMsgs,
      mensagens: [...newChat.mensagens],
    };

    setData((prevState) => ({
      ...prevState,
      chat: { ...testeDenovo },
      chats: [...resultadoAPI],
    }));
  };

  const alteraData = async (message) => {
    const { chat } = data;
    const { mensagens, ...others } = data.chat;
    let novoArray = [...data.chats];

    const messageForChatSelection = chat.idContact == message.from;

    const running = novoArray.map((element) => {
      if (element.idContact == message.from) {
        element.ultimaMensagem = message.body;
        element.unreadCount += 1;
      }
    });

    await Promise.all(running);

    if (messageForChatSelection) {
      setData((prevState) => ({
        ...prevState,
        chats: novoArray,
        chat: {
          ...others,
          mensagens: [...prevState.chat.mensagens, message],
        },
      }));
    } else {
      setData((prevState) => ({
        ...prevState,
        chats: novoArray,
      }));
    }
  };

  useEffect(() => {
    socket.on("message", (value) => {
      console.log("nova mensagem via socket");
      const message = JSON.parse(value);
      alteraData(message);
    });

    return () => {
      socket.off("message");
    };
  });

  useEffect(() => {
    cargaInicial();
  }, []);

  return (
    // BEM naming convention
    <div className="app">
      <div className="app__body">
        {/* Siderbar */}
        <Sidebar />
        <Chat />
        {/* Chat */}
      </div>
    </div>
  );
}

export default App;
