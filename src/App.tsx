import "./App.css";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./main";
import {
  TeamsUserCredential,
  TeamsUserCredentialAuthConfig,
} from "@microsoft/teamsfx";
import axios from "axios";
import { OpenSingleChatRequest, call, chat } from "@microsoft/teams-js";

function App() {
  const [profile, setProfile] = useState<any>(null);
  const { token, setToken } = useContext(TokenContext);
  const [users, setUsers] = useState<any[]>([]);
  console.log("token >>", token);
  useEffect(() => {
    if (token == "null" || !token) {
      const authConfig: TeamsUserCredentialAuthConfig = {
        clientId: "c873c02f-c54c-4ef0-82f2-ca953957b0b7",
        initiateLoginEndpoint: `${window.location.origin}/auth_start`,
      };

      const teamsUserCredential = new TeamsUserCredential(authConfig);
      teamsUserCredential
        .login(["User.Read"])
        .then(() => {
          let sessionToken = sessionStorage.getItem("accessToken");
          console.log("sessionToken", sessionToken);
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
        .then((data) => {
          axios
            .get("https://graph.microsoft.com/v1.0/users", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res: any) => {
              console.log("users res", res);
              setProfile(data.data);
              setUsers(
                res.data.value.filter(
                  (user: any) => user.id != data.data.id && user.mail
                )
              );
            });
        });
    }
  }, [token]);

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
  const openUserChat = (mail: string) => {
    let obj: OpenSingleChatRequest = {
      user: mail,
    };
    chat.openChat(obj);
  };

  const startVideoCall = (mail: string) => {
    let params: call.StartCallParams = {
      targets: [mail],
      requestedModalities: [call.CallModalities.Video],
    };
    call.startCall(params);
  };
  return (
    <>
      <h1>Welcome {profile.displayName}</h1>
      {users.map((user) => {
        return (
          <>
            {user.displayName}
            <button onClick={() => openUserChat(user.mail)}> open chat</button>
            <button onClick={() => startVideoCall(user.mail)}>
              {" "}
              Start Video Call
            </button>
          </>
        );
      })}
    </>
  );
};

export default App;
