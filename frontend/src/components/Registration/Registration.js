
import React, {useState} from 'react';
import qs from 'qs';
import axios from 'axios';
import { withRouter } from "react-router-dom";
import {API_BASE_URL, ACCESS_TOKEN_NAME} from '../../constants/constants';

function Registration(props) {
    
    const [state , setState] = useState({
        email : "",
        password : "",
        confirmPassword: "",
        message: null
    })
    const handleChange = (e) => {
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }
    const submitToServer = () => {
        if(state.email.length && state.password.length) {
            props.showError(null);
            const payload={
                "email":state.email,
                "password":state.password,
            }
            axios.post(API_BASE_URL+'/auth/register', payload)
                .then(function (response) {
                    if(response.status === 200 || response.status === 201){
                        setState(prevState => ({
                            ...prevState,
                            'successMessage' : 'Registration successful. Redirecting to home page..'
                        }))
                        //get token and login

                        const formData = qs.stringify({
                            "username":state.email,
                            "password":state.password,
                        });
                        const config = {
                            headers: {
                                'Content-Type': 'application/x-www-form-urlencoded'
                            }
                        }
                        axios.post(API_BASE_URL+'/auth/login', formData, config)
                            .then(function (response) {
                                if(response.status === 200){
                                    setState(prevState => ({
                                        ...prevState,
                                        'successMessage' : 'Registration successful. Redirecting to home page..'
                                    }))
                                    console.log('token',response);
                                    localStorage.setItem(ACCESS_TOKEN_NAME,response.data.access_token);
                                    redirectToDashboard();
                                    props.showError(null)
                                }
                                else if(response.code === 204 ){
                                    props.showError("Username and password do not match");
                                }
                                else{
                                    props.showError("Username does not exists");
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                                redirectToLogin();
                                props.showError("There was an error please try again");
                            });
                    } else{
                        props.showError("Some error ocurred");
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });    
        } else {
            props.showError('Please enter valid username and password')    
        }
        
    }
    const redirectToDashboard = () => {
        props.updateTitle('Dashboard')
        props.history.push('/dashboard');
    }
    const redirectToLogin = () => {
        props.updateTitle('Login')
        props.history.push('/login'); 
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
        if(state.password === state.confirmPassword) {
            submitToServer()    
        } else {
            props.showError('Passwords do not match');
        }
    }
    return(
        <div className="card col-12 col-lg-4 login-card mt-5 hv-center">
            <form>
                <div className="form-group text-left">
                <label htmlFor="exampleInputEmail1">Email address</label>
                <input type="email" 
                       className="form-control" 
                       id="email" 
                       aria-describedby="emailHelp" 
                       placeholder="Enter email" 
                       value={state.email}
                       onChange={handleChange}
                />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="password" 
                        placeholder="Password"
                        value={state.password}
                        onChange={handleChange} 
                    />
                </div>
                <div className="form-group text-left">
                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                    <input type="password" 
                        className="form-control" 
                        id="confirmPassword" 
                        placeholder="Confirm Password"
                        value={state.confirmPassword}
                        onChange={handleChange} 
                    />
                </div>
                <button 
                    type="submit" 
                    className="rux-button"
                    onClick={handleSubmitClick}
                >
                    Register
                </button>
            </form>
            <div className="alert alert-success mt-3" style={{display: state.successMessage ? 'block' : 'none' }} role="alert">
                {state.successMessage}
            </div>
            <div className="registerMessage">
                <span>Already have an account? </span>
                <span className="loginText" onClick={() => redirectToLogin()}>Login here</span> 
            </div>
            
        </div>
    )
}
export default withRouter(Registration);