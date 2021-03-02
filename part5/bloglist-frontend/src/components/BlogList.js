import React from 'react'
import {useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

const BlogList = () => {
    const blogs = useSelector(state => state.blog)

    return (
        <>
        <ListGroup>
            {blogs.map(blog => <ListGroupItem key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></ListGroupItem>)}
        </ListGroup>
        </>
    )
}

export default BlogList