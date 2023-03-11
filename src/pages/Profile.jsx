import { getAuth, updateProfile } from 'firebase/auth';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';
import { db } from '../firebase';

export default function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [changeDetail, setChangeDetail] = useState(false);
    const [formData, setFormData] = useState({
        name: auth.currentUser.displayName,
    });
    const { name } = formData;
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
    async function onSubmit(){
        try {
            if(auth.currentUser.displayName !== name){
                //Update the display name in firebase auth
                toast.warning("Updating profile, please wait...");
                await updateProfile(auth.currentUser, {
                    displayName: name
                });

                //Update name in the firestore
                const docRef = doc(db, "users", auth.currentUser.uid);
                await setDoc(docRef, {
                    name,
                }, { merge: true });
            }
            toast.success("Profile updated successfully.");
        } catch (error) {
            console.log(error);
            toast.error("Could not update profile.");
        }
    }
    return (
        <section className="sign-in-section">
            <h1 className="sign-in-header">My Profile</h1>
            <div className="sign-in-wrapper">
                <div className="sign-bg-img"></div>
                <div className="sign-in-columns">
                    <form>
                        <div className="form-wrapper">
                            <label htmlFor="name">FullName *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="name" name="name" placeholder="FullName" value={name} onChange={onChange} required disabled={!changeDetail} />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="email">Email Address *</label>
                            <div className="form-group">
                                <input type="email" className="form-input" id="email" name="email" placeholder="Email Address" value={auth.currentUser.email} disabled={true} />
                            </div>
                        </div>
                        <div className="sign-in-text">
                            <ul>
                                {/* <li>Click here to <span className="edit-name" onClick={()=>setChangeDetail((prevState) => !prevState)}> {changeDetail ? 'Apply Changes' : 'Edit Name'}</span></li> */}
                                <li>Click here to <span className="edit-name" onClick={()=>{
                                    changeDetail && onSubmit();
                                    setChangeDetail((prevState) => !prevState);
                                }}> {changeDetail ? 'Apply Changes' : 'Edit Name'}</span></li>
                                <li><Link onClick={signOut}>Logout</Link></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
