import loginService from '../services/login'
import blogService from '../services/blogs'
import {setNotification} from '../reducer/notificationReducer'

export const logoutUser = () => {
    return dispatch => {
        window.localStorage.removeItem('savedUser')
        dispatch({
            type: 'REMOVE_USER'
        })
        blogService.setToken(null)
        dispatch(setNotification('Successfully logged out.', 5, 'success'))
    }
}

export const initializeUser = () => {
    return dispatch => {
        const storageUser = window.localStorage.getItem('savedUser')
        if(storageUser) {
            dispatch({
                type: 'SET_USER',
                data: {user: JSON.parse(storageUser)}
            })
            blogService.setToken(JSON.parse(storageUser).token)
        }
    }
}

export const userLogin = (credentials) => {
    return async dispatch => {
        try {
            const user = await loginService.login(credentials)
            window.localStorage.setItem('savedUser', JSON.stringify(user))
            blogService.setToken(user.token)
            dispatch({
                type: 'SET_USER',
                data: {user}
            })
            dispatch(setNotification('Successfully logged in.', 5, 'success'))
        }
        catch(exception){
            dispatch(setNotification('Password or username invalid.', 5,'error'))
        }
        
    }
}

const userReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_USER':
            return action.data.user
        case 'REMOVE_USER':
            return null
        default:
            return state
    }
}

export default userReducer