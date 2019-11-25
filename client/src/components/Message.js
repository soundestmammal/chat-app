import React from 'react';
import "../styles/message.css";

const Message = (props) => {
    return(
        <div class="message">
                <p>
                    <span class="message__name">Robert</span>
                    <span class="message__meta">Created Now</span>
                </p>
                <p>This is the body of the message!!!</p>
        </div>
    );
}

export default Message;