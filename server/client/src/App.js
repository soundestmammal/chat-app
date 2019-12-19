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
    .then(res => console.log("This is the reponse", res))
    .catch(err => console.log(err));
  }

  callBackendAPI = async () => {
    console.log("Currently calling backend api!");
    const response = await fetch('/fetchUsers');
    console.log(response);
    const body = await response.json();
    console.log(body);
    if (response.status !== 200) {
      throw Error(body.message);
    }
    console.log(body.message);
    this.setState({ data: body.message });
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
