import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { useCookies } from 'react-cookie'
import { BsPencilSquare } from 'react-icons/bs'
import { GrClose } from 'react-icons/gr'
import { INSERT_JOB, INSERT_NOTIFICATION } from '../../graphql/Mutation'
import { GET_ALL_JOBS, GET_NOTIFICATIONS, GET_USER_BY_URL } from '../../graphql/Queries'

export default function PostJob() {
    const[showModal, setShowModal] = useState(false)
    const[err, setErr] = useState(" ")
    const[name, setName] = useState("")
    const[company, setCompany] = useState("")
    const[location, setLocation] = useState("")
    const[createJob] = useMutation(INSERT_JOB)
    const[createNotif] = useMutation(INSERT_NOTIFICATION)

    const[cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const id = cookies['user-login-id']
    const url = cookies['user-login']

    const{error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables: {
            url
        }
    })

    const show = (showModal: boolean) => {
        showModal ? setShowModal(false) : setShowModal(true)
    } 

    const jobValidation = () => {
        if(name == "") {
            setErr("Job name must be filled")
        }
        else if(company == "") {
            setErr("Job company name must be filled")
        }
        else if(location == "") {
            setErr("Job location must be filled")
        }
        else {
            setErr("")
            insertJob()
        }
    }

    const insertJob = () => {
        createJob ({
            variables: {
                name: name,
                company: company,
                location: location,
                userid: id,
            }, 
            
            refetchQueries: [{ query: GET_ALL_JOBS }]
        })

        let text = data['users'][0].firstname + " " + data['users'][0].lastname + " posted a job offer: " + name + ", " + company
        let curr = new Date().toUTCString() + ""

        createNotif ({
            variables: {
                userid: id,
                desc: text,
                date: curr,
            }, refetchQueries: [{query: GET_NOTIFICATIONS}]
        })

        setShowModal(false)
    }

    return (
        <>
            <div className='post-job'>
                <div className="post-a-job" onClick={ () => show(showModal) }>
                    <i><BsPencilSquare /></i>
                    <p>Post a job</p>
                </div>
            </div>
            
            { showModal ? 
                <div className='job-modal'>
                    <div className="form-modal">
                        <i className='close-icon' onClick={ () => show(showModal) }><GrClose /></i>
                        <h1>New Job</h1>
                        <p className='err'>{ err }</p>

                        <form action="">
                            <div className="input-job">
                                <input type="text" placeholder='Job Name' onChange={ (e) => {
                                    setName(e.target.value)
                                } }/>
                            </div>
                            <div className="input-job">
                                <input type="text" placeholder='Company' onChange={ (e) => {
                                    setCompany(e.target.value)
                                } }/>
                            </div>
                            <div className="input-job">
                                <input type="text" placeholder='Location' onChange={ (e) => {
                                    setLocation(e.target.value)
                                } }/>
                            </div>
                            <div className="input-job submit">
                                <input type="button" value='Post' onClick={ () => jobValidation() }/>
                            </div>
                        </form>
                    </div>
                </div> 
                :
                <div></div>
            }
        </>
    )
}
