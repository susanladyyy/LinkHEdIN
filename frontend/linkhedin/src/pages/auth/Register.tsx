import React from 'react'
import Header from '../../components/auth/Header'
import RegisterForm from '../../components/auth/RegisterForm'
import Footer from '../../components/auth/Footer'
import '../../styles/register.scss'

export default function Register() {
    return (
        <div className='registerPage'>
            <Header />

            <div className="register-title text">
                <p>Make the most of your professional life</p>
            </div>

            <RegisterForm />

            <Footer />
        </div>
    )
}
