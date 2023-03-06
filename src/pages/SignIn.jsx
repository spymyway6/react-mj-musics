import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import OAuth from '../components/OAuth';
import { db } from '../firebase';
import '../App.css';

export default function SignIn() {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const { email, password } = formData;
    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    return (
        <section className="sign-in-section">
            <h1 className="sign-in-header">Sign In</h1>
            <div className="sign-in-wrapper">
                <div className="sign-bg-img"></div>
                <div className="sign-in-columns">
                    <form action="">
                        <div className="form-wrapper">
                            <label htmlFor="email">Email Address *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="email" name="email" placeholder="Email Address" value={email} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="password">Password *</label>
                            <div className="form-group">
                                <input type={showPass ? "text" : "password"} className="form-input" id="password" name="password" placeholder="Password" value={password} onChange={onChange} required />
                                <i className="show-icon">{showPass ? <AiOutlineEyeInvisible onClick={()=>setShowPass((prevState) => !prevState)} /> : <AiOutlineEye onClick={()=>setShowPass((prevState) => !prevState)} />}</i>
                            </div>
                        </div>
                        <div className="sign-in-text">
                            <ul>
                                <li>Don't have an account? <Link to="/sign-up">Register</Link></li>
                                <li><Link to="/forgot-password">Forgot Password</Link></li>
                            </ul>
                        </div>
                        <div className="s-btn-group">
                            <button className="submit-button" id="submit-button" type="submit"> Sign In</button>
                            <span>OR</span>
                            <OAuth />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
