import React from 'react';
import "../styles/message.css";

const Message = (props) => {
    return(
        <div className="message">
                <p>
                    <span className="message__name">{ props.user }</span>
                    <span className="message__meta">{ props.createdAt }</span>
                </p>
                <p>{props.text}</p>
        </div>
    );
}

export default Message;