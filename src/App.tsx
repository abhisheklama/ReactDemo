import "./App.css";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./main";
import {
  TeamsUserCredential,
  TeamsUserCredentialAuthConfig,
} from "@microsoft/teamsfx";
import axios from "axios";
import { OpenSingleChatRequest, chat } from "@microsoft/teams-js";

function App() {
  const [profile, setProfile] = useState<any>(null);
  const { token, setToken } = useContext(TokenContext);
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    console.log("token >>", token);
    if (!token) {
      const authConfig: TeamsUserCredentialAuthConfig = {
        clientId: "c873c02f-c54c-4ef0-82f2-ca953957b0b7",
        initiateLoginEndpoint: `${window.location.origin}/auth_start`,
      };

      const teamsUserCredential = new TeamsUserCredential(authConfig);
      teamsUserCredential
        .login(["User.Read"])
        .then(() => {
          let sessionToken = sessionStorage.getItem("accessToken");
          if (sessionToken) setToken(sessionToken);
        })
        .catch((err) => console.log("login - err >", err));
    } else {
      axios
        .get("https://graph.microsoft.com/v1.0/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setProfile(res.data);
          axios
            .get("https://graph.microsoft.com/v1.0/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) =>
              setUsers(
                res.data.value.filter(
                  (user: any) => user.id == profile.id && user.mail
                )
              )
            );
        });
    }
  }, []);

  return (
    <>
      {!profile ? (
        <h1>Demo App</h1>
      ) : (
        <Profile profile={profile} users={users} />
      )}
    </>
  );
}

const Profile = ({ profile, users }: { profile: any; users: any[] }) => {
  console.log("users >", users);
  const openUserChat = (id: string) => {
    let obj: OpenSingleChatRequest = {
      user: id,
    };
    chat.openChat(obj);
  };
  return (
    <>
      <h1>Welcome {profile.displayName}</h1>
      {users.map((user) => {
        return (
          <>
            {user.displayName}
            <button onClick={() => openUserChat(user.id)}> open chat</button>
          </>
        );
      })}
    </>
  );
};

export default App;
