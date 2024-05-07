import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msalConfig.ts";
import { createContext, useState } from "react";

const msalInstance = new PublicClientApplication(msalConfig);
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
  <MsalProvider instance={msalInstance}>
    <TokenProvider>
      <App />
    </TokenProvider>
  </MsalProvider>
);
