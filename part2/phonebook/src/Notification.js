import React from 'react';

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={message.type ? 'success' : 'error'}>
      {message.data}
    </div>
  )
}

export default Notification;