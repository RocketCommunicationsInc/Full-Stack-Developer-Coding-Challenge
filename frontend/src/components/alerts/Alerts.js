import React from 'react';
import AlertRowItem from './AlertRowItem'

const Alerts = (props) => {
    // TODO: allow sorting
    return (
        <div>
            <h1>Alerts</h1>
            <table className="alerts-table">
                <thead>
                    <tr>
                        <th>Message</th>
                        <th>Category</th>
                        <th>Time</th>
                    </tr>
                </thead>
                <tbody>
                    {props.alerts.map(alert => {
                        return <AlertRowItem alert={alert}/>
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Alerts;