import { InteractionType } from "@azure/msal-browser";
import { useMsalAuthentication } from "@azure/msal-react";

function Login() {
  const { login } = useMsalAuthentication(InteractionType.Popup);

  return <button onClick={() => login()}>Sign In</button>;
}
export default Login;
