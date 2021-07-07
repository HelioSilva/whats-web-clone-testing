import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
} from "react";

import { socket, SocketContext } from "./socket";
import api from "../services/api";

const AppContext = createContext();
const FunContext = createContext();

const ContextFun = (props) => {
  const { data, setData } = useApp();

  const downloadMedia = async (message) => {
    let indexFound = data.chat.mensagens.indexOf(message);
    const newChat = { ...data.chat };

    if (indexFound > 0) {
      const resp = await api.post("/whats/decryptFile", {
        message: { ...message },
      });

      if (resp.status != 200) return;

      let buff = new Buffer(resp.data.buffer);
      let base64data = buff.toString("base64");
      newChat.mensagens[indexFound].download = true;
      newChat.mensagens[indexFound].downloaded = base64data;

      setData((prevState) => ({
        ...prevState,
        chat: { ...newChat },
      }));
    }
  };

  const alterChatActive = useCallback(
    async (idContact = "") => {
      let contact = {};

      const running = data.chats.map(async (chat) => {
        if (chat.idContact == idContact) {
          const refreshMessages = await api.get(`/whats/messages/${idContact}`);
          await api.post(`/whats/sendseen/${idContact}`);
          contact = chat;
          if (refreshMessages.status === 200) {
            contact.mensagens = refreshMessages.data.body;
            contact.unreadCount = 0;
          }
        }
      });

      await Promise.all(running);

      if (contact != {}) {
        setData((prevState) => ({
          ...prevState,
          chat: contact,
        }));
      }
    },
    [data]
  );

  return (
    <FunContext.Provider value={{ alterChatActive, downloadMedia }}>
      {props.children}
    </FunContext.Provider>
  );
};

function useFunc() {
  const context = useContext(FunContext);

  if (!context) {
    throw new Error(
      "useApp só pode ser usado com o ContextApp por volta dos componentes"
    );
  }

  return context;
}

const ContextApp = (props) => {
  const sendMessage = async (number, message) => {
    const formatNumber = String(number).split("@");
    console.log("enviando uma mensagem agora");
    const call = api;
    await call.post("/whats/sendtext", {
      mensagem: message,
      numbers: [formatNumber[0]],
    });

    emitMessage(message, number);
  };

  const initialData = {
    idContact: "558296130940@c.us",
    name: "Helio Silva",
    img: "https://pps.whatsapp.net/v/t61.24694-24/160689431_310115640653737_5855194428273899085_n.jpg?ccb=11-4&oh=5f4f0bd528295302f7c9c82264aefa4d&oe=60DFE748",
    pendingMsgs: false,
    mensagens: [
      {
        id: {
          fromMe: false,
          remote: "558296130940@c.us",
          id: "F97FCEF52903E4153A86BACD3AE5B2CD",
          _serialized:
            "false_558296130940@c.us_F97FCEF52903E4153A86BACD3AE5B2CD",
        },
        body: "Hhh",
        type: "chat",
        t: 1625154846,
        notifyName: "",
        from: "558296130940@c.us",
        to: "558288551654@c.us",
        self: "in",
        ack: 0,
        invis: true,
        star: false,
        isFromTemplate: false,
        broadcast: false,
        mentionedJidList: [],
        isVcardOverMmsDocument: false,
        isForwarded: false,
        labels: [],
        ephemeralOutOfSync: false,
        productHeaderImageRejected: false,
        isDynamicReplyButtonsMsg: false,
        isMdHistoryMsg: false,
      },
    ],
  };

  const [data, setData] = useState({
    chats: [],
    chat: {},
    sendMessage: sendMessage,
  });
  //u

  // const providerValue = useMemo(
  //   () => () => ({ data, setData }),
  //   [data, setData]
  // );

  const emitMessage = useCallback(
    (message, number) => {
      const { mensagens, ...others } = data.chat;
      const newMessage = {
        id: number,
        fromMe: true,
        body: message,
        t: new Date().getTime() / 1000,
        type: "chat",
      };

      setData((prevState) => ({
        ...prevState,
        chat: {
          ...others,
          mensagens: [...prevState.chat.mensagens, newMessage],
        },
      }));
    },
    [data, setData]
  );

  return (
    <AppContext.Provider value={{ data, setData }}>
      <SocketContext.Provider value={socket}>
        <ContextFun>{props.children}</ContextFun>
      </SocketContext.Provider>
    </AppContext.Provider>
  );
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

function useSocket() {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocket só pode ser usado com o ContextSocket por volta dos componentes"
    );
  }

  return context;
}

export { ContextApp, AppContext, useApp, useSocket, useFunc };
