import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v1 as uuidv4 } from "uuid";
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function AddMusics() {
    const auth = getAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        music_title: "",
        vocalist: "",
        music_description: "",
        music_duration: "",
        file_size: "",
        song_lyrics: "",
        music_file: {},
        featured_image: {},
    });
    const { music_title, vocalist, music_description, music_duration, file_size, song_lyrics, featured_image, music_file } = formData;
    function onChange(e){
        // Files
        if(e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.files
            })); 
        }
        // Text or boolean or number
        if(!e.target.files){
            setFormData((prevState) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            })); 
        }
    }

    async function onSubmit(e){
        e.preventDefault();
        setLoading(true);

        // Upload Images
        const imgUrls = await Promise.all(
            [...featured_image].map((featured_image)=>storeFiles(featured_image))
        ).catch((error)=>{
            setLoading(false);
            toast.error("Featured image not uploaded.");
            console.log(error);
            return;
        });
        console.log(imgUrls);

        // Upload Musics
        const musicURLs = await Promise.all(
            [...music_file].map((music_file)=>storeFiles(music_file))
        ).catch((error)=>{
            setLoading(false);
            toast.error("Music file not uploaded.");
            console.log(error);
            return;
        });
        console.log(musicURLs);

        // Set the Form Data and Serialize
        const formDataCopy = {
            ...formData,
            imgUrls,
            musicURLs,
            timestamp: serverTimestamp(),
            userRef: auth.currentUser.uid
        };
        delete formDataCopy.featured_image;
        delete formDataCopy.music_file;

        // Save music to Database
        const myCollection = collection(db, "musics");
        await addDoc(myCollection, formDataCopy);
        
        toast.success("Music added successfully.");
        setLoading(false);  
        // navigate(`/music/${docRef.id}`);
        navigate("/profile");
    }
    
    async function storeFiles(file){
        return new Promise((resolve, reject) => {
            const storage = getStorage();
            const metadata = {
                contentType: '*'
            };
            const filename = `${auth.currentUser.uid}-${file.name}-${uuidv4()}`;
            const storageRef = ref(storage, filename);
            const uploadTask = uploadBytesResumable(storageRef, file, metadata);
            
            // Listen for state changes, errors, and completion of the upload.
            uploadTask.on('state_changed',
                (snapshot) => {
                    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log('Upload is ' + progress + '% done');
                    switch (snapshot.state) {
                        case 'paused':
                            console.log('Upload is paused');
                            break;
                        case 'running':
                            console.log('Upload is running');
                            break;
                        default:
                            console.log('Upload is running');
                            break;
                    }
                }, 
                (error) => {
                    reject(error);
                }, 
                () => {
                    // Upload completed successfully, now we can get the download URL
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        })
    }

    if(loading){
        return <Spinner />;
    }
    return (
        <section className="sign-in-section">
            <h1 className="sign-in-header">Add New Music</h1>
            <div className="sign-in-wrapper">
                <div className="sign-bg-img"></div>
                <div className="sign-in-columns">
                    <form onSubmit={onSubmit}>
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
                                <textarea className="form-input" id="music_description" name="music_description" placeholder="Write description.." rows="10" onChange={onChange} value={music_description} required></textarea>
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
                                <input type="file" className="form-input" id="music_file" onChange={onChange} name="music_file" accept=".mp3" required />
                            </div>
                        </div>
                        <div className="form-wrapper">
                            <label htmlFor="featured_image">Featured Image *</label>
                            <div className="form-group">
                                <input type="file" className="form-input" id="featured_image" onChange={onChange} name="featured_image" accept=".png, .jpg, .jpeg" required />
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
