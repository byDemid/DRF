import React from "react";
import logo from './logo.svg';
import './App.css';

import UserList from "./components/Users";
import axios from "axios";
import MenuItem from "./components/Menu";
import FooterItem from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.css'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      'users': []
    }
  }

  // componentDidMount() {
  //     const users = [
  //         {
  //             'first_name': 'Федор',
  //             'last_name': 'Достоевский',
  //             'username': 'Идеот'
  //         },
  //     ]
  //     this.setState(
  //          {'users': users}
  //     )
  // }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/users/').then(
        response => {
          const users = response.data
          this.setState(
              {'users': users}
          )
        }
    ).catch(error => console.log(error))
  }

  render() {
    return (
        <div>
          <MenuItem/>
          <UserList users={this.state.users}/>
          <FooterItem/>
        </div>
    )
  }
}

export default App;