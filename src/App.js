import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import signIn from "./pages/signIn";
import signUp from "./pages/signUp";
import { main } from "./pages/main";
import path from "path";
import dotenv from "dotenv";

import { UserContextProvider } from "./context/UserContext";

function App() {

  dotenv.config();
  const defaultEnv = "local";
  const envPath = path.resolve(process.cwd(), `.env.${defaultEnv}`);
  dotenv.config({ path: envPath });

  return (
    <UserContextProvider>
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              UserContextProvider.isSigned ? (
                <Redirect to="/main" />
              ) : (
                <Redirect to="/signin" />
              )
            }
          />
          <Route exact path="/signin" component={signIn} />
          <Route exact path="/signup" component={signUp} />
          <Route exact path="/main" component={main} />
        </Switch>
      </Router>
    </UserContextProvider>
  );
}

export default App;
