import { Switch, Route, Redirect } from "react-router-dom";
import { LoginPage, RegisterPage, ProfilePage } from "../pages";

const notAuthRoutes = [
  { path: "/login", component: LoginPage, exact: true },
  { path: "/register", component: RegisterPage, exact: true }
];
const publicRoutes = [];
const privateRoutes = [
  { path: "/profile", component: ProfilePage, exact: true }
];

export function useApplicationRoutes(isAuth) {
  return (
    <Switch>
      {!isAuth
        ? notAuthRoutes.map((route) => <Route key={route.path} {...route} />)
        : privateRoutes.map((route) => <Route key={route.path} {...route} />)}
      <Redirect to="/" />
    </Switch>
  );
}
