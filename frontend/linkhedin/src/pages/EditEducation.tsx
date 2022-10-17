import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import EditEduForm from '../components/edit/EditEduForm'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/editeducation.scss'

export default function EditEducation() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-theme'])
    const theme = cookies['user-theme']

    useEffect(() => {
        if(cookies['user-login'] == null) {
            return () => {
                location.href = 'http://localhost:5173/login'
            }
        }
    }, [cookies])  
    
    return (
        <>
            {
                theme == 1 ? 
                <>
                    <div className='edit-education'>
                        <Header />

                        <EditEduForm />
                    </div>
                    
                    <Footer />
                </>
                :
                <>
                    <div className='edit-edu-dark'>
                        <Header />

                        <EditEduForm />
                    </div>
                    
                    <Footer />
                </>
            }
        </>
    )
}
