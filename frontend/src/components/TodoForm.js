import React from "react";


class TodoForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: props.users.id,
            project: props.projects.id,
            description: ''
            // proms.users.id
        }
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
        console.log([event.target.name], event.target.value)
    }


    handleSubmit(event) {
        this.props.createTodo(this.state.user, this.state.project, this.state.description)
        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>
                <div className="form-group">
                    <label htmlFor="login">Text</label>
                    <input type="text" className="form-control" name="description" value={this.state.description}
                           onChange={(event) => this.handleChange(event)}/>
                </div>
                <div className="form-group">
                    <label htmlFor="author">user/project</label>

                    <select name="user" onChange={(event) => this.handleChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                    </select>
                    <select name="project" onChange={(event) => this.handleChange(event)}>
                        {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                    </select>

                </div>
                <input type="submit" className="btn btn-primary" value="Save"/>
            </form>
        );
    }

}

export default TodoForm