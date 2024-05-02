import {
  TeamsUserCredentialAuthConfig,
  TeamsUserCredential,
  TeamsBotSsoPrompt,
} from "@microsoft/teamsfx";
import { Client } from "@microsoft/microsoft-graph-client";
import { TokenCredentialAuthenticationProvider } from "@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials";

import { useEffect } from "react";

const TeamsLogin = () => {
  useEffect(() => {
    const authConfig: TeamsUserCredentialAuthConfig = {
      clientId: "c873c02f-c54c-4ef0-82f2-ca953957b0b7",
      initiateLoginEndpoint:
        "https://login.microsoftonline.com/9d143c90-308b-45c4-926a-c972e2f01269/oauth2/authorize",
    };

    const teamsUserCredential = new TeamsUserCredential(authConfig);
    console.log("teamsUserCredential", teamsUserCredential);
    const authProvider = new TokenCredentialAuthenticationProvider(
      teamsUserCredential,
      {
        scopes: ["User.Read"],
      }
    );
    console.log("authProvider", authProvider);
    teamsUserCredential
      .login(["User.Read"])
      .then(() => {
        console.log("fetching  token...");
        teamsUserCredential
          .getToken("Personal")
          .then((tokenResponse) => {
            console.log("ss", tokenResponse);
            console.log("before login!");
            console.log("inside login fn!");

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
          .catch((err) => console.log("login err", err));
      })
      .catch((err) => console.log("token err", err));
  }, []);
  return <div>Teams</div>;
};

export default TeamsLogin;
