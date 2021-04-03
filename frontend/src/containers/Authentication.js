import React, { Component } from 'react';
import axios from 'axios'

class Authentication extends Component {
    state = {
        isLoggedIn: false,
        email: '',
        password: '',
        toSignIn: false
    }

    handleLogInButton = (event) => {
        event.preventDefault();
        this.setState({ toSignIn: !this.state.toSignIn })
    }

    handleFormChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value})
    }

    handleFormSubmit = (event) => {
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        if(this.state.toSignIn){
            axios.post( 'http://localhost:3001/api/login', user )
                .then(response => {
                    console.log(response)
                })
                .catch(error => {
                    console.log(error)
                });
        } else {
            axios.post( 'http://localhost:3001/api/users', user )
                .then(response => {
                    console.log(response)
                } )
                .catch(error => {
                    console.log(error)
                } );
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleFormSubmit}>
                    <p>
                        <label>
                            Email:
                            <input 
                                type="email" 
                                placeholder="Email"
                                name="email"
                                onChange={this.handleFormChange} />
                        </label>
                    </p>
                    <p>
                        <label>
                            Password:
                            <input 
                                type="password" 
                                placeholder="Password"
                                name="password"
                                onChange={this.handleFormChange}/>
                        </label>
                    </p>
                    <button type="submit">{this.state.toSignIn ? "Log In" : "Sign Up"}</button>
                    <button onClick={this.handleLogInButton}>Switch To {this.state.toSignIn ? "Sign Up" : "Log In"}</button>
                </form>
            </div>
        );
    }
}

export default Authentication;