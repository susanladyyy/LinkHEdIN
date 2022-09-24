import React, { useEffect } from 'react'
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm'
import Header from '../../components/auth/Header'
import Footer from '../../components/auth/Footer'
import '../../styles/forgotpassword.scss'
import { useCookies } from 'react-cookie'

export default function ForgotPassword() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])

    useEffect(() => {
        if(cookies['user-login'] != null) {
            return () => {
                location.href = 'http://localhost:5173/home'
            }
        }
    }, [cookies])   
    
    return (
        <div className='forgotPassword'>
            <Header />

            <ForgotPasswordForm />

            <Footer />
        </div>
    )
}
