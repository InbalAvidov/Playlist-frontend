import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPauseCircle, faPlayCircle } from '@fortawesome/free-solid-svg-icons'
import { utilService } from "../service/util.service";


export function MediaConroller() {
    const player = useSelector(storeState => storeState.playerModule.player)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState('0:00')
    let timerId
    if (isPlaying) {
        timerId = setInterval(() => {
            setCurrentTime(utilService.secondsMinutesAndSeconds(player.getCurrentTime()))
            console.log(player.getCurrentTime())
        }, 1000);
    }

    function togglePlay({ target }) {
        if (isPlaying) {
            player.pauseVideo()
            clearInterval(timerId)
        } else {
            player.playVideo()
        }
        // console.log(player)
        setIsPlaying(prevIsPlaying => !prevIsPlaying)
    }
    console.log('player', player);
    return <div className="controller">
        <div className="conrtoller-btns">
            {!isPlaying && <FontAwesomeIcon icon={faPlayCircle} onClick={togglePlay} />}
            {isPlaying && <FontAwesomeIcon icon={faPauseCircle} onClick={togglePlay} />}
        </div>
        <div className="player-progress-container">
            <p>{currentTime}</p>
            <input
                type="range"
                name="player-progress"
                id="player-progress"
                className="player-progress"
            />
            {player ? <p>{utilService.secondsMinutesAndSeconds(player.getDuration())}</p> : <p>0:00</p>}
        </div>

    </div>
}