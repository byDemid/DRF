import React from "react";

const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <div className='card-body'>
            <table className="form-range">
                <th>
                    Username
                </th>
                <th>
                    First name
                </th>
                <th>
                    Last name
                </th>
                <th>
                    Email
                </th>
                {users.map((user) => <UserItem key={user.id} user={user}/>)}
            </table>
        </div>
    )
}

export default UserList;
