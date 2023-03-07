import { getAuth } from 'firebase/auth';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';

export default function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
        email: auth.currentUser.email,
    });
    const { name, email } = formData;
    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    function signOut(e){
        e.preventDefault();
        auth.signOut();
        navigate("/");
        toast.success("You are now logged out.");
    }
    return (
        <section className="sign-in-section">
            <h1 className="sign-in-header">My Profile</h1>
            <div className="sign-in-wrapper">
                <div className="sign-bg-img"></div>
                <div className="sign-in-columns">
                    <form onSubmit={()=> this.preventDefault()}>
                        <div className="form-wrapper">
                            <label htmlFor="name">FullName *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="name" name="name" placeholder="FullName" value={name} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="email">Email Address *</label>
                            <div className="form-group">
                                <input type="email" className="form-input" id="email" name="email" placeholder="Email Address" value={email} required />
                            </div>
                        </div>
                        <div className="sign-in-text">
                            <ul>
                                <li>Click here to <Link to="/sign-up">Edit your Name</Link></li>
                                <li><Link onClick={signOut}>Logout</Link></li>
                            </ul>
                        </div>
                        <div className="s-btn-group">
                            <button className="submit-button" id="submit-button" type="button"> Save Profile</button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
