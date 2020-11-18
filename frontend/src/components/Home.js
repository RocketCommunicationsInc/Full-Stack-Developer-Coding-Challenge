import React from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
import Dashboard from './Dashboard'
import { ReactComponent as AstroLogo } from "../static/img/astro-logo-small-dark.svg";
import { RuxClock } from '@astrouxds/rux-clock/rux-clock.js';
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import { RuxStatus } from '@astrouxds/rux-status/rux-status.js';
import Starfield from './Starfield'


const Home = (props) => {
const handleClick = () => {
    axios.delete('http://localhost:3001/logout', {withCredentials: true})
    .then(response => {
      props.handleLogout()
      props.history.push('/')
    })
    .catch(error => console.log(error))
  }
return (
   
    <div className="home">
          <rux-global-status-bar appname="Astro App" class="light-theme">
             { 
               props.loggedInStatus ? <rux-status status="normal"></rux-status> : <rux-status status="critical"></rux-status>
              }
             { 
               props.loggedInStatus ? <button class="rux-button"><Link style={{color: "white"}} to='/logout' onClick={handleClick}>Log Out</Link></button> : <Link style={{color: "white"}} to='/login'>Log In</Link>
             }
             { 
               props.loggedInStatus ? null : <Link style={{color: "white"}} to='/signup'>Sign Up</Link>
             }
              <AstroLogo />
              <rux-clock timezone='America/Los_Angeles' hideDate ></rux-clock>
          </rux-global-status-bar>
      <br></br>
      { 
        props.loggedInStatus ? <Dashboard /> : <Starfield />
      }
       { 
        props.loggedInStatus ? null : <h1 className= "title">Welcome to the Astro App! Please log in or sign up to view your Dashboard.</h1>
      }

    </div>
  );
};
export default Home;