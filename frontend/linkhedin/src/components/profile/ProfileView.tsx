import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GET_ALL_USER_EDUCATION, GET_JOB_BY_USER_ID, GET_USER_BY_URL } from '../../graphql/Queries'
import { useCookies } from 'react-cookie'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'

export default function ProfileView() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const url = cookies['user-login']
    const id = cookies['user-login-id']

    const[dataLoad, setDataLoad] = useState(false)
    const[jobs, setJobs] = useState([])
    
    const{error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables : { 
            url
        }
    })

    const{error: errEdu, loading: loadEdu, data: dataEdu} = useQuery(GET_ALL_USER_EDUCATION, {
        variables: {
            id
        }
    })

    const{error: errJob, loading: loadJob, data: dataJob} = useQuery(GET_JOB_BY_USER_ID, {
        variables: {
            id
        }
    })

    useEffect(() => {
        if(!loading){
            setDataLoad(true)
        }
        else {
            setDataLoad(false)
        }

        if(!loadJob) {
            setJobs(dataJob.jobs)
        }

        if(dataJob) {
            setJobs(dataJob.jobs)
        }
    }, [loading, loadJob, dataJob])
    
    let navigate = useNavigate()

    return (
        <div className='profileView'>
            <div className="left-profile">
                <div className="profile">
                    <div className="banner">
                        { dataLoad ? (data['users'][0].banner ? <img src="" alt="not found" /> : <img src="/src/assets/default_banner.jpg" alt="not found" />) : null }
                    </div>
                    <div className="profile-image">
                        { dataLoad ? (data['users'][0].profile ? <img src="" alt="not found" /> : <img src="/src/assets/default-profile-photo.jpg" alt="not found" />) : null }
                    </div>
                    <div className="profile-data">
                        { dataLoad ? <h1>{data['users'][0].firstname } { data['users'][0].lastname }</h1> : <h1>Loading...</h1> }
                        { dataLoad ? (data['users'][0].headline ? <p>{ data['users'][0].headline }</p> : <p></p>) : null } 
                        { dataLoad ? (data['users'][0].locationid ? <p>Show Location</p> : <p></p>) : null}
                    </div>
                </div>

                <div className="analytics">
                    <h1>Analytics</h1>
                </div>

                {/* <div className="resources">
                    <h1>Resources</h1>
                </div> */}

                <div className="about">
                    <div className="edit-icon">
                        <MdOutlineModeEditOutline />
                    </div>

                    <p className='title-about'>About</p>

                    <div className="content-about">
                        { dataLoad ? (data['users'][0].about != "" ? <p> { data['users'][0].about } </p> : <p>Start writing about yourself</p>) : null }
                    </div>
                </div>

                <div className="activity">
                    <h1>Activity</h1>
                </div>

                <div className="experience">
                    <h1>Experience</h1>
                </div> 

                { id == "" ? <p>loading...</p> : 
                    (!loadEdu ? (dataEdu['usereducations'].length != 0 ? 
                    <div className="education">
                        <h1>Education</h1>
                    </div> : 
                    <div></div>
                    ) : null )
                }

                {
                    id == "" ? <p>loading...</p> :
                    (
                        (!loadJob ? 
                            (dataJob['jobs'].length != 0 ? 
                                <div className="uploaded-jobs">
                                    <i onClick={ () => {
                                        navigate('/jobs')
                                    }}><IoMdAdd /></i>
                                    <p className='title-job'>Posted Jobs</p>

                                    <div className="list-job">
                                        { jobs.map((e) => {
                                            return (
                                                <p>{e.name}</p>
                                            )
                                        }) }
                                    </div>
                                </div> 
                                : 
                                <div></div>
                            ) : null
                        )
                    )
                }

                <div className="license-certif">
                    <h1>Licenses & Certifications</h1>
                </div>

                <div className="skill">
                    <h1>Skills</h1>
                </div>

                <div className="interest">
                    <h1>Interests</h1>
                </div>
            </div>

            <div className="right-profile">
                <div className="edit-profile">
                    <h1>Edit Profile URL</h1>
                    <hr />
                    <h1>Add Language</h1>
                </div>
                <Link to={'/jobs'}>
                    <div className="jobs-profile">
                        <img src="/src/assets/jobs_img.jpg" alt="" />
                    </div>
                </Link>
                <div className="people-also-viewed">
                    <h2>People also viewed</h2>
                </div>
            </div>
        </div>
    )
}
