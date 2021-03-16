import React from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME} from '../../constants/constants';
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';

function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    let title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    if(props.location.pathname === '/') {
        title = 'Login'
    }
    function renderLogout() {
        if(props.location.pathname === '/dashboard'){
            return(
                <div className="ml-auto">
                    <button className="btn btn-danger" onClick={() => handleLogout()}>Logout</button>
                </div>
            )
        }
    }
    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN_NAME)
        props.history.push('/login')
    }
    return(
        <nav className="grid-zone grid-zone--header">
            <rux-global-status-bar appname={props.title || title}>
            {renderLogout()}
            </rux-global-status-bar>
        </nav>
    )
}
export default withRouter(Header);