import { getAuth, updateProfile } from 'firebase/auth';
import { collection, doc, getDocs, orderBy, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import '../App.css';
import { db } from '../firebase';
import { RiAddCircleLine } from 'react-icons/ri';
import Spinner from '../components/Spinner';
import MusicsItem from '../components/MusicsItem';

export default function Profile() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [changeDetail, setChangeDetail] = useState(false);
    const [loading, setLoading] = useState(true);
    const [myMusics, setMyMusics] = useState(null);
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

    useEffect(()=>{
        async function fetchUserMusics(){
            const listingRef = collection(db, "musics");
            const q = query(
                listingRef, 
                where("userRef", "==", auth.currentUser.uid), 
                orderBy("timestamp", "desc")
            );
            const querySnapshot = await getDocs(q);
            let myMusics = [];
            querySnapshot.forEach((doc) => {
                return myMusics.push({
                    data: doc.data(),
                    id: doc.id,
                })
            });
            setMyMusics(myMusics);
            setLoading(false);
        }
        fetchUserMusics();
    }, [auth.currentUser.uid]);

    if(loading){
        return <Spinner />;
    }
    return (
        <>
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
                                    <li>Click here to <span className="edit-name" onClick={()=>{
                                        changeDetail && onSubmit();
                                        setChangeDetail((prevState) => !prevState);
                                    }}> {changeDetail ? 'Apply Changes' : 'Edit Name'}</span></li>
                                    <li><Link onClick={signOut}>Logout</Link></li>
                                </ul>
                            </div>
                            <div className="s-btn-group">
                                <button className="submit-button" id="submit-button" onClick={()=>navigate("/add-music")} type="button"> <RiAddCircleLine /> <span>Add New Music</span></button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {/* My Music Collection */}
            {!loading && myMusics.length > 0 && (
                <>
                    <section className="my-music-lists">
                        <div className="music-section-wrapper">
                            <div className="music-lists">
                                <div className="heading-music-title">
                                    <h2>My Music Collection</h2>
                                    <button className="add-new-btn"><i className="fa fa-plus"></i> Add Music</button>
                                </div>
                                <ul>
                                    {myMusics.map((music) => (
                                        <MusicsItem key={music.id} id={music.id} music={music.data} />
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    )
}
