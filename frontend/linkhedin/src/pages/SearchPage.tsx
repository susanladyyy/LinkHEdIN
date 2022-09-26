import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchUser from '../components/search/SearchUser'
import '../styles/search/search.scss'

export default function SearchPage() {
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
            <div className='search-page'>
                <Header />

                <SearchUser />
            </div>

            <Footer />
        </>
    )
}
