import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
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
                            <li className={pathRoutes('/') || ''}><Link to="/">Home</Link></li>
                            <li className={pathRoutes('/offers') || ''}><Link to="/offers">Offers</Link></li>
                            <li className={pathRoutes('/sign-in') || ''}><Link to="/sign-in">Sign In</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}
