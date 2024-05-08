import { pages } from "@microsoft/teams-js";

const About = () => {
  const openHomePage = () => {
    pages.currentApp.navigateTo({ pageId: "index0" });
  };
  return (
    <div>
      <h1>About</h1>
      <button onClick={() => openHomePage()}>back to Home</button>
    </div>
  );
};

export default About;
