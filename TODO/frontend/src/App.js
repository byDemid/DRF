import React from "react";
import logo from './logo.svg';
import './App.css';

import UserList from "./components/Users";
import axios from "axios";
import MenuItem from "./components/Menu";
import FooterItem from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.css'
import {BrowserRouter, Route, Link} from 'react-router-dom';
import ProjectDetail from "./components/ProjectDetail";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todos";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
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
        axios.get('http://127.0.0.1:8000/api/users').then(
            response => {
                const users = response.data.results
                this.setState(
                    {'users': users}
                )
            }
        ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/projects').then(
            response => {
                const projects = response.data.results
                this.setState(
                    {'projects': projects}
                )
            }
        ).catch(error => console.log(error))
        axios.get('http://127.0.0.1:8000/api/todo').then(
            response => {
                const todos = response.data.results
                this.setState(
                    {'todos': todos}
                )
            }
        ).catch(error => console.log(error))
    }

    render() {
        return (
            <div>
                <BrowserRouter>
                    <MenuItem/>
                    <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>}/>
                    <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
                    <Route exact path='/projects/:id/'
                           component={() => <ProjectDetail projects={this.state.projects}/>}/>
                    <FooterItem/>
                </BrowserRouter>
            </div>
        )
    }
}

export default App;