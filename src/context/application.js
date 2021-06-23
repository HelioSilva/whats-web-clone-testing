import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AppContext = createContext();

const ContextApp = ({ children }) => {
  const sendMessage = async (number, message) => {
    const call = api;
    await call.post("/whats/sendtext", {
      mensagem: message,
      numbers: [number],
    });
    await refreshChats();
  };

  const refreshChats = async () => {
    const call = api;
    console.log("requisicao");
    const conversa = await call.get("/whats/allmessages", {});
    const resultadoAPI = conversa.data.body;

    let { selectChat } = data;
    // if (selectChat.contact == undefined) {
    selectChat.contact = resultadoAPI[0].chat.contact;
    selectChat.messages = resultadoAPI[0].messages;
    // }else{

    // }

    setData({
      chats: resultadoAPI,
      selectChat,
      sendMessage: sendMessage,
    });
  };

  const [data, setData] = useState({
    chats: [],
    selectChat: {
      contact: undefined,
      messages: [],
    },
    sendMessage: sendMessage,
  });

  useEffect(() => {
    (async () => {
      const call = api;
      console.log("requisicao");
      const conversa = await call.get("/whats/allmessages", {});
      const resultadoAPI = conversa.data.body;
      console.log(conversa.data.body);

      let { selectChat } = data;
      selectChat.contact = resultadoAPI[0].chat.contact;
      selectChat.messages = resultadoAPI[0].messages;

      setData({
        chats: resultadoAPI,
        selectChat,
        sendMessage: sendMessage,
      });
    })();
  }, []);

  return <AppContext.Provider value={data}>{children}</AppContext.Provider>;
};

function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useApp só pode ser usado com o ContextApp por volta dos componentes"
    );
  }

  return context;
}

export { ContextApp, AppContext, useApp };
