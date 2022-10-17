import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Footer from '../components/Footer'
import Header from '../components/Header'
import JobList from '../components/job/JobList'
import PostJob from '../components/job/PostJob'
import '../styles/job/job.scss'

export default function Jobs() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-theme'])
    const theme = cookies['user-theme']

    useEffect(() => {
        if(cookies['user-login'] == null) {
            return () => {
                location.href = 'http://localhost:5173/login'
            }
        }
    }, [cookies])  
    
    return (
        <>
            {
                theme == 1 ?
                <>
                    <div className='job-page'>
                        <Header />

                        <div className="job">
                            <PostJob />

                            <JobList />
                        </div>
                    </div>
                    
                    <Footer />
                </>
                :
                <>
                <div className='job-dark'>
                        <Header />

                        <div className="job">
                            <PostJob />

                            <JobList />
                        </div>
                    </div>
                    
                    <Footer />
                </>
            }
        </>
    )
}
