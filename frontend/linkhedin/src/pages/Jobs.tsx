import React from 'react'
import Footer from '../components/auth/Footer'
import Header from '../components/Header'
import JobList from '../components/job/JobList'
import PostJob from '../components/job/PostJob'
import '../styles/job/job.scss'

export default function Jobs() {
    return (
        <div className='job-page'>
            <Header />

            <div className="job">
                <PostJob />

                <JobList />
            </div>
        </div>
    )
}
