import React, { Component } from 'react';

class Chat extends Component {
    render() {
        return(
            <div className="chat">
                <div class="chat__sidebar" id="sidebar">

                </div>
                <div className="chat__main">
                    <div id="messages" className="chat__messages">
                    
                    </div>
                    <div className="compose">
                        <form id="message-form">
                            <input name="message" placeholder="Message" required autocomplete="off" />
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