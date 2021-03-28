import React from 'react';
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import './Header.css';

function Header(props) {
  return (
    <header className='header'>
      <rux-global-status-bar
        class='dark-theme'
        appname='Rocket Communications Code Challenge'
      >
        {/* <rux-clock></rux-clock> */}
        <rux-button class='sign-out-button' onClick={props.onSignOut}>
          Sign out
        </rux-button>
      </rux-global-status-bar>
    </header>
  );
}

export default Header;
