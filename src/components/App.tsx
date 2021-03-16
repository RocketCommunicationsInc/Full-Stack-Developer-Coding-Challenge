import React, { Component } from 'react';
import '../App.css';
import Services from '../services/services';
import Dashboard from './Dashboard';
import Login from './Login';
import Contact from '../model/Contact';
import Alert from '../model/Alert';
import { FaDog } from 'react-icons/fa';
import AstroButton from './astro/AstroButton';

interface LocalState {
  contacts: Contact[],
  alerts: Alert[],
  login: boolean,
  states: Set<string>,
  user: string | null
}

interface AppProps {}

class App extends Component<AppProps, LocalState> {
  state = {
    login: true,
    contacts: [],
    alerts: [],
    states: new Set<string>(),
    user: null
  };

  componentDidMount(){
    Services.getContacts().then((contacts: Contact[]) => {
      let states = contacts.map((c: Contact) => c.contactState);
      this.setState({
        contacts: contacts,
        states: new Set(states)
      });
    });

    Services.getAlerts().then((alerts: Alert[]) => {
      this.setState({
        alerts: alerts
      });
    });
  }

  onLogin = (username: string) => {
    this.setState({
      login: false,
      user: username
    });
  };

  onLogout = () => {
    this.setState({
      login: true
    });
  };

  render(){

    return (
      <div className="background"style={{height: "100vh"}}>
        <div className="headbar">
          <h1>
            <FaDog size={50} style={{float: "left"}}/>
            <FaDog size={50} style={{paddingRight: "20px"}}/>
            Rocket Alert App
            <FaDog size={50} style={{paddingLeft: "20px"}}/>
            <FaDog size={50}  style={{float: "right"}}/>
          </h1>
          {!this.state.login && 
            <div  style={{float: "left"}}>
              <AstroButton innerText = "Logout" onclick={this.onLogout}/>
              <span style={{marginLeft: "20px"}}>Welcome, {this.state.user}</span>
            </div>
          }
          <br/>
        </div>
        <div>
          {!this.state.login && <Dashboard
            alerts = {this.state.alerts}
            contacts = {this.state.contacts}
            states = {this.state.states}
          />}
          {this.state.login && <Login
            onLogin = {this.onLogin}
          />}
        </div>
      </div>
    );
  }
}

export default App
