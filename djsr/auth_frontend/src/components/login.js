// djsr/frontend/src/components/login.js

import React, { Component } from "react";
import axiosInstance from "../axiosApi";
axiosInstance.defaults.xsrfHeaderName = "X-CSRFToken";


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmitWThen(event){
        event.preventDefault();
        axiosInstance.post(
            '/api/token/obtain/', 
            {
                username: this.state.username,
                password: this.state.password
            }
            ).then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                    console.log(result.data)
                }
        ).catch (error => {
            throw error;
        })
    }

    render() {
        return (
            <div>
                Login
                <form onSubmit={this.handleSubmitWThen}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Password:
                        <input name="password" type="password" value={this.state.password} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default Login;