import { RuxButton, RuxGlobalStatusBar } from "@astrouxds/react";
import { useAuth } from "./Auth";
const NavBar = () => {
  const {authed: username, logout} = useAuth();
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <RuxGlobalStatusBar
        appDomain="Mike's"
        appName="cool dashboard"
        appState="online"
        appVersion="0.0.1"
        username={username ? `Welcome, ${username}` : ""}
      >
        { username !== '' ? <RuxButton slot="right-side" onClick={logout}>Logout</RuxButton> : <></>}
      </RuxGlobalStatusBar>
    </div>
  );
};

export default NavBar;