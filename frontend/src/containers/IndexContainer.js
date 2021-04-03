import React, { Component } from 'react';
import Contacts from '../components/contacts/Contacts'
import Alerts from '../components/alerts/Alerts'
import axios from 'axios'

class IndexContainer extends Component {
    // TODO: add spinner when fetching data
    state = {
        alerts: [],
        contacts: [],
        alertError: '',
        contactError: '',
        statusHash: {}
    }

    componentDidMount(){
        axios.get('http://localhost:3001/api/alerts')
            .then(response => {
                this.setState({ alerts: response.data })
            })
            .catch(error => {
                this.setState({ alertError: error.message })
            })

        axios.get('http://localhost:3001/api/contacts')
            .then(response => {
                this.setState({ contacts: response.data })
            })
            .catch(error => {
                this.setState({ contactError: error.message })
            })
    }

    render() {
        
        return (
            <div>
                <p>{this.state.alertError ? this.state.alertError : null}</p>
                <p>{this.state.contactError ? this.state.contactError : null}</p>
                <Contacts contacts={this.state.contacts} />
                <Alerts alerts={this.state.alerts} />
            </div>
        );
    }
}

export default IndexContainer;