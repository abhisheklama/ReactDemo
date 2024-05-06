import {
  TeamsUserCredentialAuthConfig,
  TeamsUserCredential,
} from "@microsoft/teamsfx";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

import { useEffect } from "react";

const TeamsLogin = () => {
  useEffect(() => {
    const authConfig: TeamsUserCredentialAuthConfig = {
      clientId: "xxx",
      initiateLoginEndpoint: "https://react-demo-pied.vercel.app/login",
    };

    const teamsUserCredential = new TeamsUserCredential(authConfig);
    console.log("teamsUserCredential", teamsUserCredential);

    teamsUserCredential
      .login("User.Read")
      .then(() => {
        console.log("fetching  token...");
        teamsUserCredential
          .getToken("Personal")
          .then((tokenResponse) => {
            console.log("ss", tokenResponse);
            console.log("inside login fn!");

            const authProvider = new TokenCredentialAuthenticationProvider(
              teamsUserCredential,
              {
                scopes: ["User.Read"],
              }
            );
            console.log("authProvider", authProvider);

            const graphClient = Client.initWithMiddleware({
              authProvider: authProvider,
            });
            graphClient
              .api("/me")
              .get()
              .then((profile) => {
                console.log(profile);
              });
          })
          .catch((err) => console.log("token err", err));
      })
      .catch((err) => console.log("login err", err));
  }, []);
  return <div>Teams</div>;
};

export default TeamsLogin;
