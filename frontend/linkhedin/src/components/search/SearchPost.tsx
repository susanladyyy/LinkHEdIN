import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useParams } from 'react-router-dom'
import { GET_ALL_USERS, GET_POST_BY_CAPTION } from '../../graphql/Queries'
import '../../styles/home.scss'

export default function SearchPost() {

    const param = useParams()
    const title = '%' + param['input'] + '%'
    const{error, loading, data} = useQuery(GET_POST_BY_CAPTION, {
        variables: {
            title: title,
        }
    })
    const{error: errUser, loading: loadUser, data: dataUser} = useQuery(GET_ALL_USERS)

    const[searchedPost, setSearchedPost] = useState([])
    const[user, setUser] = useState([])

    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    let id = cookies['user-login-id']
    
    useEffect(() => {
        if(data) {
            setSearchedPost(data.posts)
        }
        if(dataUser) {
            setUser(dataUser.users)
        }
    }, [data, dataUser])

    return (
        <div className='search-post'>
            <h1>
                Posts
            </h1>
            {
                searchedPost.map((e) => {
                    return (
                        <div className="card" key={e.id}>
                            <div className="card-header">
                                {
                                    user.map((u) => {
                                        if(u.id == e.userid) {
                                            return (
                                                <div className='user-info' key={u.id}>
                                                    {
                                                        u.profile == null ? <img src="src/assets/default-profile-photo.jpg" alt="" width="80px"/> : <img src={ u.profile } alt="" width="100px"/>
                                                    }
                                                    { u.id == id ? 
                                                        <Link to={'/profile/me'}><p>{ u.firstname } { u.lastname }</p></Link>
                                                    :
                                                        <Link to={`/profile/${u.profileurl}`}><p>{ u.firstname } { u.lastname }</p></Link>
                                                    }
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div className="card-body">
                                {e.media == null ? null : <img src={ e.media } alt="" /> }
                                <p className='capt'>Caption</p>
                                <p className='caption'>{ e.caption }</p>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}
