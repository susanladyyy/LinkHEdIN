import React from 'react'
import Header from '../components/Header'
import Invitations from '../components/network/Invitations'
import MightKnow from '../components/network/MightKnow'
import '../styles/network.scss'

export default function MyNetwork() {
    return (
        <div className='my-network'>
            <Header />

            <Invitations />

            <MightKnow />
        </div>
    )
}
