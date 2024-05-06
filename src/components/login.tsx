import {
  InteractionRequiredAuthError,
  InteractionType,
} from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";
import { useEffect } from "react";

function Login() {
  const { login } = useMsalAuthentication(InteractionType.Popup);

  const { instance, inProgress, accounts, logger } = useMsal();
  console.log(
    "instance",
    instance,
    "inProgress",
    inProgress,
    "accounts",
    accounts,
    "logger",
    logger
  );
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
  return <button onClick={() => login()}>Sign In</button>;
}
export default Login;
