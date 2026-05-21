import React, { useContext } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import Main from "./components/Main/Main";
import "./App.css";
import { Context } from "./components/context/Context";

const App = () => {
  const { theme } = useContext(Context);

  return (
    <div className={`app ${theme}`}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default App;