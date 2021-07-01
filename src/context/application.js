import { createContext, useContext, useState, useMemo } from "react";

import { socket, SocketContext } from "./socket";

const AppContext = createContext();

const ContextApp = (props) => {
  const sendMessage = async (number, message) => {
    const formatNumber = String(number).split("@");
    console.log("enviando uma mensagem agora");
    const call = api;
    await call.post("/whats/sendtext", {
      mensagem: message,
      numbers: [formatNumber[0]],
    });
    // await refreshChats();
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
      },
    ],
  };

  const [data, setData] = useState({
    chats: [initialData],
    chat: initialData,
    sendMessage: sendMessage,
  });

  const providerValue = useMemo(
    () => () => ({ data, setData }),
    [data, setData]
  );

  return (
    <AppContext.Provider value={providerValue}>
      <SocketContext.Provider value={socket}>
        {props.children}
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

export { ContextApp, AppContext, useApp, useSocket };
