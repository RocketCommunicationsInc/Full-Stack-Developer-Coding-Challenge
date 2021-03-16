import React,{ useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { ACCESS_TOKEN_NAME, API_BASE_URL } from '../../constants/constants';
import axios from 'axios'
import Alerts from "../Alerts/Alerts";
import Contacts from "../Contacts/Contacts";

function Dashboard(props) {
    useEffect(() => {
        axios.get(API_BASE_URL+'/users/me', { headers: { 'Authorization': 'Bearer ' + localStorage.getItem(ACCESS_TOKEN_NAME) }})
        .then(function (response) {
            if(response.status !== 200){
              redirectToLogin()
            }
        })
        .catch(function (error) {
            console.log('Dashboard error' ,error);
          redirectToLogin()
        });
      })
    function redirectToLogin() {
        props.history.push('/login');
    }
    return(
        <div className="mt-3 data-contain">
            <Alerts />
            <Contacts />
        </div>
    )
}

export default withRouter(Dashboard);