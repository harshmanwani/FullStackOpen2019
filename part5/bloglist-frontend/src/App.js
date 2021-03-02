import React, {useEffect, useRef } from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {initializeBlogs, addBlog} from './reducer/blogReducer'
import {initializeUser, userLogin} from './reducer/userReducer'
import LoginForm from './components/LoginForm'
import CreateBlogForm from './components/CreateBlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import User from './components/User'
import BlogList from './components/BlogList'
import Blog from './components/Blog'
import Navigation from './components/Navigation'


const App = () => {
  const createBlogFormRef = useRef()
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogs())
  }, [dispatch])

  const handleLogin = (credentials) => {
    dispatch(userLogin(credentials))
  }

  const createBlog = (blogObject) => {
    dispatch(addBlog(blogObject))
    createBlogFormRef.current.toggleVisibility()
  }

  return (
    <div className="container">
      {
        user !== null
          ?
          <Router>
            <Navigation/>
            <h2>blog app</h2>
            <Switch>
              <Route path="/users" exact>
                <Users/>
              </Route>
              <Route path="/users/:id">
                <User/>
              </Route>
              <Route path="/blogs/:id">
                <Blog/>
              </Route>
              <Route path="/">
                <Togglable buttonLabel="new blog" ref={createBlogFormRef}>
                  <CreateBlogForm createBlog={createBlog}/>
                </Togglable>
                <BlogList/>
              </Route>
            </Switch>
          </Router>
          :
          <LoginForm handleLogin={handleLogin}/>
      }
      <Notification/>
    </div>
  )
}

export default App