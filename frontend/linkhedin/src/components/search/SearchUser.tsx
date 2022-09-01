import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SEARCH_USER_BY_NAME } from '../../graphql/Queries'

export default function SearchUser() {
    const param = useParams()
    const name = param['input']
    const[user, setUser] = useState([])

    const{error, loading, data} = useQuery(SEARCH_USER_BY_NAME, {
        variables: {
            name: name
        }
    })

    useEffect(() => {
        if(data) {
            setUser(data.users)
        }
    }, [data])
    

    return (
        <div className='search-user'>
            {
                user.map((e) => {
                    return (
                        <div className="search-profile">
                            <button type='button'>Connect</button>
                            <h1>{e.firstname} {e.lastname}</h1>
                        </div>
                    )
                })
            }
        </div>
    )
}
