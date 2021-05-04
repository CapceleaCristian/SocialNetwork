import { useAuthContext } from "./context/authContext";
import "./App.css";
import { useApplicationRoutes } from "./routes";

function App() {
  const { isAuth, isLoading } = useAuthContext();
  const applicationRoutes = useApplicationRoutes(isAuth);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div className="App">{applicationRoutes}</div>;
}

export default App;
