import { NavLink} from "react-router-dom"
import logo from "../assets/img/logo.png"
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faHome, faLinesLeaning, faPlus, faHeart } from '@fortawesome/free-solid-svg-icons'

export function AppNav() {
    return (
        <main className="app-nav">
            <div className="logo">
                <img className="logo-img" src={logo} />
                <h1>Playlist</h1>
            </div>
            <nav>
                <NavLink to="/"><FontAwesomeIcon icon={faHome}></FontAwesomeIcon><span>Home</span></NavLink>
                <NavLink to="/search"><FontAwesomeIcon icon={faSearch}></FontAwesomeIcon><span>Search</span></NavLink>
                <NavLink to="/library" className="library-nav"><FontAwesomeIcon icon={faLinesLeaning}></FontAwesomeIcon><span>Your Library</span></NavLink>
                <NavLink to="/create"><FontAwesomeIcon icon={faPlus}></FontAwesomeIcon><span>Create Playlist</span></NavLink>
                <NavLink to="/liked"><FontAwesomeIcon icon={faHeart}></FontAwesomeIcon><span>Liked Songs</span></NavLink>
            </nav>
        </main>
    )
}