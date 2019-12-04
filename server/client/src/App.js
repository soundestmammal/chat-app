import React, { Component } from 'react';
import Login from '../src/components/Login';
import "../src/styles/App.css";

class App extends Component {
  state = {
    data: null
  }

  componentDidMount() {
    // call our fetch function below once the component mounts
    this.callBackendAPI()
    .then(res => this.setState({ data: res.age }))
    .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    const response = await fetch('/fetchUsers');
    const body = await response.json();
    if (response.status !== 200) {
      throw Error(body.message);
    }
    return body;
  }

  render(){
    return (
      <div className="container">
        <Login />
        <p>This is where the data will be: {this.state.data}</p>
      </div>
    );
  }
}

export default App;
