import { PublicClientApplication } from "@azure/msal-browser";
import { app, authentication } from "@microsoft/teams-js";

const AuthEnd = () => {
  const clientId = sessionStorage.getItem("clientId");
  console.log("clientId", clientId);
  const msalConfig = {
    auth: {
      clientId: "c873c02f-c54c-4ef0-82f2-ca953957b0b7",
      authority:
        "https://login.microsoftonline.com/9d143c90-308b-45c4-926a-c972e2f01269",
      navigateToLoginRequestUrl: false,
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
    },
  };
  app.initialize().then(() => {
    app.getContext().then(() => {
      const msal = new PublicClientApplication(msalConfig);
      msal.initialize().then(() => {
        msal
          .handleRedirectPromise()
          .then((token) => {
            console.log("end token", token);

            if (token !== null) {
              authentication.notifySuccess(
                JSON.stringify({
                  sessionStorage: sessionStorage,
                })
              );
            } else {
              authentication.notifyFailure("Get empty response.");
            }
          })
          .catch((err) => {
            console.log("err token", err);
            authentication.notifyFailure(
              JSON.stringify({ sessionStorage: sessionStorage })
            );
          });
      });
    });
  });
  return <>Auth End</>;
};

export default AuthEnd;
