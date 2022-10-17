import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Message from '../components/message/Message'
import '../styles/messaging.scss'

export default function Messaging() {
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
                <div className='message-page'>
                    <Header />

                    <Message />

                    <Footer />
                </div>
                :
                <div className='message-page-dark'>
                    <Header />

                    <Message />

                    <Footer />
                </div>
            }
        </>
    )
}
