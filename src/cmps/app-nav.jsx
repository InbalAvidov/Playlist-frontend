import { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"

import { stationService } from "../service/station.service"
import { loadStations } from "../store/station.actions"
import { login } from '../store/user.action'
import logo from "../assets/img/logo-pic-white.png"

export function AppNav() {
    const user = useSelector((storeState => storeState.userModule.user))
    const stations = useSelector((storeState) => storeState.stationModule.stations)
    const [userStations, setUserStations] = useState(null)

    useEffect(() => {
        loadStations()
        if (!user) {
            login({
                _id: '5cksxjas89xjsa8xjsa8GGG7',
                username: 'guest',
                imgUrl: "https://robohash.org/set=set3",
                fullname: 'Guest',
                likedSongs: [],
                likedStations: []
            })
        }
    }, [])

    useEffect(() => {
        if (user) {
            getUserStations(user)
        }
    }, [user, stations])

    async function getUserStations(user) {
        let userStations = await stationService.query({ userId: user._id })
        userStations = [...userStations, ...user.likedStations]
        setUserStations(userStations)
    }

    return (
        <main className="app-nav">
            <div className="logo">
                <img className="logo-img" src={logo} />
                <h1>Playlist</h1>
            </div>
            <nav className='nav-menu'>
                <ul className='nav-pages'>
                    <li>
                        <NavLink to="/">
                            <svg role="img" height="24" width="24" aria-hidden="true" color='white' className="Svg-sc-ytk21e-0 uPxdw home-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M12.5 3.247a1 1 0 00-1 0L4 7.577V20h4.5v-6a1 1 0 011-1h5a1 1 0 011 1v6H20V7.577l-7.5-4.33zm-2-1.732a3 3 0 013 0l7.5 4.33a2 2 0 011 1.732V21a1 1 0 01-1 1h-6.5a1 1 0 01-1-1v-6h-3v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7.577a2 2 0 011-1.732l7.5-4.33z"></path></svg>
                            <span>Home</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/search">
                            <svg role="img" height="24" width="24" aria-hidden="true" className="Svg-sc-ytk21e-0 uPxdw search-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M10.533 1.279c-5.18 0-9.407 4.14-9.407 9.279s4.226 9.279 9.407 9.279c2.234 0 4.29-.77 5.907-2.058l4.353 4.353a1 1 0 101.414-1.414l-4.344-4.344a9.157 9.157 0 002.077-5.816c0-5.14-4.226-9.28-9.407-9.28zm-7.407 9.279c0-4.006 3.302-7.28 7.407-7.28s7.407 3.274 7.407 7.28-3.302 7.279-7.407 7.279-7.407-3.273-7.407-7.28z"></path></svg>
                            <span>Search</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/library" className="library-nav">
                            <svg role="img" height="24" width="24" aria-hidden="true" className="Svg-sc-ytk21e-0 uPxdw collection-icon" viewBox="0 0 24 24" data-encore-id="icon"><path d="M14.5 2.134a1 1 0 011 0l6 3.464a1 1 0 01.5.866V21a1 1 0 01-1 1h-6a1 1 0 01-1-1V3a1 1 0 01.5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm6 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1z"></path></svg>
                            <span>Your Library</span>
                        </NavLink>
                    </li>
                </ul>
                <div className='nav-user-actions'>
                    <NavLink to="/createStation" className='a-create'>
                        <div className='create-station'>
                            <div className='create-station-box'>
                                <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M15.25 8a.75.75 0 01-.75.75H8.75v5.75a.75.75 0 01-1.5 0V8.75H1.5a.75.75 0 010-1.5h5.75V1.5a.75.75 0 011.5 0v5.75h5.75a.75.75 0 01.75.75z"></path></svg>
                            </div>
                        </div>
                        <span>Create Playlist</span>
                    </NavLink>
                    <NavLink to="/liked">
                        <div className='liked-songs-icon'>
                            <svg role="img" height="12" width="12" aria-hidden="true" viewBox="0 0 16 16" data-encore-id="icon" class="Svg-sc-ytk21e-0 uPxdw"><path d="M15.724 4.22A4.313 4.313 0 0012.192.814a4.269 4.269 0 00-3.622 1.13.837.837 0 01-1.14 0 4.272 4.272 0 00-6.21 5.855l5.916 7.05a1.128 1.128 0 001.727 0l5.916-7.05a4.228 4.228 0 00.945-3.577z"></path></svg>
                        </div>
                        <span>Liked Songs</span>
                    </NavLink>
                </div>
            </nav>
            {userStations && <div className="hr-line"></div>}
            {userStations && <nav className="nav-menu user-station-nav">
                {userStations.map(userStation =>
                    <NavLink key={userStation._id} to={`/station/${userStation._id}`}>
                        <span className="user-station">
                            {userStation.name}
                        </span>
                    </NavLink>)}
            </nav>}
        </main>
    )
}