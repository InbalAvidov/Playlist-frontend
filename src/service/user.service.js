import { storageService } from './async-storage.service'
import { httpService } from './http.service'
import { stationService } from './station.service'
import { utilService } from './util.service'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const USERS_KEY = 'users'
let users
_createUsers()

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    saveLocalUser,
    getUsers,
    getById,
    remove,
    update,
    // changeScore,
    getEmptyCredentials,
    updateLikeSong,
    updateLikeStation
}

window.userService = userService


function getUsers() {
    return storageService.query(USERS_KEY)
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get(USERS_KEY, userId)
    // const user = await httpService.get(`user/${userId}`)
    return user
}

function remove(userId) {
    return storageService.remove(USERS_KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    const newUser = await storageService.put(USERS_KEY, user)
    if (getLoggedinUser()._id === user._id) saveLocalUser(newUser)
    return newUser
}

async function login(userCred) {
    const users = await storageService.query(USERS_KEY)
    const user = users.find(user => user.username === userCred.username)
    // const user = await httpService.post('auth/login', userCred)
    if (user) {
        // socketService.login(user._id)
        return saveLocalUser(user)
    }
}
async function signup(userCred) {
    userCred.score = 10000
    userCred.likedSongs = []
    userCred.likedStations = []
    if (!userCred.imgUrl) userCred.imgUrl = 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png'
    const user = await storageService.post(USERS_KEY, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.login(user._id)
    return saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.logout()
    // return await httpService.post('auth/logout')
}

// async function changeScore(by) {
//     const user = getLoggedinUser()
//     if (!user) throw new Error('Not loggedin')
//     user.score = user.score + by || by
//     await update(user)
//     return user.score
// }


function saveLocalUser(user) {
    user = { _id: user._id, fullname: user.fullname,username: user.username, imgUrl: user.imgUrl, likedSongs: user.likedSongs , likedStations : user.likedStations}
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function getEmptyCredentials() {
    return {
        fullname: '',
        email: '',
        username: '',
        password: '',
    }
}

function _createUsers() {
    let users = utilService.loadFromStorage(USERS_KEY)
    if (!users || !users.length) {
        users = [
            {
                _id: '5cksxjas89xjsa8xjsa8jld3',
                fullname: 'Inbal Avidov',
                email: 'inbal.avidov@gmail.com',
                username: 'inbal.avidov',
                password: 'inbal',
                likedSongs: [],
                likedStations : []
            }, {
                _id: '5cksxjas89xjsa8xjsa8jjj7',
                fullname: 'Omri Hazan',
                email: 'omrihazan1313@gmail.com',
                username: 'omri.hazan',
                password: 'omri',
                likedSongs: [],
                likedStations : []
            },
            {
                _id: '5cksxjas89xjsa8xjsa8hhh7',
                fullname: 'Hila Shor',
                email: 'hilashor@gmail.com',
                username: 'hila.shor',
                password: 'hila',
                likedSongs: [],
                likedStations : []
            },
            {
                _id: '5cksxjas89xjsa8xjsa8GGG7',
                fullname: 'Guest',
                email: 'guest@gmail.com',
                username: 'guest',
                password: 'guest',
                likedSongs: [],
                likedStations : []
            }
        ]
        utilService.saveToStorage(USERS_KEY, users)
    }
}

async function updateLikeSong(song) {
    const user = getLoggedinUser()
    const isAdd = !user.likedSongs.find(({id}) =>id === song.id)
    if (isAdd) user.likedSongs.push(song)
    else user.likedSongs = user.likedSongs.filter(({ id }) => id !== song.id)
    const updatedUser = await update(user)
    return updatedUser
}
async function updateLikeStation(currStation) {
    const user = getLoggedinUser()
    const {_id , name} = currStation
    const station = {
        _id,
        name
    }
    const isAdd = !user.likedStations.find(({_id}) => _id === station._id)
    if (isAdd) user.likedStations.push(station)
    else user.likedStations = user.likedStations.filter(({ _id }) => _id !== station._id)
    const updatedUser = await update(user)
    return updatedUser
}
// ;(async ()=>{
//     await userService.signup({fullname: 'Puki Norma', username: 'puki', password:'123',score: 10000, isAdmin: false})
//     await userService.signup({fullname: 'Master Adminov', username: 'admin', password:'123', score: 10000, isAdmin: true})
//     await userService.signup({fullname: 'Muki G', username: 'muki', password:'123', score: 10000})
// })()



