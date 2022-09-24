import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { INSERT_EDUCATION, INSERT_NOTIFICATION } from '../../graphql/Mutation'
import { ALL_DEGREES, GET_NOTIFICATIONS, GET_USER_BY_URL, GET_USER_EDUCATION } from '../../graphql/Queries'

export default function EditEduForm() {

    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const id = cookies['user-login-id']
    const url = cookies['user-login']
    
    const[insertEdu] = useMutation(INSERT_EDUCATION)
    const[insertNotif] = useMutation(INSERT_NOTIFICATION)
    const[deg, setDeg] = useState([])
    const[err, setErr] = useState(" ")
    const[school, setSchool] = useState("")
    const[field, setField] = useState("")
    const[start, setStart] = useState("")
    const[degr, setDegr]  = useState("")
    const[desc, setDesc] = useState("")
    const[act, setAct] = useState("")
    const[end, setEnd] = useState("")
    const[grade, setGrade] = useState("")
    const{error: errDeg, loading: loadDeg, data: dataDeg} = useQuery(ALL_DEGREES)
    const{error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables: {
            url
        }
    })

    let navigate = useNavigate()

    useEffect(() => {
        if(dataDeg) {
            setDeg(dataDeg.degrees)
        }
    }, [dataDeg])

    const eduSubmit = () => {
        event?.preventDefault()
        if(school == "") {
            setErr("School must be filled!")
        }
        else if(field == "") {
            setErr("Field must be filled!")
        }
        else if(degr == "0") {
            setErr("Please choose a degree")
        }
        else if(start == "") {
            setErr("Start date must be filled!")
        }
        else {
            setErr("")
            insertEducation()
        }
    }

    const insertEducation = () => {
        insertEdu({
            variables: {
                Grade : parseFloat(grade),
                Activities : act,
                Description : desc,
                Schoolname : school,
                Degreeid : degr,
                Fieldofstudy : field,
                Startdate : start,
                Enddate : end,
                Userid : id,
            }, refetchQueries: [{query: GET_USER_EDUCATION, variables: {
                id: id
            }}]
        })

        insertNotification()

        navigate('/profile/me')
    }
    
    const insertNotification = () => {
        let curr = new Date().toUTCString() + ""
        let text = data['users'][0].firstname + " " + data['users'][0].lastname + " is starting a new education journey in " + school + " with the field of study, " + field + "."

        insertNotif({
            variables: {
                userid: id,
                desc: text,
                date: curr,
            }, refetchQueries: [{query: GET_NOTIFICATIONS}]
        })
    }

    return (
        <div className='edit-edu-form'>
            <h1 className='title'>New Education</h1>
            <div className="form">
                <form action="" className='edit-edu'
                onSubmit={ () => eduSubmit() }>
                    <p className='error'>{ err }</p>
                    <div className="input-edu">
                        <div className="label">
                            <label htmlFor="school">School</label>
                        </div>
                        <div className="input">
                            <input type="text" name="school" id="school" onChange={ (e) => {
                                setSchool(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-edu">
                        <div className="label">
                            <label htmlFor="field">Field of Study</label>
                        </div>
                        <div className="input">
                            <input type="text" name="field" id="field" onChange={ (e) => {
                                setField(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-edu">
                        <div className="label">
                            <label htmlFor="degree">Degree</label>
                        </div>
                        <div className="input">
                            <select name="degree" id="degree" onChange={ (e) => {
                                setDegr(e.target.value)
                            }}>
                                <option value="0">Choose Degree</option>
                                {
                                    deg.map((e) => {
                                        return <option value={e.id} key={e.id}>{ e.degreename }</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>

                    <div className="input-edu">
                        <div className="label">
                            <label htmlFor="desc">Description</label>
                        </div>
                        <div className="input">
                            <textarea name="desc" id="desc" cols="30" rows="10" onChange={ (e) => {
                                setDesc(e.target.value)
                            }}></textarea>
                        </div>
                    </div>

                    <div className="input-edu">
                        <div className="label">
                            <label htmlFor="act">Activities</label>
                        </div>
                        <div className="input">
                            <textarea name="act" id="act" cols="30" rows="10" onChange={ (e) => {
                                setAct(e.target.value)
                            }}></textarea>
                        </div>
                    </div>

                    <div className="input-edu">
                        <div className="label">
                            <label htmlFor="grade">Grade</label>
                        </div>
                        <div className="input">
                            <input type="number" name="grade" id="grade" onChange={ (e) => {
                                setGrade(e.target.value)
                            } }/>
                        </div>
                    </div>

                    <div className="input-edu">
                        <div className="label">
                            <label htmlFor="start">Start Date</label>
                        </div>
                        <div className="input">
                            <input type="text" name="start" id="start" placeholder='YYYY-MM-DD' onChange={ (e) => {
                                setStart(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-edu">
                        <div className="label">
                            <label htmlFor="end">End Date</label>
                        </div>
                        <div className="input">
                            <input type="text" name="end" id="end" placeholder='YYYY-MM-DD' onChange={ (e) => {
                                setEnd(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-edu">
                        <div className="input">
                            <input type="submit" value="Submit" className='submit-edu'
                            onClick={ () => eduSubmit() }/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
