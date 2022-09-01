import { useQuery } from '@apollo/client'
import React from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { GET_INVITATION_NUM } from '../../graphql/Queries'

export default function MightKnow() {
    const[cookies, setCookies, removeCookies] = useCookies(['user-login', 'user-login-id'])
    const id = cookies['user-login-id']

    const{error, loading, data} = useQuery(GET_INVITATION_NUM, {
        variables: {
            id : id,
            status : true
        }
    })
    
    return (
        <div className='might-know'>
            <div className="title">
                <h2>User You Might Know</h2>
            </div>

            <hr />
            <div className="invitation-list">
                <div className="profile-item">
                    <div className="user-data">
                        <div className="profile-image">
                            <img src="src/assets/default-profile-photo.jpg" alt="" />
                        </div>
                        <div className="name">
                            <p>Username</p>
                        </div>
                    </div>
                    <div className="acceptance">
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}
