import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Invitations from '../components/network/Invitations'
import MightKnow from '../components/network/MightKnow'
import '../styles/network.scss'

export default function MyNetwork() {
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
            <div className='my-network'>
                <Header />

                <Invitations />

                <MightKnow />
            </div>
            
            <Footer />
        </>
    )
}
