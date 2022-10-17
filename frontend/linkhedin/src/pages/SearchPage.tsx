import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import Footer from '../components/Footer'
import Header from '../components/Header'
import SearchPost from '../components/search/SearchPost'
import SearchUser from '../components/search/SearchUser'
import '../styles/search/search.scss'

export default function SearchPage() {
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
            {
                theme == 1 ?
                <>
                    <div className='search-page'>
                        <Header />

                        <SearchUser />

                        <SearchPost />
                    </div>

                    <Footer />
                </>
                :
                <>
                    <div className='search-page-dark'>
                        <Header />

                        <SearchUser />

                        <SearchPost />
                    </div>

                    <Footer />
                </>
            }
        </>
    )
}
