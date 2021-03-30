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
        <div className='nav__button-container'>
          <rux-button
            class='nav__button nav__button_theme-select'
            onClick={props.onThemeSelect}
          >
            Dark Mode {props.isDarkMode ? 'On' : 'Off'}
          </rux-button>
          <rux-button
            class='nav__button nav__button_sign-out'
            onClick={props.onSignOut}
          >
            Sign out
          </rux-button>
        </div>
      </rux-global-status-bar>
    </header>
  );
}

export default Header;
