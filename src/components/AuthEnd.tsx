import { PublicClientApplication } from "@azure/msal-browser";
// import { useSearchParams } from "react-router-dom";

const AuthEnd = () => {
  //   const [query] = useSearchParams();
  //   console.log("query", query);
  //   const clientId = query.get("clientId");
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

  const msal = new PublicClientApplication(msalConfig);
  msal.initialize().then(() => {
    msal
      .handleRedirectPromise()
      .then((token) => console.log("end token", token))
      .catch((err) => console.log("err token", err));
  });
  return <>Auth End</>;
};

export default AuthEnd;
