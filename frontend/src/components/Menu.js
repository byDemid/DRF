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
                        <li>
                            {/*<Link to={'/login'}>Login</Link>*/}

                            {menu.is_auth() ? <button onClick={() => menu.logout()}> Logout</button> :
                                <Link to='/login'>Login</Link>}
                        </li>
                    </ul>
                </nav>
            </menu>
        </div>
    )
}


export default MenuItem;