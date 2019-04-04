import React, { Component } from 'react';
import { Route, NavLink, withRouter } from 'react-router-dom';
import axios from 'axios';
import Login from './components/Login';
import Register from './components/Register';
import Users from './components/Users';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: {
        username: '',
        password: '',
      },
      register: {
        username: '',
        password: '',
        department: '',
      },
      users: [],
      loggedIn: false,
    }
  };
  handleLoginChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      login: {...this.state.login, [name]: value}
    });
  };
  handleLogin = (event) => {
    event.preventDefault();
    axios
      .post('http://localhost:5000/api/login', this.state.login)
        .then(response => {
          localStorage.setItem('jwt', response.data.token);
          this.props.history.push('/');
        })
        .catch((error) => console.log(error));
  };
  onLogout = () => {
    if (localStorage.getItem('jwt')) {
      localStorage.removeItem('jwt');
      this.setState({
        loggedIn: false
      });
      this.props.history.push('/login');
    } else {
      this.props.history.push('/');
    }

  };
  render() {
    const { users, login, register, loggedIn } = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
