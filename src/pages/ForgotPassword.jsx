import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { toast } from 'react-toastify';
import '../App.css';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    function onChange(e){
        setEmail(e.target.value);
    }
    async function onSubmit(e){
        e.preventDefault();
        try {
            const auth = getAuth();
            await sendPasswordResetEmail(auth, email);
            toast.success("Email sent successfully.");
        } catch (error) {
            toast.error("Could not send password reset. Email doesn't exist."); 
            console.log(error);
        }
    }
    return (
        <section className="sign-in-section">
            <h1 className="sign-in-header">Forgot Password</h1>
            <div className="sign-in-wrapper">
                <div className="sign-bg-img"></div>
                <div className="sign-in-columns">
                    <form onSubmit={onSubmit}>
                        <div className="form-wrapper">
                            <label htmlFor="email">Email Address *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="email" name="email" placeholder="Email Address" value={email} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="sign-in-text">
                            <ul>
                                <li>Don't have an account? <Link to="/sign-up">Register</Link></li>
                                <li>or just <Link to="/sign-in">Sign In</Link></li>
                            </ul>
                        </div>
                        <div className="s-btn-group">
                            <button className="submit-button" id="submit-button" type="submit"> Send Password Recovery</button>
                            <span>OR</span>
                            <OAuth />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
