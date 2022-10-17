import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import EditExpForm from '../components/edit/EditExpForm'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/editexperience.scss'

export default function EditExperience() {
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
            { theme == 1 ? 
                <>
                    <div className='edit-experience'>
                        <Header />

                        <EditExpForm />
                    </div>
                    
                    <Footer />
                </>
                :
                <>
                    <div className='edit-exp-dark'>
                        <Header />

                        <EditExpForm />
                    </div>
                    
                    <Footer />
                </>
            }
        </>
    )
}
