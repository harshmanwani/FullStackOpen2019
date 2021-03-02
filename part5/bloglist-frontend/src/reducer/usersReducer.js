import userService from '../services/users'

export const initializeUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'INITIALIZE_USERS',
            data: {users}
        })
    }
}

const usersReducer = (state = [], action) => {
    switch(action.type) {
        case 'INITIALIZE_USERS':
            return action.data.users
        case 'USER_ADDED_BLOG':
            return state.map(user => user.username === action.data.newBlog.user.username ? {...user, blogs: user.blogs.concat(action.data.newBlog)} : user)
        case 'USER_DELETED_BLOG':
            return state.map(user => ({...user, blogs: user.blogs.filter(blog => blog.id !== action.data.id)}))
        default:
            return state
    }
}

export default usersReducer