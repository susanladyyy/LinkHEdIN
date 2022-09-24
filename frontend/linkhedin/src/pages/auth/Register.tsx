import React, { useEffect } from 'react'
import Header from '../../components/auth/Header'
import RegisterForm from '../../components/auth/RegisterForm'
import Footer from '../../components/auth/Footer'
import '../../styles/register.scss'
import { useCookies } from 'react-cookie'

export default function Register() {

    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])

    useEffect(() => {
        if(cookies['user-login'] != null) {
            return () => {
                location.href = 'http://localhost:5173/home'
            }
        }
    }, [cookies])    
    

    return (
        <div className='registerPage'>
            <Header />

            <div className="register-title text">
                <p>Make the most of your professional life</p>
            </div>

            <RegisterForm />

            <Footer />
        </div>
    )
}
