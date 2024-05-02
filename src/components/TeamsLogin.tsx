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
      clientId: "c873c02f-c54c-4ef0-82f2-ca953957b0b7",
      initiateLoginEndpoint:
        "https://login.microsoftonline.com/9d143c90-308b-45c4-926a-c972e2f01269/oauth2/v2.0/authorize",
    };

    const teamsUserCredential = new TeamsUserCredential(authConfig);
    const authProvider = new TokenCredentialAuthenticationProvider(
      teamsUserCredential,
      {
        scopes: ["User.Read"],
      }
    );
    const graphClient = Client.initWithMiddleware({
      authProvider: authProvider,
    });
    graphClient
      .api("/me")
      .get()
      .then((profile) => {
        console.log(profile);
      });
  }, []);
  return <div>Teams</div>;
};

export default TeamsLogin;
