import React, { useState, useEffect } from "react";
import { GrChapterNext, GrChapterPrevious, GrPauseFill, GrPlayFill } from 'react-icons/gr';

const useAudio = url => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

    useEffect(() => {
        playing ? audio.play() : audio.pause();
    },[playing, audio]);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);

    return [playing, toggle,];
};

const Player = ({ url }) => {
    const [playing, toggle] = useAudio(url);
    return (
        <>
            <div className="player-buttons">
                <div className="play-btn-prev-next" onClick="window.location.href='/music/mad/'"><GrChapterPrevious /></div>
                <div id="play-btn-play" className="play-btn-play" onClick={toggle}>{playing ? <GrPauseFill /> : <GrPlayFill />}</div>
                <div id="play-btn-prev-next" className="play-btn-prev-next" onclick="window.location.href='/music/pasabta-ko/'"><GrChapterNext /></div>
            </div>
        </>
    );
};

export default Player; 