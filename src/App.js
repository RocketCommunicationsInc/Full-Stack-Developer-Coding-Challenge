// import "./astroCss/css/astro.css";
import { Route, Switch } from "react-router-dom";
import { LandingPage } from "./components/loginRegister/LandingPage";
import { MainPage } from "./components/Main/MainPage";

function App() {
  return (
    <div className="app-grid">
      <Switch>
        <Route exact path={"/"} component={LandingPage} exact />
        <Route exact path={"/main"} component={MainPage} exact />
      </Switch>
    </div>
  );
}

export default App;
