import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Cookies, useCookies } from 'react-cookie'
import { Link } from 'react-router-dom'
import { DELETE_CONNECTION, DELETE_FOLLOWER, DELETE_FOLLOWING, INSERT_CONNECTION, INSERT_FOLLOWER, INSERT_FOLLOWING } from '../../graphql/Mutation'
import { GET_ALL_USERS, GET_CONNECTION_NUM, GET_INVITATION_NUM, GET_USER_FOLLOWER, GET_USER_FOLLOWING } from '../../graphql/Queries'

export default function MightKnow() {
    const[cookies, setCookies, removeCookies] = useCookies(['user-login', 'user-login-id'])
    const id = cookies['user-login-id']

    const[con, setCon] = useState([])
    const[inv, setInv] = useState([])
    const[users, setUsers] = useState([])
    const[followed, setFollowed] = useState([])
    const[following] = useMutation(INSERT_FOLLOWING)
    const[follower] = useMutation(INSERT_FOLLOWER)
    const[removeFolw] = useMutation(DELETE_FOLLOWING)
    const[removeFol] = useMutation(DELETE_FOLLOWER)
    const[invite] = useMutation(INSERT_CONNECTION)
    const[removeInv] = useMutation(DELETE_CONNECTION)
    
    const{error, loading, data} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id : id,
            status : true
        }
    })

    const{error: errPen, loading: loadPen, data: dataPen} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id : id,
            status : false
        }
    })

    const{error: errInv, loading: loadInv, data: dataInv} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id: id,
            status: false
        }
    })

    const{error: errUser, loading: loadUser, data: dataUser} = useQuery(GET_ALL_USERS)

    const{error: errFolw, loading: loadFolw, data: dataFolw} = useQuery(GET_USER_FOLLOWING, {
        variables: {
            id : id
        }
    })

    useEffect(() => {
        if(data) {
            setCon(data.userconnections)
        }

        if(dataUser) {
            setUsers(dataUser.users)
        }

        if(dataPen) {
            setInv(dataPen.userconnections)
        }

        if(dataFolw) {
            setFollowed(dataFolw.userfollowing)
        }

        if(dataInv) {
            setInv(dataInv.userconnections)
        }
    }, [data, dataUser, dataPen, dataFolw, dataInv])
    
    const follow = (followed: string) => {
        following({
            variables: {
                userid: id,
                useridfollowed: followed
            }, 
            refetchQueries: [{ query: GET_USER_FOLLOWING, variables: {
                id: id
            } }]
        })

        follower({
            variables: {
                userid: followed,
                useridfollower: id
            }
        })
    }

    const unfollow = (followed: string) => {
        removeFolw({
            variables: {
                userid: id,
                useridfollowed: followed
            }, 
            refetchQueries: [{ query: GET_USER_FOLLOWING, variables: {
                id: id
            } }]
        })

        removeFol({
            variables: {
                userid: followed,
                useridfollower: id
            }, refetchQueries: [{ query: GET_USER_FOLLOWER, variables: {
                id: followed
            } }]
        })
    }

    const connect = (idCon: string) => {
        invite({
            variables: {
                userid: id,
                useridconnect: idCon,
                status: false,
            }, refetchQueries: [{query: GET_CONNECTION_NUM, variables: {
                id: id,
                status: false,
            } }]
        })
    }

    const withdraw = (idCon : string) => {
        removeInv ({
            variables: {
                userid: id,
                useridconnect: idCon,
            }, refetchQueries: [{query: GET_CONNECTION_NUM, variables: {
                id: id,
                status: false
            }}]
        })
    }

    console.log(inv)

    return (
        <div className='might-know'>
            <div className="title">
                <h2>User You Might Know</h2>
            </div>

            <hr />
            <div className="invitation-list">
                <div className="profile-item">
                    {
                        users.map((e) => {
                            if(e.id != id) {
                                if(con.some(item => item.useridconnect == e.id) == false && inv.some(item => item.useridconnect == e.id) == false) {
                                    return (
                                        <div className="user-data" key={e.id}>
                                            <div className="profile-image">
                                                <img src="src/assets/default-profile-photo.jpg" alt="" />
                                            </div>
                                            <div className="name">
                                                <Link to={ `/profile/${e.profileurl}` }><p>{e.firstname} {e.lastname}</p></Link>
                                            </div>
                                            <div className="buttons">
                                                { followed.some(item => item.useridfollowed == e.id) == true ?
                                                    <div className="unfollow">
                                                        <button type='button' onClick={ () => unfollow(e.id) }>Unfollow</button>
                                                    </div>
                                                    :
                                                    <div className="follow">
                                                        <button type='button' onClick={ () => follow(e.id) }>Follow</button>
                                                    </div>
                                                }
                                                <div className="connect">
                                                    { inv.length == 0 || (inv.some(item => item.userid == e.id) == false) ?
                                                        <button type='button' onClick={ () => connect(e.id) }>Connect</button>
                                                        :
                                                        <button type='button' onClick={ () => withdraw(e.id) }>Withdraw</button>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }
                            else {
                                return (
                                    <></>
                                )
                            }
                        })
                    }
                    <div className="acceptance">
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}
