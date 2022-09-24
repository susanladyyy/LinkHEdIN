import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import EditExpForm from '../components/edit/EditExpForm'
import Header from '../components/Header'
import '../styles/editexperience.scss'

export default function EditExperience() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])

    useEffect(() => {
        if(cookies['user-login'] == null) {
            return () => {
                location.href = 'http://localhost:5173/login'
            }
        }
    }, [cookies])  
    
    return (
        <div className='edit-experience'>
            <Header />

            <EditExpForm />
        </div>
    )
}
