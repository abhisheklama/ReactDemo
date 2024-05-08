import "./App.css";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./main";
import {
  TeamsUserCredential,
  TeamsUserCredentialAuthConfig,
} from "@microsoft/teamsfx";
import axios from "axios";

function App() {
  const [profile, setProfile] = useState<any>(null);
  const [token] = useContext(TokenContext);
  useEffect(() => {
    console.log("token >>", token.replace("\n", ""));
    if (!token) {
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
    } else {
      axios
        .get("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${token.replace("\n", "")}`,
          },
        })
        .then((res) => setProfile(res.data));
    }
  }, []);
  return <>{!profile ? <h1>Demo App</h1> : <Profile profile={profile} />}</>;
}

const Profile = ({ profile }: { profile: any }) => {
  return (
    <>
      <h2>Welcome {profile.displayName}</h2>
    </>
  );
};

export default App;
