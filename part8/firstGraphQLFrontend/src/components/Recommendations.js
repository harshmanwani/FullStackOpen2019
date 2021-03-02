import React, { useEffect } from 'react'
import {useLazyQuery} from '@apollo/client'
import {ALL_BOOKS, ME} from '../queries'

const Recommendations = (props) => {
    const [getMe, me] = useLazyQuery(ME, {
        onCompleted: (data) => {
            console.log("Completed 'ME'", data)
            if(data.me) {
                getRecommendations({
                    variables: {genre: data.me.favoriteGenre}
                })
            }
        },
        fetchPolicy: 'network-only'
    })

    const [getRecommendations, recommendations] = useLazyQuery(ALL_BOOKS, {
        onCompleted: (data) => {
            console.log("Completed 'ALL_BOOKS (RECOMMENDATIONS)'", data)
        },
        fetchPolicy: 'network-only'
    })

    useEffect(() => {
        getMe()
    }, [props.token])

    if(props.show === false) {
        return null
    }

    if(recommendations.loading || me.loading) {
        return <div>loading...</div>
    }

    return(
        <>
            <h2>recommendations</h2>
            <p>books in your favorite genre <b>{me.data.me.favoriteGenre}</b></p>
            <table>
                <thead>
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
                    {
                        recommendations.data.allBooks.map(b => 
                            <tr key={b.title}>
                                <td>{b.title}</td>
                                <td>{b.author.name}</td>
                                <td>{b.published}</td>
                            </tr>
                        )
                        
                    }
                </thead>
            </table>
        </>
    )
    
}

export default Recommendations