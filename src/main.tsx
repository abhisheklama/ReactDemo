import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { MsalProvider } from "@azure/msal-react";
import { PublicClientApplication } from "@azure/msal-browser";
import { msalConfig } from "./msalConfig.ts";
import { createContext, useState } from "react";

const msalInstance = new PublicClientApplication(msalConfig);
const token = useState("");

export const TokenContext = createContext(token);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <MsalProvider instance={msalInstance}>
    <TokenContext.Provider value={token}>
      <App />
    </TokenContext.Provider>
  </MsalProvider>
);
