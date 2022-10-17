import '../styles/home.scss'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import Miniprofile from '../components/home/MiniProfile'
import StartPost from '../components/home/StartPost'
import Right from '../components/home/Right'
import Post from '../components/post/Post'
import Footer from '../components/Footer'

export default function Home() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-theme'])
    const navigate = useNavigate()
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
            { theme == 1 ?
                <>
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
                                    <Post />
                                </div>
                            </div>
                            <div className="right-home">
                                <Right />
                            </div>
                        </div>
                    </div> 
                    
                    <Footer />
                </>
                :
                <>
                    <div className='home-dark'>
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
                                    <Post />
                                </div>
                            </div>
                            <div className="right-home">
                                <Right />
                            </div>
                        </div>
                    </div> 
                    
                    <Footer />
                </>
            }
        </>
    )
}
