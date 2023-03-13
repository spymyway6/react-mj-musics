import React from 'react';
import { Link } from 'react-router-dom';

export default function MusicsItem({ music, id}) {
    console.log(music)
    return (
        <li id="music-items-213213">
            <div className="music-img-wrapper">
                <div className="music-img">
                    <div className="play-button"><Link to="/"><i className="fa fa-play-circle"></i></Link></div>
                </div>
            </div>
            <div className="music-content">
                <h3><Link to="/">{music.music_title}</Link></h3>
                <p className="music-artists">{music.vocalist}</p>
                <p className="music-desc">{music.music_description}</p>
            </div>
            <div className="edit-buttons">
                <Link to="/"><i className="fa fa-pencil"></i></Link>
                <Link to="/"><i className="fa fa-times"></i></Link>
            </div>
        </li>
    )
}
