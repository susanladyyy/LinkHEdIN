import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { UPDATE_PROFILE } from '../../graphql/Mutation'
import { GET_USER_BY_URL } from '../../graphql/Queries'

export default function EditProForm() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const url = cookies['user-login']
    const id = cookies['user-login-id']
    
    const[err, setErr] = useState(" ")
    const[first, setFirst] = useState("")
    const[second, setSecond] = useState("")
    const[head, setHead] = useState("")
    const[about, setAbout] = useState("")

    const[updateData] = useMutation(UPDATE_PROFILE)

    const{error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables: {
            url: url
        }
    })    

    const proSubmit = () => {
        event?.preventDefault()
        if(first == "") {
            setErr("Firstname must be filled")
        }
        else if(second == "") {
            setErr("Lastname must be filled")
        }
        else {
            setErr("")
            updData()
        }
    }

    const updData = () => {
        updateData({
            variables: {
                id: id,
                firstname: first,
                lastname: second,
                headline: head,
                about: about,
            }
        })

        location.href = '/profile/me'
    }

    return (
        <div className='edit-pro-form'>
            <h1 className='title'>Edit Profile</h1>

            <div className="form" onSubmit={ err == "" ? () => {} : () => {
                proSubmit()
            } }>
                <form action="" className='edit-pro'>
                    <p className='error'>{ err }</p>
                    <div className="input-pro">
                        <div className="label">
                            <label htmlFor="firstname">Firstname</label>
                        </div>
                        <div className="input">
                            <input type="text" name="firstname" id="firstname" onChange={ (e) => {
                                setFirst(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-pro">
                        <div className="label">
                            <label htmlFor="lastname">Lastname</label>
                        </div>
                        <div className="input">
                            <input type="text" name="lastname" id="lastname" onChange={ (e) => {
                                setSecond(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-pro">
                        <div className="label">
                            <label htmlFor="headline">Headline</label>
                        </div>
                        <div className="input">
                            <input type="text" name="headline" id="headline" onChange={ (e) => {
                                setHead(e.target.value)
                            }}/>
                        </div>
                    </div>

                    <div className="input-pro">
                        <div className="label">
                            <label htmlFor="about">About</label>
                        </div>
                        <div className="input">
                            <textarea name="about" id="about" cols="30" rows="10" onChange={ (e) => {
                                setAbout(e.target.value)
                            }}></textarea>
                        </div>
                    </div>

                    <div className="input-pro">
                        <div className="input">
                            <input type="submit" value="Submit" className='submit-pro' onClick={ () => proSubmit() }/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
