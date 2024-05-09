import "./App.css";
import { useContext, useEffect, useState } from "react";
import { TokenContext } from "./main";
import {
  TeamsUserCredential,
  TeamsUserCredentialAuthConfig,
} from "@microsoft/teamsfx";
import axios from "axios";
import { OpenSingleChatRequest, call, chat, pages } from "@microsoft/teams-js";

function App() {
  const [profile, setProfile] = useState<any>(null);
  const { token, setToken } = useContext(TokenContext);
  const [users, setUsers] = useState<any[]>([]);
  useEffect(() => {
    if (token == "null" || !token) {
      alert("no token found redirecting to authenticate");
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
          if (sessionToken)
            setToken(sessionToken.replace("\n", "").replace(/"/g, ""));
        })
        .catch((err) => {
          alert(err);
          console.log("login - err >", err);
        });
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
              setProfile(data.data);
              setUsers(
                res.data.value.filter(
                  (user: any) => user.id != data.data.id && user.mail
                )
              );
            });
        })
        .catch((err) => {
          console.log("err", err);
          if (err.response.data.error.code == "InvalidAuthenticationToken")
            setToken("null");
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

  const openAboutPage = () => {
    pages.currentApp.navigateTo({ pageId: "index1" });
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
      <button onClick={() => openAboutPage()}>go to About</button>
    </>
  );
};

export default App;
