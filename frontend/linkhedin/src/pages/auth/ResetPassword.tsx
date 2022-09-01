import React from 'react'
import Header from '../../components/auth/Header'
import ResetPasswordForm from '../../components/auth/ResetPasswordForm'
import Footer from '../../components/auth/Footer'
import '../../styles/resetpassword.scss'

export default function ResetPassword() {
    return (
        <div className='resetPasswordPage'>
            <Header />

            <ResetPasswordForm />

            <Footer />
        </div>
    )
}
