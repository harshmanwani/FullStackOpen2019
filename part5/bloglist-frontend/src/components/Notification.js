import React from 'react'
import {useSelector} from 'react-redux'
import Alert from 'react-bootstrap/Alert'

const Notification = () => {
  const notification = useSelector(state => state.notification)
  return(
    <div>
      {

        notification.message
          ?

          <Alert variant={notification.style === 'error' ? 'danger' : 'success'}>
            {notification.message}
          </Alert>

          :
          <></>

      }
    </div>
  )
}

export default Notification