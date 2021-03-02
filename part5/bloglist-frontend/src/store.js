import {createStore, applyMiddleware, combineReducers} from 'redux'
import {composeWithDevTools} from 'redux-devtools-extension'
import notificationReducer from './reducer/notificationReducer'
import blogReducer from './reducer/blogReducer'
import userReducer from './reducer/userReducer'
import usersReducer from './reducer/usersReducer'
import thunk from 'redux-thunk'

const reducer = combineReducers({
    notification: notificationReducer,
    blog: blogReducer,
    user: userReducer,
    users: usersReducer
})

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)))

export default store