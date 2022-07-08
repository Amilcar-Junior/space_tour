import { BrowserRouter, Route, Switch } from "react-router-dom";
import {
  Header,
  Home,
  Destination,
  Crew,
  Home2,
  Technology,
  Error,
} from "./components";
import PrivateRoute from "./containers/PrivateRoute";
import PublicRoute from "./containers/PublicRouter";
import NotFound from "./containers/NotFound";
import ConnectPage from "./containers/ConnectPage";
import AuthPage from "./containers/AuthPage";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <Switch>
        <PublicRoute exact path="/" component={Home} />

        <PublicRoute path="/auth/:authType/:id?" component={AuthPage} />
        <PublicRoute path="/connect/:provider" component={ConnectPage} />

        <PrivateRoute path="/destination" component={Destination} />
        <PrivateRoute path="/crew" component={Crew} />
        <PrivateRoute path="/technology" component={Technology} />
        <PrivateRoute path="/crew" component={Crew} />
        <PrivateRoute path="/home" component={Home2} />
        <NotFound exact path="*" component={Error} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
