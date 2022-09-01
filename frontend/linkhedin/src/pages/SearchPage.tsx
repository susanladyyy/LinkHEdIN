import React from 'react'
import Header from '../components/Header'
import SearchUser from '../components/search/SearchUser'
import '../styles/search/search.scss'

export default function SearchPage() {
    return (
        <div className='search-page'>
            <Header />

            <SearchUser />
        </div>
    )
}
