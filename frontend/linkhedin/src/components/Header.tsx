import React, { useContext, useEffect, useState } from 'react'
import '../styles/header.scss'
import { FaSearch, FaHome } from 'react-icons/fa'
import { BsPeopleFill, BsBagFill, BsChatRightDotsFill, BsSunFill, BsMoonFill, BsSun } from 'react-icons/bs'
import { IoMdNotifications } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { FiLogOut } from 'react-icons/fi'
import { useMutation, useQuery } from '@apollo/client'
import { GET_USER_BY_URL } from '../graphql/Queries'
import { GiHamburgerMenu } from 'react-icons/gi'
import { DELETE_VIEWS, UPDATE_THEME } from '../graphql/Mutation'

export default function Header() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-theme', 'user-login-id', 'user-theme'])
    const url = cookies['user-login']
    const id = cookies['user-login-id']
    const navigate = useNavigate()
    const theme = cookies['user-theme']
    const[deleteViews] = useMutation(DELETE_VIEWS)
    const[updateTheme] = useMutation(UPDATE_THEME)

    const logout = () => {
        if(cookies['user-login']) {
            removeCookie('user-login')
            removeCookie('user-login-id')
            removeCookie('user-theme')
            navigate('/login')

            // deleteViews({
            //     variables: {
            //         deletestatus: true
            //     }
            // })
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

    const toggle = () => {
        let exp = new Date()
        exp.setTime(exp.getTime() + (60*60*1000))

        if (theme == 1) {
            let update = 2
            setCookie('user-theme', update, {expires: exp})

            updateTheme({
                variables: {
                    id: id,
                    theme: 2
                }
            })
        }
        else {
            let update = 1
            setCookie('user-theme', update, {expires: exp})

            updateTheme({
                variables: {
                    id: id,
                    theme: 1
                }
            })
        }
    }

    const search = () => {
        event?.preventDefault()
        
        if(input != "") {
            navigate('/search/' + input)
        }
    }
    
    return (
        <>
            { theme == 1 ? 
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

                        <div className="toggle-theme">
                            <BsSunFill style={{cursor: "pointer"}} onClick={ () => {
                                toggle()
                            }}></BsSunFill>
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
                                    { dataLoad ? (data['users'][0].profile ? <img src={ data['users'][0].profile } alt="" /> : <img src="/src/assets/default-profile-photo.jpg" alt="" />) : null}
                                </div>
                                <div className="menu-name">
                                    <p><Link to={'/profile/me'}>Me</Link></p>
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
                    </div>
                </div>
                :
                <div className='dark-header'>
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

                        <div className="toggle-theme">
                            <BsMoonFill style={{cursor: "pointer"}} onClick={ () => {
                                toggle()
                            }}></BsMoonFill>
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
                                    { dataLoad ? (data['users'][0].profile ? <img src={ data['users'][0].profile } alt="" /> : <img src="/src/assets/default-profile-photo.jpg" alt="" />) : null}
                                </div>
                                <div className="menu-name">
                                    <p><Link to={'/profile/me'}>Me</Link></p>
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
                    </div>
                </div>
            }
        </>
    )
}
