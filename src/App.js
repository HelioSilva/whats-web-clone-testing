import React, { useCallback, useEffect, useMemo } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import api from "./services/api";
import { useSocket, useApp } from "./context/application";

function App() {
  const socket = useSocket();
  const dadosCompartilhados = useApp();
  const { data, setData } = dadosCompartilhados();

  const cargaInicial = useCallback(async () => {
    console.log("inicializando");
    const call = api;
    const conversa = await call.get("/whats/allchats", {});
    const resultadoAPI = conversa.data.body;

    const newChat = resultadoAPI[0];
    console.log(`newChats = ${newChat.mensagens.length}`);
    console.log(
      `Quantidade de mensagens ${data.chat.mensagens.length} / Antes`
    );
    const testeDenovo = {
      idContact: "558296130940@c.us",
      name: "Helio Silva",
      img: "https://pps.whatsapp.net/v/t61.24694-24/160689431_310115640653737_5855194428273899085_n.jpg?ccb=11-4&oh=5f4f0bd528295302f7c9c82264aefa4d&oe=60DFE748",
      pendingMsgs: false,
      mensagens: [...newChat.mensagens],
    };

    setData((prevState) => ({
      ...prevState,
      chat: { ...testeDenovo },
      chats: [...resultadoAPI],
    }));

    console.log(
      `Quantidade de mensagens ${data.chat.mensagens.length} / Depois`
    );
  }, []);

  const alteraData = (message) => {
    // const { data, setData } = providerValue();
    console.log("add");

    console.log("Antes do setData");
    console.log(data.chat.mensagens.length);

    //data.chat.mensagens.push(message);

    const { mensagens, ...others } = data.chat;
    // mensagens.push(message);

    setData((prevState) => ({
      ...prevState,
      chat: {
        ...others,
        mensagens: [...prevState.chat.mensagens, message],
      },
    }));

    console.log("Depois do setData");
    console.log(data.chat.mensagens.length);
  };

  useEffect(() => {
    cargaInicial();
  }, []);

  useEffect(() => {
    socket.on("message", (value) => {
      const message = JSON.parse(value);

      alteraData(message);

      // if ((chat.idContact = message.chatId)) {
      //   if (chat.mensagens) {
      //     chat.mensagens.push(message);
      //   }
      // }
    });
  }, [socket]);

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
