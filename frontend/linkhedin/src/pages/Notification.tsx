import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Footer from '../components/Footer'
import Header from '../components/Header'
import NotificationView from '../components/notification/NotificationView'
import '../styles/notification.scss'

export default function Notification() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])

    useEffect(() => {
        if(cookies['user-login'] == null) {
            return () => {
                location.href = 'http://localhost:5173/login'
            }
        }
    }, [cookies])  
    
    return (
        <>
            <div className='notification-page'>
                <Header />

                <NotificationView />
            </div>

            <Footer />
        </>
    )
}
