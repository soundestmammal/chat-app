import React, { Component } from 'react';
import Message from './Message';
import "../styles/chat.css";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: {},
            input: "",
            value: "",
            username: "Rob Che",
        }
    }

    generateMessageObject = () => {
        return {
            userName: this.state.userName,
            text: this.state.value,
            createdAt: new Date().getTime()
        }
    }

    // generateMessageComponent = (messageObj) => {
    //     return(
    //         <Message
    //             user={ messageObj.userName }
    //             text={ messageObj.text }
    //             createdAt={ messageObj.createdAt }
    //         />
    //     );
    // }

    generateMessageComponent = () => {
        return (
            <Message
                user={ this.state.username }
                text={ this.state.value }
                createdAt={ new Date().getTime() }
            />
        );
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
        console.log(this.state.value);
    }

    handleSubmit = (e) => {
        alert(`A message was submitted:  ${this.state.value}`);
        e.preventDefault();
    }

    render() {
        return(
            <div className="chat">
                <div className="chat__sidebar" id="sidebar">

                </div>
                <div className="chat__main">
                    <div id="messages" className="chat__messages">
                        { this.generateMessageComponent() }
                    </div>
                    <div className="compose">
                        <form id="message-form" onSubmit={this.handleSubmit}>
                            <input type="text" value={ this.state.value } onChange={this.handleChange} autoComplete="off"/>
                            <button>Send</button>
                        </form>
                    </div>
                    
                    <button id="send-location">Send Location</button>
                </div>
            </div>
        );
    }
}

export default Chat;