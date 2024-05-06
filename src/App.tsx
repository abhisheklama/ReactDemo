import "./App.css";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const { instance, inProgress, accounts } = useMsal();
  const [Token, setToken] = useState("");
  useEffect(() => {
    // Get access token for the first account
    if (inProgress == "none") {
      instance.setActiveAccount(accounts[0]);
      const accessTokenRequest = {
        scopes: ["User.read"], // Scopes required for your API
      };
      console.log("before token");
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((token) => {
          console.log("token", token);
          setToken(token.accessToken);
          console.log("Token", Token);

          axios
            .get("https://graph.microsoft.com/v1.0/me", {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            })
            .then((res) => console.log("profile", res));
          axios
            .get("https://graph.microsoft.com/v1.0/me/photo/$value", {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            })
            .then((res) => console.log("photo", res));
          // Do something with the tokenResponse
        })
        .catch(async (error) => {
          if (error instanceof InteractionRequiredAuthError) {
            // fallback to interaction when silent call fails
            let token = instance.acquireTokenPopup(accessTokenRequest);
            console.log("token popup", token);
          }
          console.log("error", error);
          // handle other errors
        });
    }
  }, [inProgress]);
  return (
    <>
      <h1>Demo App</h1>
    </>
  );
}

export default App;
