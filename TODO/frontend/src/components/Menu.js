
import React from "react";

const MenuItem = ({menu}) => {
    return (
        <div className="popover-header">
            <menu className='row'>
                <a className='col-sm' href="http://127.0.0.1:8000/">Главная</a>
                <a className='col-sm' href="#">Some text</a>
                <a className='col-sm' href="#">Some text</a>
                <a className='col-sm' href="http://127.0.0.1:8000/admin/">Админка</a>
            </menu>
        </div>
    )
}


export default MenuItem;