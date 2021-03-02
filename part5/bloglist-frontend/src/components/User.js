import React, { useEffect } from 'react'
import {useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {initializeUsers} from '../reducer/usersReducer'

const User = () => {
    const id = useParams().id
    const dispatch = useDispatch()
    const users = useSelector(state => state.users)
    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    const user = users.find(user => user.id === id)
    return (
        <>
            {
                user
                ?
                <>
                    <h2>{user.name}</h2>
                    {
                    user.blogs.length
                    ?
                    <>
                    <h3>added blogs</h3>
                    <ul>
                        {user.blogs.map(blog => <li key={blog.id}>{blog.title}</li>)}
                    </ul>
                    </>
                    :
                    <h3>no blogs</h3>
                    }
                </>
                :
                <p>user not found</p>
            }

        </>
    )
}

export default User