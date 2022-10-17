import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import EditProForm from '../components/edit/EditProForm'
import Footer from '../components/Footer'
import Header from '../components/Header'
import '../styles/editprofile.scss'

export default function EditProfile() {
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
            {theme == 1 ? 
                <>
                    <div className='edit-profile'>
                        <Header />

                        <EditProForm />
                    </div>
                    
                    <Footer />
                </>
                :
                <>
                    <div className='edit-pro-dark'>
                        <Header />

                        <EditProForm />
                    </div>
                    
                    <Footer />
                </>
            }
        </>
    )
}
