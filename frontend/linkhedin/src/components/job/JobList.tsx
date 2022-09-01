import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_ALL_JOBS } from '../../graphql/Queries'
import { MdBookmark } from 'react-icons/md'
import { useCookies } from 'react-cookie'

export default function JobList() {
    const{error, loading, data} = useQuery(GET_ALL_JOBS)
    const[saved, setSaved] = useState(false)
    const[jobs, setJobs] = useState([])
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const id = cookies['user-login-id']
    const savedArr = [""]

    useEffect(() => {
        if(cookies['user-login'] == null || cookies['user-login-id'] == null){
            location.href = 'http://localhost:5173/login'
        }
        else if(data) {
            setJobs(data.jobs)
        }

    }, [cookies, data])

    return (
        <div className='job-list'>
            { loading ? <h1>Loading...</h1> : 
                jobs.map((e) => {
                    if(e.userid == id) {
                        return (
                            <div className="job-item" key={e.id}>
                                <h2>{ e.name }</h2>
                                <p className='company'>{ e.company }</p>
                                <p className='location'>{ e.location }</p>
                            </div>
                        )
                    }
                    else {
                        return (
                            <div className="job-item" key={e.id}>
                                <i><MdBookmark /></i>
                                <h2>{ e.name }</h2>
                                <p className='company'>{ e.company }</p>
                                <p className='location'>{ e.location }</p>
                            </div>
                        )
                    }
                })
            }
        </div>
    )
}
