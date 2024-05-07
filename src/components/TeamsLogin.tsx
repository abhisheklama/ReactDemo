import { PublicClientApplication } from "@azure/msal-browser";
import { useSearchParams } from "react-router-dom";

const TeamsLogin = () => {
  const [query] = useSearchParams();
  console.log("query", query);
  const clientId = query.get("clientId");
  console.log("clientId", clientId);

  const msalConfig = {
    auth: {
      clientId: clientId + "",
      authority:
        "https://login.microsoftonline.com/9d143c90-308b-45c4-926a-c972e2f01269",
      redirectUri: "https://react-demo-pied.vercel.app/", // Update with your redirect URI
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
  };

  const msal = new PublicClientApplication(msalConfig);

  (async () => await msal.initialize())();
  msal.loginRedirect();

  return <>Login</>;
};

export default TeamsLogin;
