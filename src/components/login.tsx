import { useSearchParams } from "react-router-dom";

const Login = () => {
  const [query] = useSearchParams();
  console.log("query", query);
  return <div>Login</div>;
};

export default Login;
