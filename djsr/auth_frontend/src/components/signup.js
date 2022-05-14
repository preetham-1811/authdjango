// djsr/frontend/src/components/signup.js
import React, { Component } from "react";
import axiosInstance from "../axiosApi"
axiosInstance.defaults.xsrfHeaderName = "X-CSRFToken";


class Signup extends Component{
    constructor(props){
        super(props);
        this.state = {
            username: "",
            first_name: "",
            last_name:"",
            password:""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmitWThen(event) {
        event.preventDefault();
        axiosInstance.post('/api/user/create/', {
                username: this.state.username,
                first_name: this.state.first_name,
                last_name: this.state.last_name,
                password: this.state.password
            }).then(
                result => {
                    axiosInstance.defaults.headers['Authorization'] = "JWT " + result.data.access;
                    localStorage.setItem('access_token', result.data.access);
                    localStorage.setItem('refresh_token', result.data.refresh);
                }
        ).catch (error => {
            throw error;
        })
    }

    render() {
        return (
            <div>
                Signup
                <form onSubmit={this.handleSubmitWThen}>
                    <label>
                        Username:
                        <input name="username" type="text" value={this.state.username} onChange={this.handleChange}/>
                    </label>
                    <label>
                        first_name:
                        <input name="first_name" type="text" value={this.state.first_name} onChange={this.handleChange}/>
                    </label>
                    <label>
                        last_name:
                        <input name="last_name" type="text" value={this.state.last_name} onChange={this.handleChange}/>
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
export default Signup;