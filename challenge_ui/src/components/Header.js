import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { React } from 'react';
import { RuxGlobalStatusBar } from '@astrouxds/rux-global-status-bar/rux-global-status-bar.js';

function Header(props) {

    const CustomButton = withStyles((theme) => ({
        root: {
            backgroundColor: '#172635',
            color: 'white'
        }
    }))(Button); 

    return (
        <div className='row' style={styles.banner}>
            <rux-global-status-bar class='dark-theme' appname='Astro UI' version='0.1' />
            {props.children}
            {!props.username && <div className='row' style={{ backgroundColor: '#282c34', display: 'inline-flex' }}>
               <CustomButton
                    color='primary'
                    id='register'
                    onClick={(e) => props.action(e)}
                >
                    Register
                </CustomButton>
                <CustomButton 
                    color='primary'
                    id='login'
                    onClick={(e) => props.action(e)}
                >
                    Login
                </CustomButton>
            </div> }
        </div>
    );
};

const styles = {
    banner: {
        backgroundColor: '#172635',
        display: 'flex',
        justifyContent: 'space-between',
        paddingLeft: '20px',
        paddingRight: '20px'
    },
    header: {
        backgrounColor: '#282c34',
        color: 'white',
        float: 'right'
    },
    user: {
        color: '#61dafb',
        display: 'inline',
        float: 'left',
        fontSize: 11,
        paddingLeft: '10px'
    }
}

export default Header;