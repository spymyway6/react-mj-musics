import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../App.css';

export default function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    function pathRoutes(route){
        if(route === location.pathname){
            return 'active';
        }
    }
    return (
        <>
            <header>
                <div className="header-wrap">
                    <div className="comp-logo">
                        <h6 onClick={()=>navigate("/")}><span>MJ</span> Musics</h6>
                    </div>
                    <div className="menu-wrapper">
                        <ul>
                            <li className={pathRoutes('/') || ''}><a onClick={()=>navigate("/")} href >Home</a></li>
                            <li className={pathRoutes('/offers') || ''}><a onClick={()=>navigate("/offers")} href >Offers</a></li>
                            <li className={pathRoutes('/sign-in') || ''}><a onClick={()=>navigate("/sign-in")} href >Sign In</a></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}
