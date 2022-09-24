import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import EditEduForm from '../components/edit/EditEduForm'
import Header from '../components/Header'
import '../styles/editeducation.scss'

export default function EditEducation() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])

    useEffect(() => {
        if(cookies['user-login'] == null) {
            return () => {
                location.href = 'http://localhost:5173/login'
            }
        }
    }, [cookies])  
    
    return (
        <div className='edit-education'>
            <Header />

            <EditEduForm />
        </div>
    )
}
