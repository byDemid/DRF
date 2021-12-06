import React from "react";
import {Link} from "react-router-dom";

const TodoItem = ({todo, deleteTodo}) => {
    return (
        <tr>
            <td>{todo.user}</td>
            <td>{todo.description}</td>
            <td>{todo.project}</td>
            <td>
                <button type='button' onClick={() => deleteTodo(todo.id)}>Delete</button>
            </td>
        </tr>
    )
}

const TodoList = ({todos, deleteTodo}) => {
    return (
        <div>
            <table className="form-range">
                <thead>
                <tr>
                    <th>User</th>
                    <th>Description</th>
                    <th>Project</th>
                    <th>Delete</th>
                </tr>
                </thead>
                <tbody>
                {todos.map((todo) => <TodoItem todo={todo} deleteTodo={deleteTodo}/>)}
                </tbody>
            </table>
            <Link to={'/todo/create'}>Create</Link>
        </div>
    )
}

export default TodoList;
