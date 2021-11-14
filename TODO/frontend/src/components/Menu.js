
import React from "react";
import {Link} from "react-router-dom";

const MenuItem = ({menu}) => {
    return (
        <div className="popover-header">
            <menu className='row'>
                <nav>
                        <ul>
                            <li>
                                <Link to={'/'}>Users</Link>
                            </li>
                            <li>
                                <Link to={'/projects'}>Projects</Link>
                            </li>
                            <li>
                                <Link to={'/todos'}>Todos</Link>
                            </li>
                        </ul>
                    </nav>
            </menu>
        </div>
    )
}


export default MenuItem;