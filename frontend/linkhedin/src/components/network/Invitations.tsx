import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { DELETE_CONNECTION, INSERT_CONNECTION, UPDATE_CONNECTION } from '../../graphql/Mutation'
import { GET_ALL_USERS, GET_INVITATION_NUM } from '../../graphql/Queries'

export default function Invitations() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const [inv, setInv] = useState([])
    const [user, setUser] = useState([])
    const [deleteConnect] = useMutation(DELETE_CONNECTION)
    const [insertConnect] = useMutation(INSERT_CONNECTION)
    const [updateConnect] = useMutation(UPDATE_CONNECTION)

    let id = cookies['user-login-id']

    const{error, loading, data} = useQuery(GET_INVITATION_NUM, {
        variables: {
            id: id,
            status: false
        }
    })

    const{error: errAll, loading: loadAll, data: dataAll} = useQuery(GET_ALL_USERS)

    useEffect(() => {
        if(!loadAll) {
            setUser(dataAll.users)
        }

        if(data) {
            setInv(data.userinvitations)
        }
    }, [data, loadAll])

    const ignoreInv = (idCon: string) => {

        deleteConnect ({
            variables: {
                userid: idCon,
                useridconnect: id,
            }
        })

        location.reload()
    }

    const acceptInv = (idCon : string) => {

        updateConnect ({
            variables: {
                userid: idCon,
                useridconnect: id
            }
        })

        insertConnect ({
            variables: {
                userid: id,
                useridconnect: idCon,
                status: true
            }
        })

        location.reload()
    }

    console.log(inv)
    
    return (
        <div className='invitations'>
            { inv.length == 0 ? 
                <div className="no-invitation">
                    <p>No pending invitations</p>
                </div>
                :
                <div className="title">
                    <h2>Invitations</h2>
                    { loading ? <p>loading...</p> : <p>Pending: { data['userinvitations'].length }</p>}
                </div>
            }

            <hr />
            <div className="invitation-list">
                {user.length == 0 ? <h1>Loading...</h1> : user.map((e) => {
                    if(inv.some(item => item.userid == e.id)) {
                        return (
                            <div className="profile-item" key={e.id}>
                                <div className="user-data">
                                    <div className="profile-image">
                                        <img src="src/assets/default-profile-photo.jpg" alt="" />
                                    </div>
                                    <div className="name">
                                        <p><Link to={`/profile/${e.profileurl}`}>{e.firstname} {e.lastname}</Link></p>
                                    </div>
                                    <div className="button">
                                        <button className='ignore' onClick={ () => ignoreInv(e.id) }>Ignore</button>
                                        <button className="accept" onClick={ () => acceptInv(e.id) }>Accept</button>
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
