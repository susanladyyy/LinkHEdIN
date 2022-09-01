import '../styles/home.scss'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Miniprofile from '../components/home/MiniProfile'
import StartPost from '../components/home/StartPost'
import Right from '../components/home/Right'

export default function Home() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])
    const navigate = useNavigate()

    useEffect(() => {
        if(cookies['user-login'] == null) {
            return () => {
                location.href = 'http://localhost:5173/login'
            }
        }
    }, [cookies])    

    return (
        <div className='home'>
            <Header />

            <div className="home-content">
                <div className="left-home">
                    <Miniprofile />
                </div>
                <div className="middle-home">
                    <div className="start-post">
                        <StartPost />
                        <hr />
                    </div>
                    <div className="posts">

                    </div>
                </div>
                <div className="right-home">
                    <Right />
                </div>
            </div>
        </div> 
    )
}
