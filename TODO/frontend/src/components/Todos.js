import React from "react";

const TodoItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.user}</td>
            <td>{todo.description}</td>
            <td>{todo.project}</td>
        </tr>
    )
}

const TodoList = ({todos}) => {
    return (
        <table className="form-range">
            <thead>
            <tr>
                <th>User</th>
                <th>Description</th>
                <th>Project</th>
            </tr>
            </thead>
            <tbody>
            {todos.map((todo) => <TodoItem todo={todo}/>)}
            </tbody>
        </table>
    )
}

export default TodoList;
