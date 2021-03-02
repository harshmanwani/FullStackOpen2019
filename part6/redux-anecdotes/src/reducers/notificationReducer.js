var timeoutID;

export const setNotification = (notification, seconds) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {notification}
        })
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, seconds * 1000)
    }
}
const notificationReducer = (state = null, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return action.data.notification
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

export default notificationReducer