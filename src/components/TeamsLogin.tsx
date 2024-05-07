import { LogLevel, PublicClientApplication } from "@azure/msal-browser";
import { useSearchParams } from "react-router-dom";

const TeamsLogin = () => {
  const [query] = useSearchParams();
  console.log("query", query);
  const clientId = query.get("clientId");
  const loginHint = query.get("loginHint");
  var scope = "User.Read email openid profile offline_access";
  const scopesArray = scope.split(" ");
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
    system: {
      loggerOptions: {
        logLevel: LogLevel.Trace,
        loggerCallback: (level: any, message: any, containsPii: any) => {
          if (containsPii) {
            return;
          }
          switch (level) {
            case LogLevel.Error:
              console.error(message);
              return;
            case LogLevel.Info:
              console.info(message);
              return;
            case LogLevel.Verbose:
              console.debug(message);
              return;
            case LogLevel.Warning:
              console.warn(message);
              return;
            default:
              console.log(message);
              return;
          }
        },
      },
    },
  };

  const msal = new PublicClientApplication(msalConfig);

  msal.initialize().then((res: any) => {
    let loginRequest = {
      scopes: scopesArray,
      redirectUri: window.location.origin + `/auth_end?clientId=` + clientId,
      loginHint: loginHint + "",
    };

    console.log("response", res);
    msal
      .loginRedirect(loginRequest)
      .then((res) => {
        console.log("res", res);
      })
      .catch((err) => {
        console.log("redirect err", err);
      });
  });

  return <>Auth Start</>;
};

export default TeamsLogin;
