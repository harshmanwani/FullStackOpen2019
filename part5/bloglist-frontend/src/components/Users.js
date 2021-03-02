import React, { useEffect } from 'react'
import {initializeUsers} from '../reducer/usersReducer'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

const Users = () => {
    const users = useSelector(state => state.users)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])
    return (
        <>
            <h2>Users</h2>
            {
            users instanceof Array 
            ? 
            <table>
                <tbody>
                    <tr>
                        <th>name</th>
                        <th>blogs created</th>
                    </tr>
                    {users.map(user => <tr key={user.name}><th><Link to={`/users/${user.id}`}>{user.name}</Link></th><th>{user.blogs.length}</th></tr>)}
                </tbody>
            </table>
            :
            <p>loading...</p>
            }
        </>
    )
}

export default Users