import { InteractionType } from "@azure/msal-browser";
import { useMsal, useMsalAuthentication } from "@azure/msal-react";

function Login() {
  const { login } = useMsalAuthentication(InteractionType.Popup);

  const { instance } = useMsal();
  const accounts = instance.getAllAccounts();
  console.log("accounts", accounts);
  // Get access token for the first account
  const accessTokenRequest = {
    scopes: ["user.read"], // Scopes required for your API
  };

  instance
    .acquireTokenSilent(accessTokenRequest)
    .then((token) => console.log("tokeb", token));

  return <button onClick={() => login()}>Sign In</button>;
}
export default Login;
