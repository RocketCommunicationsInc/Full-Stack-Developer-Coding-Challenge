import React from 'react';

const AlertRowItem = (props) => {
    const message = props.alert.errorMessage
    const category = props.alert.errorCategory
    const time = props.alert.errorTime
    return (
        <React.Fragment>
            <tr>
                <td>{message}</td>
                <td>{category}</td>
                <td>{time}</td>
            </tr>
        </React.Fragment>
    );
};

export default AlertRowItem;