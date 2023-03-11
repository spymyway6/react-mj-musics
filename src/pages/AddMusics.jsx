import { getAuth } from 'firebase/auth';
import React, { useState } from 'react'
import { RiAddCircleLine } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

export default function AddMusics() {
    const auth = getAuth
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        music_title: "",
        vocalist: "",
        music_description: "",
        music_duration: "",
        file_size: "",
        song_lyrics: "",
    });
    const { music_title, vocalist, music_description, music_duration, file_size, song_lyrics } = formData;
    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id]: e.target.value,
        }));
    }
    return (
        <section className="sign-in-section">
            <h1 className="sign-in-header">Add New Music</h1>
            <div className="sign-in-wrapper">
                <div className="sign-bg-img"></div>
                <div className="sign-in-columns">
                    <form>
                        <div className="form-wrapper">
                            <label htmlFor="music_title">Music Title *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="music_title" name="music_title" placeholder="The title of your music.." value={music_title} onChange={onChange} required />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="vocalist">Vocalist *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="vocalist" name="vocalist" placeholder="Name of the Vocalist" onChange={onChange} value={vocalist} required />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="music_description">Music Description *</label>
                            <div className="form-group">
                                <textarea className="form-input" id="music_description" name="music_description" placeholder="Write description.." rows="10" onChange={onChange} required>{music_description}</textarea>
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="music_duration">Duration *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="music_duration" name="music_duration" placeholder="Duration" onChange={onChange} value={music_duration} required />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="file_size">File Size *</label>
                            <div className="form-group">
                                <input type="text" className="form-input" id="file_size" name="file_size" placeholder="File Size" onChange={onChange} value={file_size} required />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="song_lyrics">Song Lyrics *</label>
                            <div className="form-group">
                                <textarea className="form-input" id="song_lyrics" name="song_lyrics" placeholder="Write the lyrics here.." rows="10" onChange={onChange} value={song_lyrics} required></textarea>
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="music_file">Music File *</label>
                            <div className="form-group">
                                <input type="file" className="form-input" id="music_file" onChange={onChange} name="music_file" accept=".mp3" />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="featured_image">Featured Image *</label>
                            <div className="form-group">
                                <input type="file" className="form-input" id="featured_image" onChange={onChange} name="featured_image" accept=".png, .jpg, .jpeg" />
                            </div>
                        </div>
                        <div className="s-btn-group">
                            <button className="submit-button" id="submit-button" type="submit"><span>Submit</span></button>
                        </div>
                        <div className="sign-in-text mt-10">
                            <ul>
                                <li>Go back to <Link to='/profile'>My Profile</Link></li>
                            </ul>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}
