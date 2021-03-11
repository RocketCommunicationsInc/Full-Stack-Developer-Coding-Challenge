import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AirplanemodeActiveIcon from '@material-ui/icons/AirplanemodeActive';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';

function Overview(props) {
    const styles = {
        icon: {
            paddingRight: '10px'
        },
        item: {
            alignItems: 'center',
            display: 'flex',
            color: 'white',
            justifyContent: 'center'
        },
        mainRow: {
            backgroundColor: '#282c34',
            display: 'flex',
            justifyContent: 'space-evenly',
            minWidth: '300px',
            paddingTop: '10px'
        },
        overview: {
            display: 'inline-flex',
            justifyContent: 'space-evenly',
            minWidth: '300px',
            width: '35%'
        }
    }

    return (
        <div className='row' style={styles.mainRow}>
            <div style={styles.overview}>
                <div style={styles.item}><MonetizationOnIcon style={styles.icon} /> {props.user.credits}</div>
                <div style={styles.item}><AirplanemodeActiveIcon style={styles.icon} />{props.user.ships.length || 0}</div>
                <div style={styles.item}><AccountBalanceIcon style={styles.icon}/>{props.user.loans.length || 0}</div>
            </div>
        </div>
    )
}

export default Overview;