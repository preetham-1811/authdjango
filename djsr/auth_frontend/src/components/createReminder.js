// djsr/frontend/src/components/login.js

import React, { Component } from "react";
import axiosInstance from "../axiosApi";


class CreateReminder extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "", 
            description: "", 
            done: false, 
            editors: [], 
            viewers: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitWThen = this.handleSubmitWThen.bind(this);
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmitWThen(event){
        event.preventDefault();
        axiosInstance.post('/reminder_create/', {
                title: this.state.title,
                description: this.state.description,
                done: this.state.done,
                editors: JSON.parse(this.state.editors),
                viewers: JSON.parse(this.state.viewers)
            }).then(
                result => {
                    console.log("Response: " + result.data)
                }
        ).catch (error => {
            throw error;
        })
    }

    render() {
        return (
            <div>
                CreateReminder
                <form onSubmit={this.handleSubmitWThen}>
                    <label>
                        Title:
                        <input name="title" type="text" value={this.state.title} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Description:
                        <input name="description" type="text" value={this.state.description} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Done:
                        <input name="done" type="text" value={this.state.done} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Editors:
                        <input name="editors" type="text" value={this.state.editors} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Viewers:
                        <input name="viewers" type="text" value={this.state.viewers} onChange={this.handleChange}/>
                    </label>
                    <input type="submit" value="Submit"/>
                </form>
            </div>
        )
    }
}
export default CreateReminder;