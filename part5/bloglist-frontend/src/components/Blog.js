import React, {useState} from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog, commentBlog } from '../reducer/blogReducer'

const Blog = () => {
    const id = useParams().id
    const blogs = useSelector(state => state.blog)
    const blog = blogs.find(blog => blog.id === id)
    const dispatch = useDispatch()
    const [comment, setComment] = useState('')

    const handleLike = () => {
        dispatch(likeBlog(blog.id))
    }

    const handleDelete = () => {
        if(window.confirm(`Delete blog '${blog.title}'?`)) {
            dispatch(removeBlog(blog.id))
        }
    }

    const handleCommentCreation = (e) => {
        e.preventDefault()
        dispatch(commentBlog(blog.id, comment))
        setComment('')
    }

    return(
        <>
        {
            blog
            ?
            <>
                <h2>{blog.title} {blog.author}</h2>
                <p>
                    <a href={blog.url}>{blog.url}</a> <br/>
                    {blog.likes} likes <button onClick={handleLike}>like</button><br/>
                    added by {blog.user ? blog.user.username || 'unknown user' : 'unknown user'}
                    {blog.user ? (blog.user.username === JSON.parse(window.localStorage.getItem('savedUser')).username ? <button onClick={handleDelete}>delete</button> : null) : null}
                </p>
                <h3>comments</h3>
                <form onSubmit={handleCommentCreation}>
                    <input
                        value={comment}
                        onChange={({target}) => setComment(target.value)}
                    />
                    <button>add comment</button>
                </form>
                <ul>
                    {blog.comments.map(comment => <li key={comment.id}>{comment.comment}</li>)}
                </ul>
            </>
            :
            <p>blog not found</p>
        }
        </>
    )
}

export default Blog