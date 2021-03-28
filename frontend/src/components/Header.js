import React from 'react';
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';
import './Header.css';

function Header(props) {
  return (
    <header className='header'>
      <rux-global-status-bar
        class={`header__status-bar ${
          props.isDarkMode ? 'dark-theme' : 'light-theme'
        }`}
        appname='Rocket Communications Code Challenge'
      >
        <rux-button class='theme-select-button' onClick={props.onThemeSelect}>
          Dark Mode {props.isDarkMode ? 'On' : 'Off'}
        </rux-button>

        <rux-button class='sign-out-button' onClick={props.onSignOut}>
          Sign out
        </rux-button>
      </rux-global-status-bar>
    </header>
  );
}

export default Header;
