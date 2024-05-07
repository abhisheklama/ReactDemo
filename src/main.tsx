import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createContext, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeamsLogin from "./components/TeamsLogin.tsx";

let initial: any[] = [];
export const TokenContext = createContext(initial);

const TokenProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const token = useState("");
  return (
    <TokenContext.Provider value={token}>{children}</TokenContext.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<TeamsLogin />} />
      </Routes>
    </BrowserRouter>
  </TokenProvider>
);
