import React from "react";
import logo from './logo.svg';
import './App.css';

import UserList from "./components/Users";
import axios from "axios";
import Cookies from "universal-cookie";
import MenuItem from "./components/Menu";
import FooterItem from "./components/Footer";
import 'bootstrap/dist/css/bootstrap.css'
import {HashRouter, Route, BrowserRouter, Link, Switch, Redirect} from "react-router-dom";
import ProjectDetail from "./components/ProjectDetail";
import ProjectList from "./components/Projects";
import TodoList from "./components/Todos";
import LoginForm from "./components/Auth";
import NotFound404 from "./components/NotFound404";
import ProjectForm from "./components/ProjectForm";
import TodoForm from "./components/TodoForm";


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'todos': [],
            'token': '',
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


    createProject(name, users) {
        console.log(name + " " + users)
        const headers = this.get_headers()
        const data = {name: name, users: users}
        axios.post(`http://127.0.0.1:8000/api/projects/`, data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => {
                console.log(error)
                this.setState({users: []})
            }
        )
    }

    createTodo(user, project, description) {
        const headers = this.get_headers()
        const data = {user: user, project: project, description: description}
        console.log(data)
        axios.post(`http://127.0.0.1:8000/api/todo/`, data, {headers})
            .then(response => {
                this.load_data()
            }).catch(error => console.log(error))
    }

    deleteProjects(id) {
        const headers = this.get_headers()
        // console.log(id)
        axios.delete(`http://127.0.0.1:8000/api/projects/${id}`, {headers})
            .then(response => {
                //
                // this.setState(
                //     {
                //         'projects': this.state.projects.filter((item) => item.id !== id)
                //     }
                // )
                this.load_data()
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            }
        )
    }

    deleteTodo(id) {
        const headers = this.get_headers()
        console.log(id)
        axios.delete(`http://127.0.0.1:8000/api/todo/${id}`, {headers})
            .then(response => {
                this.setState({todos: this.state.todos.filter((todo) => todo.id !== id)})
            }).catch(error => console.log(error))
    }


    load_data() {
        const headers = this.get_headers()

        axios.get('http://127.0.0.1:8000/api/users/', {headers})
            .then(response => {
                const users = response.data

                this.setState(
                    {
                        'users': users
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({users: []})
            }
        )

        axios.get('http://127.0.0.1:8000/api/projects/', {headers})
            .then(response => {
                const projects = response.data

                this.setState(
                    {
                        'projects': projects
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({projects: []})
            }
        )
        axios.get('http://127.0.0.1:8000/api/todo/', {headers})
            .then(response => {
                const todos = response.data

                this.setState(
                    {
                        'todos': todos
                    }
                )
            }).catch(error => {
                console.log(error)
                this.setState({todos: []})
            }
        )
    }


    is_auth() {
        // return this.state.token != ''
        return !!this.state.token
    }

    logout() {
        this.set_token('')
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState({'token': token}, () => this.load_data())
    }

    get_token(username, password) {
        axios.post('http://127.0.0.1:8000/api-auth-token/', {username: username, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.is_auth()) {
            headers['Authorization'] = 'Token ' + this.state.token
        }
        return headers
    }


    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token}, () => this.load_data())
    }


    componentDidMount() {
        this.get_token_from_storage()
    }

//     render() {
//         return (
//             <div>
//                 <BrowserRouter>
//                     {/*<MenuItem is_auth={() => this.is_auth()} logout={() => this.logout()}/>*/}
//
//                     <div className="popover-header">
//                         <menu className='row'>
//                             <nav>
//                                 <ul>
//                                     <li>
//                                         <Link to={'/'}>Users</Link>
//                                     </li>
//                                     <li>
//                                         <Link to={'/projects'}>Projects</Link>
//                                     </li>
//                                     <li>
//                                         <Link to={'/todos'}>Todos</Link>
//                                     </li>
//                                     <li>
//                                         {/*<Link to={'/login'}>Login</Link>*/}
//                                         {this.is_auth() ? <button onClick={() => this.logout()}> Logout</button> :
//                                             <Link to='/login'>Login</Link>}
//                                     </li>
//                                 </ul>
//                             </nav>
//                         </menu>
//                     </div>
//
//                     <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
//                     <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
//                                                                                 deleteProjects={(id) => this.deleteProjects(id)}/>}/>
//
//
//                     <Route exact path='/projects/create'
//                            component={() => <ProjectForm users={this.state.users}
//                                                          createProject={(name, repo_url, users) => this.createProject(name, repo_url, users)}/>}/>
//
//
//                     <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}/>}/>
//
//                     <Route exact path='/login' component={() => <LoginForm
//                             get_token={(username, password) => this.get_token(username, password)}/>}/>
//
//                     <FooterItem/>
//                     {/*<Route component={NotFound404}/>*/}
//                 </BrowserRouter>
//             </div>
//         )
//     }
// }

    render() {
        return (
            <div>
                <HashRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Users</Link>
                            </li>
                            <li>
                                <Link to='/projects'>Projects</Link>
                            </li>
                            <li>
                                <Link to='/todos'>Todos</Link>
                            </li>
                            <li>
                                {this.is_auth() ? <button onClick={() => this.logout()}>Logout</button> :
                                    <Link to='/login'>Login</Link>}
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        {/*<Route exact path='/todos' component={() => <Todo todos={this.state.todos}*/}
                        {/*                                                      deleteTodo={(id) => this.deleteTodo(id)}/>}/>*/}
                        <Route exact path='/' component={() => <UserList users={this.state.users}/>}/>
                        <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}
                                                                                    deleteProjects={(id) => this.deleteProjects(id)}/>}/>
                        <Route exact path='/projects/create'
                               component={() => <ProjectForm
                                   createProject={(name, users) => this.createProject(name, users)}
                                   users={this.state.users}/>}/>

                        <Route exact path='/todo/create'
                               component={() => <TodoForm
                                   createTodo={(user, project, description) => this.createTodo(user, project, description)}
                                   users={this.state.users}
                                   projects={this.state.projects}/>}/>

                        <Route exact path='/todos' component={() => <TodoList todos={this.state.todos}
                                                                              deleteTodo={(id) => this.deleteTodo(id)}/>}/>
                        <Route exact path='/login' component={() => <LoginForm
                            get_token={(username, password) => this.get_token(username, password)}/>}/>
                        <Route component={NotFound404}/>
                    </Switch>
                </HashRouter>
                <FooterItem/>
            </div>

        )
    }
}

export default App;