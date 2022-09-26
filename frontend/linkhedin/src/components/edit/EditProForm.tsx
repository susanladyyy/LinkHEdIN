import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import Axios, { AxiosResponse } from 'axios'
import { useCookies } from 'react-cookie'
import { UPDATE_PROFILE } from '../../graphql/Mutation'
import { GET_USER_BY_URL } from '../../graphql/Queries'

export default function EditProForm() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const url = cookies['user-login']
    const id = cookies['user-login-id']
    const up_preset = "linkhedin_su"
    
    const[err, setErr] = useState(" ")
    const[first, setFirst] = useState("")
    const[second, setSecond] = useState("")
    const[head, setHead] = useState("")
    const[about, setAbout] = useState("")
    const[ban, setBan] = useState("")
    const[pro, setPro] = useState("")

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

    const updData = async () => {
        console.log(ban)
        const config = {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        };

        let profilePromise = null
        let bannerPromise = null
        
        if(ban.length != 0) {
            const formData = new FormData()

            formData.append("file", ban)
            formData.append("upload_preset", up_preset)

            bannerPromise = Axios.post("https://api.cloudinary.com/v1_1/cloudinarysu/upload", formData, config).then((response) => {
                return response.data
            })
        }

        if(pro.length != 0) {
            const formData = new FormData()

            formData.append("file", pro)
            formData.append("upload_preset", up_preset)

            profilePromise = Axios.post("https://api.cloudinary.com/v1_1/cloudinarysu/upload", formData, config).then((response) => {
                return response.data
            })
        }

        const profileRe= Promise.resolve(profilePromise)
        const bannerRe= Promise.resolve(bannerPromise)

        let profileStr = profileRe.then((value) => {
            if(value) return value.url
            return null
        })

        let bannerStr = bannerRe.then((value) => {
            if(value) return value.url
            return null
        })

        const profile = Promise.resolve(profileStr)
        const profileValue = await profile

        const banner = Promise.resolve(bannerStr)
        const bannerValue = await banner
        
        console.log(profileValue)
        console.log(bannerValue)

        if(profileValue != null && bannerValue != null) {
            updateData({
                variables: {
                    id: id,
                    firstname: first,
                    lastname: second,
                    headline: head,
                    about: about,
                    profile: profileValue,
                    banner: bannerValue,
                }
            })
        }
        else if(profileValue == null) {
            updateData({
                variables: {
                    id: id,
                    firstname: first,
                    lastname: second,
                    headline: head,
                    about: about,
                    profile: "",
                    banner: bannerValue,
                }
            })
        }

        else if(bannerValue == null) {
            updateData({
                variables: {
                    id: id,
                    firstname: first,
                    lastname: second,
                    headline: head,
                    about: about,
                    profile: profileValue,
                    banner: "",
                }
            })
        }
        else {
            updateData({
                variables: {
                    id: id,
                    firstname: first,
                    lastname: second,
                    headline: head,
                    about: about,
                    profile: "",
                    banner: "",
                }
            })
        }

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
                            <label htmlFor="banner">Profile Banner</label>
                        </div>
                        <div className="input">
                            <input type="file" name="banner" id="banner" onChange={ (e) => {
                                setBan(e.target.files[0])
                            }}/>
                        </div>
                    </div>

                    <div className="input-pro">
                        <div className="label">
                            <label htmlFor="profile">Profile Picture</label>
                        </div>
                        <div className="input">
                            <input type="file" name="profile" id="profile" onChange={ (e) => {
                                setPro(e.target.files[0])
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
