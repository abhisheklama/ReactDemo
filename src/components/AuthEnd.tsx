import { PublicClientApplication } from "@azure/msal-browser";

const AuthEnd = () => {
  const clientId = sessionStorage.getItem("clientId");
  console.log("clientId", clientId);
  const msalConfig = {
    auth: {
      clientId: clientId + "",
      authority:
        "https://login.microsoftonline.com/9d143c90-308b-45c4-926a-c972e2f01269",
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
    },
  };

  const msal = new PublicClientApplication(msalConfig);
  msal.initialize().then(() => {
    msal
      .handleRedirectPromise()
      .then((token) => {
        console.log("end token", token);
        localStorage.setItem("token", JSON.stringify(token));
      })
      .catch((err) => console.log("err token", err));
  });
  return <>Auth End</>;
};

export default AuthEnd;
