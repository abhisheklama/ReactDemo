import { Route, Routes } from "react-router-dom";
import "./App.css";
import TeamsLogin from "./components/TeamsLogin";
import Login from "./components/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
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
