import { useQuery } from '@apollo/client'
import { incognito } from '@cloudinary/url-gen/qualifiers/artisticFilter'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { GET_ALL_USERS, GET_INVITATION_NUM } from '../../graphql/Queries'

export default function Invitations() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const [inv, setInv] = useState([])
    const [user, setUser] = useState([])

    let id = cookies['user-login-id']

    const{error, loading, data} = useQuery(GET_INVITATION_NUM, {
        variables: {
            id: id,
            status: false
        }
    })

    const{error: errAll, loading: loadAll, data: dataAll} = useQuery(GET_ALL_USERS)

    useEffect(() => {
        if(!loading) {
            setInv(data.userconnections)
        }

        if(!loadAll) {
            setUser(dataAll.users)
        }
    }, [loading, loadAll])

    return (
        <div className='invitations'>
            { inv.length == 0 ? 
                <div className="no-invitation">
                    <p>No pending invitations</p>
                </div>
                :
                <div className="title">
                    <h3>Invitations</h3>
                    { loading ? <p>loading...</p> : <p>Pending: { data['userconnections'].length }</p>}
                </div>
            }

            <hr />
            <div className="invitation-list">
                {user.length == 0 ? <h1>Loading...</h1> : user.map((e) => {
                    if(inv.some(item => item.useridconnect == e.id)) {
                        return (
                            <div className="profile-item" key={e.id}>
                                <div className="user-data">
                                    <div className="profile-image">
                                        <img src="src/assets/default-profile-photo.jpg" alt="" />
                                    </div>
                                    <div className="name">
                                        <p>{e.firstname} {e.lastname}</p>
                                    </div>
                                </div>
                                <div className="acceptance">
                                </div>
                                <hr />
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}
