import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../../components/auth/Header'
import LoginForm from '../../components/auth/LoginForm'
import Footer from '../../components/auth/Footer'
import '../../styles/login.scss'
import { useCookies } from 'react-cookie'

export default function Login() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])
    const navigate = useNavigate()

    useEffect(() => {
        if(cookies['user-login'] != null) {
            return () => {
                location.href = 'http://localhost:5173/home'
            }
        }
    }, [cookies])    
    
    return (
        <div className='loginPage'>
            <Header />

            <LoginForm />

            <Footer />
        </div>
    )
}
