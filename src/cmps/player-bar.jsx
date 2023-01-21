import { PlayerController } from "./player-controller"
import { SoundPlayer } from "./sound-player"
import { useSelector } from "react-redux"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPhoneVolume, faVolumeMute } from "@fortawesome/free-solid-svg-icons"

export function PlayerBar() {
    const player = useSelector(storeState => storeState.playerModule.player)
    const song = useSelector(storeState => storeState.playerModule.song)
    const [volume, setVolume] = useState(80)
    console.log('song from player bar', song)
    song ? console.log('song from player bar', song) : console.log('no song')

    function onSetVolume({ target }) {
        if (!player) return
        console.log(player?.getVolume())
        player.setVolume(target.value)
        setVolume(target.value)
    }

    return (<div className="media-player" >
        {song && <SoundPlayer playerId={song._id} />}
        {player && <div className="information">
            <img src={song.imgUrl} alt="no image" />
            <div className="details">
                <h4>{player.videoTitle}</h4>
                <h5>{player.artist}</h5>
            </div>
        </div>}
        <PlayerController />
        <div className="actions-btns">
        <FontAwesomeIcon icon={faVolumeMute}/>
        {/* <FontAwesomeIcon icon={faPhoneVolume}/> */}
            <input
                type="range"
                name="volume-range"
                id="volume-range"
                className="volume-range"
                value={volume}
                max={100}
                onChange={onSetVolume}
                style={{ background: `linear-gradient(to right, #ffffff 0%, #ffffff ${volume}%, #b3b3b3 ${volume}%, #b3b3b3 100%)` }}
            />
        </div>
    </div>
    )
}