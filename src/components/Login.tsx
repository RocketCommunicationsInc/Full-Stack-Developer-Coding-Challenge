import React, { Component } from 'react';
import '../App.css';
import Services from '../services/services';
import RegisterResponse from '../model/RegisterResponse';
import AstroButton from './astro/AstroButton';
import AstroNotification from './astro/AstroNotification';

enum Message {
  None, Invalid, Existing, Created, Empty
}

interface LocalState {
  username: string;
  password: string;
  message: Message
}

interface LoginProps {
  onLogin: (string) => void
}

class Login extends Component<LoginProps, LocalState> {
  state = {
    username: "",
    password: "",
    message: Message.None
  };

  setUsername = (event) => {
    let value = event.target.value;
    this.setState({
      username: value
    });
  };

  setPassword = (event) => {
    let value = event.target.value;
    this.setState({
      password: value
    });
  };

  verifyAccount = () => {
    if(this.state.username === "" || this.state.password === ""){
      this.setState({
        message: Message.Empty
      });
    } else {
      Services.verifyAccount(this.state.username, this.state.password).then((verified: string) => {

        if(verified === "True"){
          this.props.onLogin(this.state.username)
        } else {
          this.setState({
            message: Message.Invalid
          });
        }
      });
    }
  };

  onKeyPress = (event) => {
    if(event.keyCode === 13){
      this.verifyAccount()
    }
  };

  addAccount = () => {
    if(this.state.username === "" || this.state.password === ""){
      this.setState({
        message: Message.Empty
      });
    } else {
      Services.addAccount(this.state.username, this.state.password).then((rr: RegisterResponse) => {
        if(rr.exists){
          this.setState({
            message: Message.Existing
          });
        } else {
          this.setState({
            message: Message.Created
          });
        }
      });
    }
  };

  clearMessage = () => {
    this.setState({
      message: Message.None
    });
  };

  render(){
   
    return (
      <div className="login">
        {this.state.message === Message.Invalid && <AstroNotification opened={true} message = "Account/Password not recognized" target = "" onclick={this.clearMessage}/>}
        {this.state.message === Message.Existing && <AstroNotification opened={true} message = "Account already exists" target = "" onclick={this.clearMessage}/>}
        {this.state.message === Message.Created && <AstroNotification opened={true} message = "Account successfully created" target = "" onclick={this.clearMessage}/>}
        {this.state.message === Message.Empty && <AstroNotification opened={true} message = "Username and Password must not be empty" target = "" onclick={this.clearMessage}/>}
        {/* <AstroNotification opened={this.state.message == Message.Invalid} message = "Account not recognized" target = ""/>
        <AstroNotification opened={this.state.message == Message.Existing} message = "Account already exists" target = ""/>
        <AstroNotification opened={this.state.message == Message.Created} message = "Account successfully created" target = ""/> */}

        <h1>User Login</h1>
        Username: <input value={this.state.username} onChange={this.setUsername}/>
        <br/><br/>
        Password: <input value={this.state.password} onChange={this.setPassword} onKeyDown={this.onKeyPress} type="password"/>
        <br/><br/>
        <AstroButton innerText = "Login" onclick={this.verifyAccount}/>
        <br/><br/>
        <AstroButton innerText = "Register New Account" onclick={this.addAccount}/>
      </div>

    );
  }
}

export default Login
