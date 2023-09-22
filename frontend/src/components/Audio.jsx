import React from "react";
import Sound from "react-sound";
import EkrebSound1 from "../music/EkrebSound1.mp3";
import EkrebSound2 from "../music/EkrebSound2.mp3"
import EkrebSound3 from "../music/EkrebSound3.mp3"
import { useState } from "react"
import { Input, Button, notification } from 'antd';

function Audio() {
    //Variables to track the music playing
    const [isPlaying1, setisPlaying1] = useState(false);
    const [isPlaying2, setisPlaying2] = useState(false);
    const [isPlaying3, setisPlaying3] = useState(false);

    const playButton1 = () => {
        setisPlaying1(!isPlaying1)
    }

    const playButton2 = () => {
        setisPlaying2(!isPlaying2);
    }

    const playButton3 = () => {
        setisPlaying3(!isPlaying3);
    }
    
    
    return (
        <div>
            <h3>Additional Help</h3>
            
            <Button type="default" size="large" onClick={playButton1}>{!isPlaying1 ? "Stimulate Your Mind" : "Stop"}</Button>
            <Sound 
                url={EkrebSound1}
                playStatus={
                    isPlaying1 ? Sound.status.PLAYING : Sound.status.STOPPED
                }
                playFromPosition={200000}
            />&nbsp;&nbsp;
            <Button type="default" size="large" onClick={playButton2}>{!isPlaying2 ? "Lock In" : "Stop"}</Button>
            <Sound 
                url={EkrebSound2}
                playStatus={
                    isPlaying2 ? Sound.status.PLAYING : Sound.status.STOPPED
                }
                playFromPosition={0}
            />&nbsp;&nbsp;
            <Button type="default" size="large" onClick={playButton3}>{!isPlaying3 ? "Relax Your Mind" : "Stop"}</Button>
            <Sound 
                url={EkrebSound3}
                playStatus={
                    isPlaying3 ? Sound.status.PLAYING : Sound.status.STOPPED
                }
                playFromPosition={3000}
            />
        </div>
    )
}

export default Audio;