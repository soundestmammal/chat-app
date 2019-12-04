import React, { Component } from 'react';
import axios from 'axios';
import "../styles/Login.css";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displayName: "",
            chatRoomName: "",
        }
    }

    handleNameChange = (e) => {
        this.setState({displayName: e.target.value});
        console.log(this.state.displayName);
    }

    handleChatChange = (e) => {
        this.setState({chatRoomName: e.target.value});
        console.log(this.state.chatRoomName);
    }

    handleSubmit = (e) => {
        alert(`A message was submitted:  ${this.state.value}`);
        this.generateMessageObject();
        e.preventDefault();
        this.setState({ value: "" });
    }

    render() {
        return (
            <div className="centered-form">
                <div className="centered-form__box">
                    <form action="/chat.html">
                        <label>Display Name</label>
                        <input type="text" name="username" placeholder="Display name" required autoComplete="off" value={ this.state.chatRoomName } onChange={ this.handleChatChange } />
                        <label>Room</label>
                        <input type="text" name="room" placeholder="Room" required autoComplete="off" />
                        <button>Join</button>
                    </form>  
                </div>       
            </div>
        );
    }
}

export default Login;