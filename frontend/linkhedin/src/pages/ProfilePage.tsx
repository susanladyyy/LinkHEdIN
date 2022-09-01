import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/auth/Footer'
import Header from '../components/Header'
import ProfileView from '../components/profile/ProfileView'
import '../styles/profile/profile.scss'

export default function ProfilePage() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])
    const navigate = useNavigate()

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

            <ProfileView />

            {/* bikin footer untuk authorized page */}
        </div>
    )
}
