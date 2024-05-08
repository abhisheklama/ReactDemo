import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamsLogin from "./components/TeamsLogin.tsx";
import AuthEnd from "./components/AuthEnd.tsx";
import { app } from "@microsoft/teams-js";
import About from "./components/About.tsx";

let initial: {
  token: string;
  setToken: any;
  isAppInitialize: boolean;
  context: any;
} = {
  token: `${sessionStorage.getItem("accessToken")}`
    .replace("\n", "")
    .replace(/"/g, ""),
  setToken: "",
  isAppInitialize: false,
  context: {},
};
export const TokenContext = createContext(initial);

const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState(initial.token);
  const [appStatus, setAppStatus] = useState(false);
  const [context, setContext] = useState(initial.context);

  useEffect(() => {
    app.initialize().then(() => {
      app.getContext().then((context) => {
        setContext(context);
        setAppStatus(true);
      });
    });
  }, []);
  return (
    <TokenContext.Provider
      value={{ token, setToken, isAppInitialize: appStatus, context }}>
      {children}
    </TokenContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/auth_start" element={<TeamsLogin />} />
        <Route path="/auth_end" element={<AuthEnd />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  </TokenProvider>
);
