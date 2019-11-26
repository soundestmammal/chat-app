import React, { Component } from 'react';

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    renderUsers = () => {
        const users = this.props.users.map((user) => {
        return (<li className="list-title">{ user }</li>);
        })
        return users;
    }

    render() {
        return (
            <div>
                <h2 className="room-title">Tutoring Center</h2>
                <h3 className="list-title">Users will go here</h3>
                <ul className="users">
                   { this.renderUsers() }
                </ul>
            </div>
        );
    }
}

export default Sidebar;