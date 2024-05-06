import {
  InteractionRequiredAuthError,
  InteractionType,
} from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

function Login() {
  const { login } = useMsalAuthentication(InteractionType.Popup);

  const { instance } = useMsal();
  console.log("instance", instance);
  // Get access token for the first account
  const accessTokenRequest = {
    scopes: ["user.read"], // Scopes required for your API
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
  return <button onClick={() => login()}>Sign In</button>;
}
export default Login;
