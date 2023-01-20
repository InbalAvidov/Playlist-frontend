import { useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { Loader } from "../cmps/loader"
import { SongList } from "../cmps/station-song-list"
import { StationHeader } from "../cmps/station-header"

import { useState } from "react"
import { stationService } from "../service/station.service"
import { uploadService } from "../service/upload.service"

export function Station({ saveStation }) {
  const [station, setStation] = useState(null)
  const [isCreateStation, setIsCreateStation] = useState(false)
  const { stationId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (!stationId) {
      setIsCreateStation(true)
      setStation(stationService.getEmptyStation())
    }
    else loadStation()
  }, [])

  async function loadStation() {
    const currStation = await stationService.get(stationId)
    setStation(currStation)
  }


  async function onSelectImg(ev) {
    const imgUrl = await uploadService.uploadImg(ev)
    console.log('imgUrl:',imgUrl)
    station.imgUrl = imgUrl
    return imgUrl
  }
  
  function handleChange(field, val) {
    setStation(prevStation => ({ ...prevStation, [field]: val }))
  }

  function onSaveStation(){
    saveStation(station)
  }

  function saveChanges(){
    stationService.save(station)
  }

  if (!station) return <Loader />
  else return (
    <main className="station-details">
      < StationHeader station={station} saveChanges={saveChanges} onSelectImg={onSelectImg} handleChange={handleChange} onSaveStation={onSaveStation} />
      <SongList station={station} handleChange={handleChange} isCreateStation={isCreateStation} />
    </main>
  )

}