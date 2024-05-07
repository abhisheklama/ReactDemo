import "./App.css";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { TokenContext } from "./main";

function App() {
  const msal = useMsal();
  const { instance, inProgress, accounts } = msal;
  const [profile, setProfile] = useState<any>(null);
  const [ImgUrl, setImgUrl] = useState("");
  const tokenContext = useContext(TokenContext);
  console.log("tokenContext", tokenContext);
  useEffect(() => {
    console.log("msal", msal);
    // Get access token for the first account
    let token = localStorage.getItem("token");
    if (token) {
    } else {
      instance.loginPopup().then((res) => {
        console.log("res", res);
        if (inProgress == "none") {
          instance.setActiveAccount(accounts[0]);
          const accessTokenRequest = {
            scopes: ["User.read"], // Scopes required for your API
          };
          console.log("before token");
          instance
            .acquireTokenSilent(accessTokenRequest)
            .then((token) => {
              let [GlobalTOken, setToken] = tokenContext;
              setToken(token.accessToken);
              axios
                .get("https://graph.microsoft.com/v1.0/me", {
                  headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                  },
                })
                .then((res) => {
                  console.log("profile", res, GlobalTOken);
                  setProfile(res.data);
                });
              axios
                .get("https://graph.microsoft.com/v1.0/me/photo/$value", {
                  headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                  },
                })
                .then(async (res) => {
                  console.log("photo", res);
                  const responseBlob = await res.data.blob();

                  const dataURI = URL.createObjectURL(responseBlob);
                  setImgUrl(dataURI);
                });

              axios
                .get("https://graph.microsoft.com/v1.0/users", {
                  headers: {
                    Authorization: `Bearer ${token.accessToken}`,
                  },
                })
                .then(async (res) => {
                  console.log("users", res);
                });
            })
            .catch(async (error) => {
              if (error instanceof InteractionRequiredAuthError) {
                // fallback to interaction when silent call fails
                let token = instance.acquireTokenPopup(accessTokenRequest);
                console.log("token popup", token);
              }
              console.log("error", error);
              // handle other errors
            });
        }
      });
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
