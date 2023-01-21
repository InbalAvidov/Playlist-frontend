import { stationService } from "../service/station.service"
import { SET_STATIONS, UPDATE_CURRENT_STATION, ADD_STATION, UPDATE_STATION } from "./station.reducer"
import { store } from "./store"

export async function loadStations() {
    try {
        const stations = await stationService.query()
        store.dispatch({ type: SET_STATIONS, stations })
    } catch (err) {
        console.log('Had issues loading stations', err)
        throw err
    }
}

export async function loadCurrStation(stationId) {
    // console.log
    try {
        const currStation = await stationService.get(stationId)
        store.dispatch({ type: UPDATE_CURRENT_STATION, currStation })
    } catch (err) {
        console.log('Had issues loading current station', err)
        throw err
    }
}

export async function saveStation(station) {
    try {
        const newStation = await stationService.save(station)
        store.dispatch({ type: ADD_STATION, station: newStation })
    } catch (err) {
        console.log('Had issues to get current station', err)
        throw err
    }
}

export async function updateStation(station) {
    try {
        const updatedStation = await stationService.save(station)
        store.dispatch({ type: UPDATE_STATION, station: updatedStation })
    } catch (err) {
        console.log('Had issues to get current station', err)
        throw err
    }
}
