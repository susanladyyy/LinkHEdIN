import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Invitations from '../components/network/Invitations'
import MightKnow from '../components/network/MightKnow'
import '../styles/network.scss'

export default function MyNetwork() {
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
        <div className='network-page'>
            {
                theme == 1 ? 
                <>
                    <Header />
                    
                    <div className='my-network'>
                        <Invitations />

                        <MightKnow />
                    </div>
                    
                    <Footer />
                </>
                :
                <>
                    <Header />
                    
                    <div className='network-dark'>
                        <Invitations />

                        <MightKnow />
                    </div>
                    
                    <Footer />
                </>
            }
        </div>
    )
}
