import React, { useState } from 'react'
import {useMutation, useQuery} from '@apollo/client'
import {ALL_AUTHORS, CHANGE_AUTHOR} from '../queries'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const authors = useQuery(ALL_AUTHORS, {
    onCompleted: (data) => {
      console.log("Completed 'ALL_AUTHORS'", data)
    }
  })
  const [changeAuthor] = useMutation(CHANGE_AUTHOR, {
    refetchQueries: [{query: ALL_AUTHORS}],
    onCompleted: (data) => {
      console.log("Completed 'CHANGE_AUTHOR'", data)
    }
  })
  const submit = (event) => {
    event.preventDefault()
    changeAuthor({variables: {name, born: Number(born)}})
  }

  if (!props.show) {
    return null
  }
  if(authors.loading) {
    return <div>loading...</div>
  }
  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th>
              name
            </th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {
        window.localStorage.getItem('userToken')
        ?
        <>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <label>
            <select value={name} onChange={({target}) => setName(target.value)}>
              {authors.data.allAuthors.map(a => <option value={a.name} key={a.id}>{a.name}</option>)}
            </select>
          </label>
          <div>
            born:
            <input 
              value={born}
              onChange={({target}) => setBorn(target.value)}
            />
          </div>
          <button>update author</button>
        </form>
        </>
        :
        null
      }
      
    </div>
  )
}

export default Authors
