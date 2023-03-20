import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { db } from '../firebase';
import Spinner from '../components/Spinner';
import { GrVolume } from 'react-icons/gr';
import SingleBg from "../assets/single-bg.jpg";
import Player from '../components/MusicPlayer';

export default function Music() {
    const params = useParams();
    const [music, setMusic] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        async function fetchMusic(){
            const docRef = doc(db, "musics", params.musicID);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setMusic(docSnap.data());
                setLoading(false);
            }
        }
        fetchMusic();
    }, [params.musicID]);

    function displayAsHTML(desc) {
        return desc.replace(/\n/g, "<br />");
    }

    // setTimeout(() => {
    //     var AudioPlay = new Audio(music.musicURLs[0]);
    //     AudioPlay.play();
    // }, "5000");

    if(loading){
        return <Spinner />;
    }

    return (
        <>
            {/* Music Details */}
            <section className="single-music-section" style={{ backgroundImage: `url(${SingleBg})`}}>
                <div className="single-music-section-wrapper">
                    <div className="music-details-content-wrapper">
                        <div className="music-contents-wrapper">
                            <div className="music-content-img" style={{ backgroundImage: `url(${music.imgUrls[0]}`}}></div>
                            <div className="m-content">
                                <h1>{music.music_title}</h1>
                                <h5>{music.vocalist}</h5>
                                <p className="desc" dangerouslySetInnerHTML={{__html: displayAsHTML(music.music_description)}} />
                                <div className="more-music-details">
                                    <ul>
                                        <li><i className="fa fa-clock"></i> Duration: {music.music_duration}</li>
                                        <li><i className="fa fa-music"></i> File Size: {music.file_size}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="music-lyrics-wrapper">
                            <p className="lyrics" dangerouslySetInnerHTML={{__html: displayAsHTML(music.song_lyrics)}} />
                        </div>
                        {/* Suggestions here */}
                        <div className="music-suggestions">
                            <h2>More Musics To Play</h2>
                            <div className="latest-music-lists">
                                <ul>
                                    <li>
                                        <div className="lists-music-img-wrapper">
                                            <div className="lists-music-img" style={{ backgroundImage: `url(http://localhost:8000/wp-content/uploads/2023/03/nickel.png)`}}>
                                                <div className="lists-play-button"><a href="/music/pataka-1"><i className="fa fa-play-circle"></i></a></div>
                                            </div>
                                        </div>
                                        <div className="lists-music-content">
                                            <h3><a href="/music/pataka-1">Pataka 123</a></h3>
                                            <p className="music-artists">VocalistPataka 123</p>
                                            <p className="music-duration">Duration: Pataka 123 | File Size: Pataka 123</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="lists-music-img-wrapper">
                                            <div className="lists-music-img" style={{ backgroundImage: `url(http://localhost:8000/wp-content/uploads/2023/03/nickel.png)`}}>
                                                <div className="lists-play-button"><a href="/music/all-i-want-for-christmas-is-you-make-my-wish-come-true-edition"><i className="fa fa-play-circle"></i></a></div>
                                            </div>
                                        </div>
                                        <div className="lists-music-content">
                                            <h3><a href="/music/all-i-want-for-christmas-is-you-make-my-wish-come-true-edition">All I Want for Christmas Is You</a></h3>
                                            <p className="music-artists">Mariah Carey</p>
                                            <p className="music-duration">Duration: 4 mins and 2 seconds | File Size: 3 MB</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="lists-music-img-wrapper">
                                            <div className="lists-music-img" style={{ backgroundImage: `url(http://localhost:8000/wp-content/uploads/2023/03/nickel.png)`}}>
                                                <div className="lists-play-button"><a href="/music/gugma-pa-more"><i className="fa fa-play-circle"></i></a></div>
                                            </div>
                                        </div>
                                        <div className="lists-music-content">
                                            <h3><a href="/music/gugma-pa-more">Gugma Pa More</a></h3>
                                            <p className="music-artists">Winset ft. Vital Signs Acoustic</p>
                                            <p className="music-duration">Duration: 4 mins and 24 seconds | File Size: 3 MB</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="lists-music-img-wrapper">
                                            <div className="lists-music-img" style={{ backgroundImage: `url(http://localhost:8000/wp-content/uploads/2023/03/nickel.png)`}}>
                                                <div className="lists-play-button"><a href="/music/lason-mong-halik"><i className="fa fa-play-circle"></i></a></div>
                                            </div>
                                        </div>
                                        <div className="lists-music-content">
                                            <h3><a href="/music/lason-mong-halik">Lason Mong Halik</a></h3>
                                            <p className="music-artists">Katrina Velarde</p>
                                            <p className="music-duration">Duration: 3 mins and 58 seconds | File Size: 3.8</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="lists-music-img-wrapper">
                                            <div className="lists-music-img" style={{ backgroundImage: `url(http://localhost:8000/wp-content/uploads/2023/03/nickel.png)`}}>
                                                <div className="lists-play-button"><a href="/music/anata-dake-mitsumeteru"><i className="fa fa-play-circle"></i></a></div>
                                            </div>
                                        </div>
                                        <div className="lists-music-content">
                                            <h3><a href="/music/anata-dake-mitsumeteru">Anata Dake Mitsumeteru</a></h3>
                                            <p className="music-artists">Slam Dunk</p>
                                            <p className="music-duration">Duration: 4 mins and 42 seconds | File Size: 6 MB</p>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="lists-music-img-wrapper">
                                            <div className="lists-music-img" style={{ backgroundImage: `url(http://localhost:8000/wp-content/uploads/2023/03/nickel.png)`}}>
                                                <div className="lists-play-button"><a href="/music/paano"><i className="fa fa-play-circle"></i></a></div>
                                            </div>
                                        </div>
                                        <div className="lists-music-content">
                                            <h3><a href="/music/paano">Paano</a></h3>
                                            <p className="music-artists">Shamrock</p>
                                            <p className="music-duration">Duration: 4 mins and 5 seconds | File Size: 6</p>
                                        </div>
                                    </li>
                                </ul>
                                <a href="/my-musics" className="play-btn-content"><i className="fa fa-play-circle"></i> View More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Music Controls */}
            <section className="music-player">
                <audio id="music_audio" src={music.musicURLs[0]} title={music.music_title}>
                    <p>Your browser does not support the audio element</p>
                </audio>
                <div className="music-player-wrapper">
                    {/* Left */}
                    <div className="music-content-artist">
                        <div className="player-img" style={{ backgroundImage: `url(${music.imgUrls[0]})`}}>
                            <div className="rhythm-animation" id="rhythm-animation">
                                <svg xmlns="http://www.w3.org/2000/svg" className="equilizer" viewBox="0 0 128 128">
                                    <g>
                                        <title>Audio Equilizer</title>
                                        <rect className="bar" transform="translate(0,0)" y="15"></rect>
                                        <rect className="bar" transform="translate(25,0)" y="15"></rect>
                                        <rect className="bar" transform="translate(50,0)" y="15"></rect>
                                        <rect className="bar" transform="translate(75,0)" y="15"></rect>
                                        <rect className="bar" transform="translate(100,0)" y="15"></rect>
                                    </g>
                                </svg>
                            </div>
                        </div>
                        <div className="player-artist-cont">
                            <h5 className="player-music-title">{music.music_title}</h5>
                            <p className="player-artist">{music.vocalist}</p>
                        </div>
                    </div>
                    {/* Center */}
                    <div className="player-tools">
                        <Player url={music.musicURLs[0]} />
                    </div>
                    {/* Right */}
                    <div className="music-player-volume">
                        <div className="volume-wrapper">
                            <GrVolume />
                            <div className="progress-container" id="volumeContainer">
                                <div className="progress volume" id="volumeWidth"></div>
                            </div> 
                        </div>
                    </div>
                </div>
                {/* Player */}
                <div className="player-timer">
                    <span id="tracktime">0:16</span> 
                    <div className="progress-container" id="progress-container">
                        <div className="progress" id="progress"></div>
                    </div> 
                    <span id="audio_duration">2:49</span>
                </div>
            </section>
        </>
    )
}
