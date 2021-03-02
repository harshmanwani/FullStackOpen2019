import React, { useState } from 'react'

const OldBlog = ({ blog, handleLike, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  
  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const handleLikeButton = () => {
    handleLike(blog)
  }

  const handleDeleteButton = () => {
    if(window.confirm(`Delete ${blog.title} by ${blog.author} ?`)) {
      handleDelete(blog.id)
    }
  }

  return(
    <div className='blog'>
      <div style={{ ...blogStyle, ...hideWhenVisible }} className='beforeButton'>
        {blog.title} by {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={{ ...blogStyle, ...showWhenVisible }} className='afterButton'>
      Title: {blog.title} <button onClick={toggleVisibility}>hide</button> <br/>
      Author: {blog.author} <br/>
      URL: {blog.url} <br/>
      Likes: {blog.likes} <button onClick={handleLikeButton}>like</button> <br/>
      User: {blog.user ? blog.user.username : 'unknown user'} <br/>
        {blog.user ? (blog.user.username === JSON.parse(window.localStorage.getItem('savedUser')).username ? <button onClick={handleDeleteButton}>delete</button> : null) : null}

      </div>
    </div>


  )
}

export default OldBlog
