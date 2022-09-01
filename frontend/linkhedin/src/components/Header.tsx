import React, { useContext, useEffect, useState } from 'react'
import '../styles/header.scss'
import { FaSearch, FaHome } from 'react-icons/fa'
import { BsPeopleFill, BsBagFill, BsChatRightDotsFill } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { FiLogOut } from 'react-icons/fi'
import { useQuery } from '@apollo/client'
import { GET_USER_BY_URL } from '../graphql/Queries'
import { GiHamburgerMenu } from 'react-icons/gi'

export default function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])
    const url = cookies['user-login']
    const navigate = useNavigate()

    const logout = () => {
        if(cookies['user-login']) {
            removeCookie('user-login')
            navigate('/login')
        }
    }

    const[dataLoad, setDataLoad] = useState(false)
    const[input, setInput] = useState("")
    
    const{error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables : { 
            url
        }
    })

    useEffect(() => {
        if(!loading){
            setDataLoad(true)
        }
        else {
            setDataLoad(false)
        }
    }, [loading])

    const search = () => {
        event?.preventDefault()
        let query = '%' + input + '%'
        
        if(input != "") {
            navigate('/search/'+query)
        }
    }
    
    return (
        <>
            <div className='header'>
                <div className="left">
                    <div className="logo">
                        <img src="/src/assets/linkedin_logo.svg" alt="" />
                    </div>
                    <div className="searchBar">
                        <form action="" onSubmit={ () => search() }>
                            <i><FaSearch /></i>
                            <input type="text" name="" id="" placeholder='Search' onChange={ (e) => {
                                setInput(e.target.value)
                            } }/>
                        </form>
                    </div>
                </div>

                <div className="right">
                    <div className="icon hamburger">
                        <GiHamburgerMenu />
                    </div>

                    <ul>
                        <li>
                            <div className="icon">
                                <FaHome />
                            </div>
                            <div className="menu-name">
                                <p><Link to={'/home'}>Home</Link></p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <BsPeopleFill />
                            </div>
                            <div className="menu-name">
                                <p><Link to={'/my-network'}>My Network</Link></p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <BsBagFill />
                            </div>
                            <div className="menu-name">
                                <p><Link to={'/jobs'}>Jobs</Link></p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <BsChatRightDotsFill />
                            </div>
                            <div className="menu-name">
                                <p><Link to={'/messaging'}>Messaging</Link></p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <IoMdNotifications />
                            </div>
                            <div className="menu-name">
                                <p><Link to={'/notification'}>Notification</Link></p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                { dataLoad ? (data['users'][0].profile ? <img src="" alt="" /> : <img src="/src/assets/default-profile-photo.jpg" alt="" />) : null}
                            </div>
                            <div className="menu-name">
                                <p><Link to={'/profile'}>Me</Link></p>
                            </div>
                        </li>
                        <li>
                            <div className="icon">
                                <FiLogOut />
                            </div>
                            <div className="menu-name">
                                <p onClick={ logout } className='logout'>Logout</p>
                            </div>
                        </li>
                    </ul>

                    {/* satu lagi ada menu untuk profile */}
                </div>
            </div>
        </>
    )
}
