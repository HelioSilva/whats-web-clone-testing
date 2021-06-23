import React from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { ContextApp } from "./context/application";

function App() {
  return (
    // BEM naming convention
    <ContextApp>
      <div className="app">
        <div className="app__body">
          {/* Siderbar */}
          <Sidebar />
          <Chat />
          {/* Chat */}
        </div>
      </div>
    </ContextApp>
  );
}

export default App;
