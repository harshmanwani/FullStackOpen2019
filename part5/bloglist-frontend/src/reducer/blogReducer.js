import blogService from '../services/blogs'
import {setNotification} from '../reducer/notificationReducer'

export const commentBlog = (id, comment) => {
    return async dispatch => {
        try {
            console.log(id, comment)
            const newComment = await blogService.comment(id, comment)
            dispatch({
                type: 'COMMENT_BLOG',
                data: {id, newComment}
            })
        }
        catch(exception) {

        }
    }
}

export const addBlog = (blogObject) => {
    return async dispatch => {
        try {
            const newBlog = await blogService.create(blogObject)
            dispatch({
                type: 'ADD_BLOG',
                data: {newBlog}
            })
            dispatch({
                type: 'USER_ADDED_BLOG',
                data: {newBlog}
            })
            dispatch(setNotification('Successfully added blog.', 5, 'success'))
        }
        catch(exception) {
            dispatch(setNotification('Error in creating blog.', 5, 'error'))
        }
        
    }
}

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INITIALIZE_BLOGS',
            data: {blogs}
        })
    }
}

export const likeBlog = (id) => {
    return async dispatch => {
        await blogService.like(id)
        dispatch({
            type: 'LIKE_BLOG',
            data: {id}
        })
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        try {
            await blogService.destroy(id)
            dispatch({
                type: 'REMOVE_BLOG',
                data: {id}
            })
            dispatch({
                type: 'USER_DELETED_BLOG',
                data: {id}
            })
            dispatch(setNotification('Successfully removed blog.', 5, 'success'))
        }
        catch(exception) {
            dispatch(setNotification('Error in removing blog.', 5, 'error'))
        }
    }
}

const blogReducer = (state=[], action) => {
    switch(action.type) {
        case 'ADD_BLOG':
            return state.concat(action.data.newBlog)
        case 'REMOVE_BLOG':
            return state.filter(blog => blog.id !== action.data.id)
        case 'LIKE_BLOG':
            return state.map(blog => blog.id === action.data.id ? {...blog, likes: blog.likes+1} : blog)
        case 'INITIALIZE_BLOGS':
            return action.data.blogs
        case 'COMMENT_BLOG':
            return state.map(blog => blog.id === action.data.id ? {...blog, comments: blog.comments.concat(action.data.newComment)} : blog)
        default:
            return state
    }
}

export default blogReducer