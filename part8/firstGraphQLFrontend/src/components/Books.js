import React, {useState} from 'react'
import {useApolloClient, useQuery, useSubscription} from '@apollo/client'
import {ALL_BOOKS, BOOK_ADDED, ALL_AUTHORS} from '../queries'

const Books = (props) => {
  const [filter, setFilter] = useState(null)

  const client = useApolloClient()

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({subscriptionData}) => {
      const booksInStore = client.readQuery({query: ALL_BOOKS})
      console.log(subscriptionData)
      console.log(booksInStore)
      if(!booksInStore.allBooks.map(b => b.id).includes(subscriptionData.data.bookAdded.id)) {
        client.writeQuery({
          query: ALL_BOOKS,
          data: {allBooks: booksInStore.allBooks.concat(subscriptionData.data.bookAdded)}
        })
        const authorsInStore = client.readQuery({query: ALL_AUTHORS})
        console.log(authorsInStore)
        if(!authorsInStore.allAuthors.map(a => a.name).includes(subscriptionData.data.bookAdded.author.name)) {
          client.writeQuery({
            query: ALL_AUTHORS,
            data: {allAuthors: authorsInStore.allAuthors.concat({name:subscriptionData.data.bookAdded.author.name, born: null, bookCount: 1})}
          })
        } else {
          console.log("yup")
          client.writeQuery({
            query: ALL_AUTHORS,
            data: {allAuthors: authorsInStore.allAuthors.map(a => a.name === subscriptionData.data.bookAdded.author.name ? {...a, bookCount: a.bookCount+1} : a)}
          })
        }
      }
    }
  })

  

  const books = useQuery(ALL_BOOKS, {
    onCompleted: (data) => {
      console.log("Completed 'ALL_BOOKS'", data)
    }
  })
  if (!props.show) {
    return null
  }
  if(books.loading) {
    return <div>loading...</div>
  }
  const allGenres = () => {
    let arr = []
    for(let x = 0; x < books.data.allBooks.length; x++) {
      for(let y = 0; y < books.data.allBooks[x].genres.length; y++) {
        if(!arr.includes(books.data.allBooks[x].genres[y])) {
          arr.push(books.data.allBooks[x].genres[y])
        }
      }
    }
    return arr
  }

  return (
    <div>
      <h2>books</h2>
      {
        filter
        ?
        <p>in genre <b>{filter}</b></p>
        :
        null
      }
      
      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.data.allBooks.map(a =>
            !filter || a.genres.includes(filter)
            ?
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
            :
            null
          )}
        </tbody>
      </table>
      
          {/*books.data.allBooks.reduce((all, cur) => all.concat(cur.genres.reduce((temp,cur) => all.includes(cur) ? temp : temp.concat(cur),[])),[]).map(g => <button onClick={() => setFilter(g)} key={g}>{g}</button>) I mean, it works.*/}
          {allGenres().map(g => <button onClick={() => setFilter(g)} key={g}>{g}</button>)}
          <button onClick={() => setFilter('')}>all genres</button>
    </div>
  )
}

export default Books