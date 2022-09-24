import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Footer from '../components/auth/Footer'
import Header from '../components/Header'

export default function Messaging() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])

    useEffect(() => {
        if(cookies['user-login'] == null) {
            return () => {
                location.href = 'http://localhost:5173/login'
            }
        }
    }, [cookies])  
    
    return (
        <div>
            <Header />
        </div>
    )
}
