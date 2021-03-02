import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { logoutUser } from '../reducer/userReducer'

const Notification = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const notificationStyle = {
        display: 'flex',
        width: '100%',
        backgroundColor: 'lightgrey',
        height: '30px',
        alignItems: 'center'
    }

    const margin = {
        marginLeft: '10px'
    }

    const handleLogout = () => {
        dispatch(logoutUser())
    }

    return(
        <>
            <div style={notificationStyle}>
                <Link to="/" style={margin}>Blogs</Link>
                <Link to="/users" style={margin}>Users</Link>
                <p style={margin}>{user.name} logged in</p>
                <button onClick={handleLogout} style={margin}>logout</button>
            </div>
        </>
    )
}

export default Notification