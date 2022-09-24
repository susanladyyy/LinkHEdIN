import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import EditProForm from '../components/edit/EditProForm'
import Header from '../components/Header'
import '../styles/editprofile.scss'

export default function EditProfile() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])

    useEffect(() => {
        if(cookies['user-login'] == null) {
            return () => {
                location.href = 'http://localhost:5173/login'
            }
        }
    }, [cookies]) 
    
    return (
        <div className='edit-profile'>
            <Header />

            <EditProForm />
        </div>
    )
}
