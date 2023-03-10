import React, { useContext, useEffect, useState } from 'react'
import "./navbar.scss"
import { AppContext } from '../../store';
import jwtDecode from 'jwt-decode';

export const Navbar = React.memo(() => {
    const [state, dispatch] = useContext(AppContext);
    const [name, setName] = useState('');
    return (
        <div className='navbar'>
            <div className="wrapper">

                <div className="search">
                </div>

                <div className="items">
                    <div className="item"><span>Welcome {state.petugas_data["username"]}</span></div>
                    <div className="item">
                        <img src="https://media.istockphoto.com/vectors/user-vector-id1138452882?k=6&m=1138452882&s=170667a&w=0&h=H31QWhznYhdGblAJX6Pp6RHcS6d6xF13D5L6wNJOQmc="
                            alt=""
                            className='avatar'
                        />
                    </div>

                </div>
            </div>
        </div>
    )
})
