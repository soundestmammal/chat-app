import React, { Component } from 'react';
import Message from './Message';
import Sidebar from './Sidebar';
import "../styles/chat.css";

class Chat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            input: "",
            value: "",
            username: "Rob Che",
            members: ["Alpha", "Beta", "Gamma"]
        }
    }

    generateMessageObject = () => {

       const messageObj = {
            userName: this.state.username,
            text: this.state.value,
            createdAt: new Date().getTime()
        }

        const copyMessages = this.state.messages;

        copyMessages.push(messageObj);

        this.setState({messages: copyMessages })

        // After I set the State, I want to call the socket.io funciton....

        // I want to emit the message to all appropriate parties.

        // 
        console.log(this.state.messages);
    }

    // I am going to also need to fetch changes to the database.
    
    // But how does that work with socket.io?

    // It shouldn't change anything really...

    // generateMessageComponent = (messageObj) => {
    //     return(
    //         <Message
    //             user={ messageObj.userName }
    //             text={ messageObj.text }
    //             createdAt={ messageObj.createdAt }
    //         />
    //     );
    // }

    // generateMessageComponent = () => {
    //     return (
    //         <Message
    //             user={ this.state.username }
    //             text={ this.state.value }
    //             createdAt={ new Date().getTime() }
    //         />
    //     );
    // }

    handleChange = (e) => {
        this.setState({value: e.target.value});
        console.log(this.state.value);
    }

    handleSubmit = (e) => {
        alert(`A message was submitted:  ${this.state.value}`);
        this.generateMessageObject();
        e.preventDefault();
    }

    renderList = () => {
        const messages = this.state.messages.map((message) => {
            return ( 
                <Message 
                    user={ message.userName }
                    text={ message.text }
                    createdAt={ message.createdAt }
                /> 
            );
        });
        console.log("Does this show up?")
        return messages;
    }

    render() {
        return(
            <div className="chat">
                <div className="chat__sidebar" id="sidebar">
                    <Sidebar 
                        users={this.state.members}
                    />
                </div>
                <div className="chat__main">
                    <div id="messages" className="chat__messages">
                        {this.renderList()}
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