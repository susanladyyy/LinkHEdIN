import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { INSERT_EXPERIENCE, INSERT_NOTIFICATION } from '../../graphql/Mutation'
import { ALL_EMPLOYMENT_TYPES, GET_NOTIFICATIONS, GET_USER_BY_URL, GET_USER_EXPERIENCE } from '../../graphql/Queries'

export default function EditExpForm() {

    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const id = cookies['user-login-id']
    const url = cookies['user-login']

    const[insertExp] = useMutation(INSERT_EXPERIENCE)
    const[insertNotif] = useMutation(INSERT_NOTIFICATION)
    const[title, setTitle] = useState("")
    const[type, setType] = useState("")
    const[comp, setComp] = useState("")
    const[loc, setLoc] = useState("")
    const[start, setStart] = useState("")
    const[end, setEnd] = useState("")
    const[desc, setDesc] = useState("")
    const[ind, setInd] = useState("")
    const[err, setErr] = useState(" ")
    const[empType, setEmpType] = useState([])
    let navigate = useNavigate()

    const{error: errType, loading: loadType, data: dataType} = useQuery(ALL_EMPLOYMENT_TYPES)
    const{error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables: {
            url
        }
    })
    
    const expSubmit = () => {
        event?.preventDefault()
        if(title == ""){
            setErr("Title must be filled!")
        }
        else if(type == "0") {
            setErr("Please choose an employment type!")
        }
        else if(comp == "") {
            setErr("Company name must be filled!")
        }
        else if(loc == "") {
            setErr("Location must be filled!")
        }
        else if(start == "") {
            setErr("Start date must be filled!")
        }
        else if(ind == "") {
            setErr("Industry name must be filled!")
        }
        else {
            setErr("")
            insertExpe()
        }
    }

    const insertExpe = () => {
        insertExp({
            variables: {
                Userid: id,
                Title: title,
                Employmentypeid: type,
                Companyname: comp,
                Location: loc,
                Startdate: start,
                Enddate: end,
                Description: desc,
                Industry: ind,
            }, refetchQueries: [{query: GET_USER_EXPERIENCE, variables: {
                id: id
            }}]
        })

        insertNotification()

        navigate('/profile/me')
    }

    const insertNotification = () => {
        let curr = new Date().toUTCString() + ""
        let text = data['users'][0].firstname + " " + data['users'][0].lastname + " added a new experience as a " + title + " in " + comp + "."

        insertNotif({
            variables: {
                userid: id,
                desc: text,
                date: curr,
            }, refetchQueries: [{query: GET_NOTIFICATIONS}]
        })
    }

    useEffect(() => {
        if(dataType) {
            setEmpType(dataType.employmenttypes)
        }
    }, [dataType])

    console.log(dataType)
    
    return (
        <div className='edit-exp-form'>
            <h1 className='title'>New Experience</h1>
            
            <div className="form" onSubmit={ () => expSubmit() }>
                <form action="" className='edit-exp'>
                    <p className='error'>{ err }</p>
                    <div className="input-exp">
                        <div className="label">
                            <label htmlFor="title">Title</label>
                        </div>
                        <div className="input">
                            <input type="text" name="title" id="title" onChange={ (e) => {
                                setTitle(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-exp">
                        <div className="label">
                            <label htmlFor="type">Employment Type</label>
                        </div>
                        <div className="input">
                            <select name="type" id="type" onChange={ (e) => {
                                setType(e.target.value)
                            }}>
                                <option value="0">Choose Employment Type</option>
                                {
                                    empType.map((e) => {
                                        return <option value={e.id}>{ e.employmenttypename }</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="input-exp">
                        <div className="label">
                            <label htmlFor="comp">Company Name</label>
                        </div>
                        <div className="input">
                            <input type="text" name="comp" id="comp" onChange={ (e) => {
                                setComp(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-exp">
                        <div className="label">
                            <label htmlFor="loc">Location</label>
                        </div>
                        <div className="input">
                            <input type="text" name="loc" id="loc" onChange={ (e) => {
                                setLoc(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-exp">
                        <div className="label">
                            <label htmlFor="desc">Description</label>
                        </div>
                        <div className="input">
                            <textarea name="desc" id="desc" cols="30" rows="10" onChange={ (e) => {
                                setDesc(e.target.value)
                            }}></textarea>
                        </div>
                    </div>

                    <div className="input-exp">
                        <div className="label">
                            <label htmlFor="ind">Industry</label>
                        </div>
                        <div className="input">
                            <input type="text" name="ind" id="ind" onChange={ (e) => {
                                setInd(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-exp">
                        <div className="label">
                            <label htmlFor="start">Start Date</label>
                        </div>
                        <div className="input">
                            <input type="text" name="start" id="start" placeholder='YYYY-MM-DD' onChange={ (e) => {
                                setStart(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-exp">
                        <div className="label">
                            <label htmlFor="end">End Date</label>
                        </div>
                        <div className="input">
                            <input type="text" name="end" id="end" placeholder='YYYY-MM-DD' onChange={ (e) => {
                                setEnd(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-exp">
                        <div className="input">
                            <input type="submit" value="Submit" className='submit-exp' onClick={ () => expSubmit() }/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
