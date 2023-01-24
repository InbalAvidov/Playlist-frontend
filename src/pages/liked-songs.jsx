import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { Loader } from "../cmps/loader"
import { SongList } from "../cmps/station-song-list"
import { stationService } from "../service/station.service"
import { StationHeader } from "../cmps/station-header"

export function LikedSongs() {
  const user = useSelector((storeState => storeState.userModule.user))
  const [station, setStation] = useState(null)

  useEffect(() => {
    const likedSongsStation = stationService.getEmptyStation()
    likedSongsStation.name ='Liked Songs'
    likedSongsStation.songs = user.likedSongs || []
    likedSongsStation.imgUrl = "https://t.scdn.co/images/3099b3803ad9496896c43f22fe9be8c4.png"
    setStation(likedSongsStation)
  }, [user])

  if (!user) {
    return (
      <main className="liked-songs">
        <h1>Liked Songs</h1>
        <h4>Please login first</h4>
      </main>
    )
  }
  if(!station) return <Loader />
  return (
    <main className="station-details">
      <StationHeader station={station} isLikedSongsPage={true} />
      <SongList station={station} isLikedSongsPage={true} />
    </main>
  )
}