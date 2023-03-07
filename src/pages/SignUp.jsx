import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import OAuth from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { db } from '../firebase';
import '../App.css';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function SignUp() {
    const [showPass, setShowPass] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });
    const { name, email, password } = formData;
    const navigate = useNavigate();
    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    async function onSubmit(e){
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            updateProfile(auth.currentUser, {
                displayName: name
            });
            const user = userCredential.user;
            const docRef = doc(db, "users", user.uid);
            await setDoc(docRef, {
                name: name,
                email: email,
                timestamp: serverTimestamp(),
            });
            // Save data to database
            navigate('/');
        } catch (error) {
            console.log(error);
            toast.error("An error occured. Please try again.");
        }
    }
    return (
        <section className="sign-in-section">
            <h1 className="sign-in-header">Register Now</h1>
            <div className="sign-in-wrapper">
                <div className="sign-bg-img"></div>
                <div className="sign-in-columns">
                    <form onSubmit={onSubmit}>
                        <div className="form-wrapper">
                            <label htmlFor="name">Name *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="name" name="name" placeholder="Name" value={name} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="email">Email Address *</label>
                            <div className="form-group">
                                <input type="email" className="form-input" id="email" name="email" placeholder="Email Address" value={email} onChange={onChange} required />
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
                                <li>Have an account? <Link to="/sign-in">Sign In</Link></li>
                                <li><Link to="/forgot-password">Forgot Password</Link></li>
                            </ul>
                        </div>
                        <div className="s-btn-group">
                            <button className="submit-button" id="submit-button" type="submit"> Sign Up</button>
                            <span>OR</span>
                            <OAuth />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
