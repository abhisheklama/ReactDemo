import "./App.css";
// import { useMsal } from "@azure/msal-react";
// import { InteractionRequiredAuthError } from "@azure/msal-browser";
// import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./main";
import {
  TeamsUserCredential,
  TeamsUserCredentialAuthConfig,
} from "@microsoft/teamsfx";

function App() {
  const [profile] = useState<any>(null);
  const [ImgUrl] = useState("");
  const tokenContext = useContext(TokenContext);
  console.log("tokenContext", tokenContext);
  useEffect(() => {
    if (tokenContext) {
      const authConfig: TeamsUserCredentialAuthConfig = {
        clientId: "c873c02f-c54c-4ef0-82f2-ca953957b0b7",
        initiateLoginEndpoint: `${window.location.origin}/auth_start`,
      };

      const teamsUserCredential = new TeamsUserCredential(authConfig);
      teamsUserCredential
        .login(["User.Read"])
        .then(() => {
          teamsUserCredential
            .getToken("Personal")
            .then((token) => console.log("token", token));
        })
        .catch((err) => console.log("login - err >", err));
    }
  }, []);
  return (
    <>
      {!profile ? (
        <h1>Demo App</h1>
      ) : (
        <Profile profile={profile} img={ImgUrl} />
      )}
    </>
  );
}

const Profile = ({ profile, img }: { profile: any; img: string }) => {
  return (
    <>
      <img src={img} />
      <h2>{profile.displayName}</h2>
      <p>{profile.mail}</p>
    </>
  );
};

export default App;
