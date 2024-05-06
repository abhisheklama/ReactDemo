import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;

const Home = () => {
  return (
    <>
      <h1>Demo App</h1>
      <Login />
    </>
  );
};
