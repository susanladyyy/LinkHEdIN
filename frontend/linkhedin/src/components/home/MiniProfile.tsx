import React, { useEffect, useState } from 'react'
import { MdBookmark } from 'react-icons/md'
import { IoMdAdd } from 'react-icons/io'
import { useCookies } from 'react-cookie'
import { useQuery } from '@apollo/client'
import { GET_CONNECTION_NUM, GET_INVITATION_NUM, GET_USER_BY_URL } from '../../graphql/Queries'
import { useNavigate } from 'react-router-dom'

export default function miniprofile() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const url = cookies['user-login']
    const id = cookies['user-login-id']
    const[dataLoad, setDataLoad] = useState(false)
    let navigate = useNavigate()
    const[inv, setInv] = useState([])
    const[con, setCon] = useState([])
    const{error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables: {
            url
        }
    })

    const{error: errCon, loading: loadCon, data: dataCon} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id : id,
            status : true,
        }
    })

    const{error: errInv, loading: loadInv, data: dataInv} = useQuery(GET_INVITATION_NUM, {
        variables: {
            id : id,
            status : false,
        }
    })

    useEffect(() => {
        if(!loading){
            setDataLoad(true)
        }
        else {
            setDataLoad(false)
        }

        if(dataCon) {
            setCon(dataCon.userconnections)
        }

        if(dataInv) {
            setInv(dataInv.userinvitations)
        }
    }, [loading, dataCon, dataInv])

    return (
        <div className='mini-profile'>
            <div className="top">
                <div className="banner">
                    { dataLoad ? (data['users'][0].banner ? <img src="" alt="not found" /> : <img src="/src/assets/default_banner.jpg" alt="not found" />) : null }
                </div>
                <div className="profile">
                    { dataLoad ? (data['users'][0].profile ? <img src="" alt="not found" /> : <img src="/src/assets/default-profile-photo.jpg" alt="not found" />) : null }
                </div>
                <div className="profile-data">
                    { dataLoad ? <p className='name'>{ data['users'][0].firstname } {data['users'][0].lastname}</p> : <p className='name'>loading...</p>}

                    <p>Student At</p>
                    <hr />
                    <div className="connections">
                        <p>Connections</p>
                        {loadCon ? 
                            <p className='no-con'>loading...</p>
                            :
                            <p className='no-con'>{ con.length }</p>
                        }
                        
                    </div>
                    <div className="invitations">
                        <p>Invitation</p>
                        {loadInv ? 
                            <p className='no-inv'>loading...</p> 
                            : 
                            <p className='no-inv' onClick={ () => {
                                navigate('/my-network')
                            }}>{ inv.length }</p>
                        }
                    </div>  
                    <hr />
                    <div className="try-premium">
                        <p>Access exclusive tools & insights</p>
                        <a href="https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=&cad=rja&uact=8&ved=2ahUKEwj_rPS3pef5AhXqFLcAHY3fCTQQFnoECAwQAQ&url=https%3A%2F%2Fpremium.linkedin.com%2F&usg=AOvVaw3Cro2Y2BIMly2gnbaqx2Ec">Try Premium for Free</a>
                    </div>
                    <hr />
                    <div className="my-items">
                        <i><MdBookmark /></i>
                        <p>My Items</p>
                    </div>
                </div>
            </div>

            <div className="bottom">
                <p className="groups">Groups</p>
                <div className="events">
                    <i><IoMdAdd /></i>
                    <p>Events</p>
                </div>
                <p className="hashtag">Followed Hashtags</p>
                <hr />
                <div className="discover">
                    <a href=''>Discover More</a>
                </div>
            </div>
        </div>
    )
}
