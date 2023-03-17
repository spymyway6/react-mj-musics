import React from 'react';
import { Link } from 'react-router-dom';
import Moment from "react-moment";
import { MdOutlineEdit, MdDelete, MdPlayCircleOutline } from "react-icons/md";

export default function MusicsItem({ music, id}) {
    console.log(music);
    return (
        <li id="music-items-213213">
            <div className="music-img-wrapper">
                <div className="music-img" style={{ backgroundImage: `url(${music.imgUrls[0]})`}}>
                    <div className="play-button"><Link to="/"><MdPlayCircleOutline /></Link></div>
                </div>
            </div>
            <div className="music-content">
                <h3><Link to={"/music/"+id}>{music.music_title}</Link></h3>
                <p className="music-artists">{music.vocalist}</p>
                <p className="music-desc">{music.music_description}</p>
                <p className="music-desc"><Moment fromNow>{music.timestamp?.toDate()}</Moment></p>
            </div>
            <div className="edit-buttons">
                <Link to="/"><MdOutlineEdit /></Link>
                <Link to="/"><MdDelete /></Link>
            </div>
        </li>
    )
}
