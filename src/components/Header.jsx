import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../App.css';

export default function Header() {
    const [pageState, setPageState] = useState("Sign In");
    const location = useLocation();
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if(user){
                setPageState("Profile");
            }else{
                setPageState("Sign In");
            }
        });
    }, [auth]);
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
                            <li className={pathRoutes('/my-musics') || ''}><Link to="/my-musics">My Musics</Link></li>
                            <li className={(pathRoutes('/sign-in') || pathRoutes('/profile')) || ''}><Link to={(pageState === 'Sign In') ? '/sign-in' : '/profile'}>{pageState}</Link></li>
                        </ul>
                    </div>
                </div>
            </header>
        </>
    )
}
