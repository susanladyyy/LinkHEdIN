import React from 'react'
import AfterRegisterForm from '../../components/auth/AfterRegisterForm'
import Header from '../../components/auth/Header'
import Footer from '../../components/auth/Footer'
import '../../styles/afterregister.scss'

export default function AfterRegister() {
    return (
        <div className='after-registerPage'>
            <Header />

            <div className="after-register-title">
                <p className='text'>Make the most of your professional life</p>
            </div>

            <AfterRegisterForm />

            <Footer />
        </div>
    )
}
