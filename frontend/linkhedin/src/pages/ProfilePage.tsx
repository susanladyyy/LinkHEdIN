import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import ProfileView from '../components/profile/ProfileView'
import '../styles/profile/profile.scss'

export default function ProfilePage() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-theme'])
    const navigate = useNavigate()
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
                <div className='profile-page'>
                    <Header />

                    <ProfileView />

                    <Footer />
                </div>
                :
                <div className='profile-dark'>
                    <Header />

                    <ProfileView />

                    <Footer />
                </div>
            }
        </>
    )
}
