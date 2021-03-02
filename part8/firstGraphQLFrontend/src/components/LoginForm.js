import React, {useState} from 'react'
import {LOGIN} from '../queries'
import {useApolloClient, useMutation} from '@apollo/client'

const LoginForm = ({show, setToken, setPage}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const client = useApolloClient()
    const [getToken] = useMutation(LOGIN, {
        onCompleted: (data) => {
            console.log("Completed 'LOGIN'", data)
            setToken(data.login.value)
            window.localStorage.setItem('userToken', data.login.value)
            setPage('authors')
            client.resetStore()
        }
    })

    const handleSubmit = (event) => {
        event.preventDefault()
        getToken({variables: {username, password}})
    }

    if(show) {
        return(
            <form onSubmit={handleSubmit}>
                <div>
                    username:
                    <input
                    value={username}
                    onChange={({target}) => {setUsername(target.value)}}
                    />
                </div>
                <div>
                    password:
                    <input
                    value={password}
                    onChange={({target}) => {setPassword(target.value)}}
                    type='password'
                    />
                </div>
                <button>login</button>
            </form>
        )
    } else {
        return null
    }
}

export default LoginForm