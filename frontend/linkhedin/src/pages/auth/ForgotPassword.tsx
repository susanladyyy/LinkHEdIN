import React from 'react'
import ForgotPasswordForm from '../../components/auth/ForgotPasswordForm'
import Header from '../../components/auth/Header'
import Footer from '../../components/auth/Footer'
import '../../styles/forgotpassword.scss'

export default function ForgotPassword() {
    return (
        <div className='forgotPassword'>
            <Header />

            <ForgotPasswordForm />

            <Footer />
        </div>
    )
}
