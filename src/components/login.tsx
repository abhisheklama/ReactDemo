import {
  InteractionRequiredAuthError,
  InteractionType,
} from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

function Login() {
  const { login } = useMsalAuthentication(InteractionType.Popup);

  const { instance } = useMsal();
  // Get access token for the first account
  const accessTokenRequest = {
    scopes: ["user.read"], // Scopes required for your API
  };

  instance
    .acquireTokenSilent(accessTokenRequest)
    .then((token) => {
      console.log("token", token);
      // Do something with the tokenResponse
    })
    .catch(async (error) => {
      if (error instanceof InteractionRequiredAuthError) {
        // fallback to interaction when silent call fails
        return instance.acquireTokenPopup(accessTokenRequest);
      }

      // handle other errors
    });
  return <button onClick={() => login()}>Sign In</button>;
}
export default Login;
