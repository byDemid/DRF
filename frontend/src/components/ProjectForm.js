import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            users: []}
            // props.users[0].id}
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    handleProjectChange(event) {
        if (!event.target.selectedOptions) {

            this.setState({
                'users': []
            })
            return;
        }
        let users = []
        for(let i=0; i<event.target.selectedOptions.length; i++){
            users.push(event.target.selectedOptions.item(i).value)
        }
        this.setState({
            'users':users
        })
    }




    handleSubmit(event) {
        // console.log(this.state.name + ' '+this.state.repo_url+'' + this.state.user)
        this.props.createProject(this.state.name, this.state.users)

        event.preventDefault()
    }

    render() {
        return (
            <form onSubmit={(event) => this.handleSubmit(event)}>


                <div className="form-group">
                    <label htmlFor="login">name</label>
                    <input type="text" name="name" value={this.state.name}
                           onChange={(event) => this.handleChange(event)}/>
                </div>

                <div className="form-group">
                    <label htmlFor="author">user</label>

                    <select name="users" multiple onChange={(event) => this.handleProjectChange(event)}>
                        {this.props.users.map((item) => <option value={item.id}>{item.first_name}</option>)}
                    </select>


                    {/*<input type="number" name="users" value={this.state.users}*/}
                    {/*       onChange={(event) => this.handleChange(event)}/>*/}


                </div>
                {/*<input type="submit" className="btn btn-primary" value="Save"/>*/}


                <input type="submit" value="Save"/>
            </form>
        );

    }


}

export default ProjectForm
