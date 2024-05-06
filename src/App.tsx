import { Route, Routes } from "react-router-dom";
import "./App.css";
import TeamsLogin from "./components/TeamsLogin";
import Login from "./components/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/about" element={<About />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;

const Home = () => {
  return (
    <>
      <h1>Demo App</h1>
      <TeamsLogin />
    </>
  );
};

const About = () => {
  return <h1>ABout</h1>;
};

const NotFound = () => {
  return <h1>Page Not Found</h1>;
};
