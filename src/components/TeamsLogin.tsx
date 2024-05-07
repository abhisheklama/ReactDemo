import { useSearchParams } from "react-router-dom";

const TeamsLogin = () => {
  const query = useSearchParams();
  console.log("query", query);
  // const msalConfig = {
  //   auth: {
  //     clientId: "c873c02f-c54c-4ef0-82f2-ca953957b0b7",
  //     authority:
  //       "https://login.microsoftonline.com/9d143c90-308b-45c4-926a-c972e2f01269",
  //     redirectUri: "https://react-demo-pied.vercel.app/", // Update with your redirect URI
  //   },
  //   cache: {
  //     cacheLocation: "sessionStorage", // This configures where your cache will be stored
  //     storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
  //   },
  // };

  return <>Login</>;
};

export default TeamsLogin;
