import React, { useState } from 'react'

const CreateBlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setUrl('')
    setAuthor('')
  }

  return(
    <div>
      <h2>create new</h2>
      <form data-testid='form' onSubmit={addBlog}>
        <div>
                    title:
          <input
            id='titleInput'
            data-testid='titleInput'
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
                    author:
          <input
            id='authorInput'
            data-testid='authorInput'
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
                    url:
          <input
            id='urlInput'
            data-testid='urlInput'
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id='createButton' type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlogForm