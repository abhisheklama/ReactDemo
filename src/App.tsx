import "./App.css";
import { useMsal } from "@azure/msal-react";
import { InteractionRequiredAuthError } from "@azure/msal-browser";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const { instance, inProgress, accounts } = useMsal();
  const [profile, setProfile] = useState<any>(null);
  const [ImgUrl, setImgUrl] = useState("");
  useEffect(() => {
    // Get access token for the first account
    if (inProgress == "none") {
      instance.setActiveAccount(accounts[0]);
      const accessTokenRequest = {
        scopes: ["User.read"], // Scopes required for your API
      };
      console.log("before token");
      instance
        .acquireTokenSilent(accessTokenRequest)
        .then((token) => {
          axios
            .get("https://graph.microsoft.com/v1.0/me", {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            })
            .then((res) => {
              console.log("profile", res);
              setProfile(res.data);
            });
          axios
            .get("https://graph.microsoft.com/v1.0/me/photo/$value", {
              headers: {
                Authorization: `Bearer ${token.accessToken}`,
              },
            })
            .then((res) => {
              console.log("photo", res);
              const base64Image = btoa(
                String.fromCharCode.apply(null, res.data)
              );

              const dataURI = `data:image/jpeg;base64,${base64Image}`;
              setImgUrl(dataURI);
            });
          // Do something with the tokenResponse
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
  }, [inProgress]);
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
