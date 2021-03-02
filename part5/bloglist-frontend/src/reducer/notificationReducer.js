let timeoutID

export const setNotification = (message, seconds, style) => {
    return async dispatch => {
        dispatch({
            type: 'SET_NOTIFICATION',
            data: {message, style}
        })
        clearTimeout(timeoutID)
        timeoutID = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, seconds * 1000)
    }
}

const notificationReducer = (state={message: null, style: null}, action) => {
    switch(action.type) {
        case 'SET_NOTIFICATION':
            return {message: action.data.message, style: action.data.style}
        case 'REMOVE_NOTIFICATION':
            return {message: null, style: null}
        default:
            return state
    }
}

export default notificationReducer