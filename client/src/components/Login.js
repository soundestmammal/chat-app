import React, { Component } from 'react';
import "../styles/Login.css";

class Login extends Component {
    render() {
        return (
            <div className="centered-form">
                <div className="centered-form__box">
                    <form action="/chat.html">
                        <label>Display Name</label>
                        <input type="text" name="username" placeholder="Display name" required autocomplete="false" />
                        <label>Room</label>
                        <input type="text" name="room" placeholder="Room" required autocomplete="false" />
                        <button>Join</button>
                    </form>  
                </div>       
            </div>
        );
    }
}

export default Login;