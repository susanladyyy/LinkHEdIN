import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { Link, useParams } from 'react-router-dom'
import { DELETE_CONNECTION, INSERT_CONNECTION } from '../../graphql/Mutation'
import { GET_CONNECTION_NUM, GET_INVITATION_NUM, SEARCH_USER_BY_NAME } from '../../graphql/Queries'

export default function SearchUser() {
    const param = useParams()
    const name = '%' + param['input'] + '%'
    const[user, setUser] = useState([])
    const[con, setCon] = useState([])
    const[pen, setPen] = useState([])
    const[wit, setWit]= useState([])
    const[insertConnect] = useMutation(INSERT_CONNECTION)
    const[deleteConnect] = useMutation(DELETE_CONNECTION)

    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    let id = cookies['user-login-id']

    const{error, loading, data} = useQuery(SEARCH_USER_BY_NAME, {
        variables: {
            name: name
        }
    })

    const{error: errCon, loading: loadCon, data: dataCon} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id: id,
            status: true,
        }
    })

    const{error: errWith, loading: loadWith, data: dataWith} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id: id,
            status: false,
        }
    })

    const{error: errPen, loading: loadPen, data: dataPen} = useQuery(GET_INVITATION_NUM, {
        variables: {
            id: id,
            status: false,
        }
    })

    const connect = ( idCon: string ) => {
        insertConnect({
            variables: {
                userid: id,
                useridconnect: idCon,
                status: false,
            }
        })

        location.reload()
    }
    
    const withdraw = ( idCon: string ) => {
        deleteConnect({
            variables: {
                userid: id,
                useridconnect: idCon,
            }
        })

        location.reload()
    }

    useEffect(() => {
        if(data) {
            setUser(data.users)
        }

        if(dataCon) {
            setCon(dataCon.userconnections)
        }

        if(dataPen) {
            setPen(dataPen.userinvitations)
        }

        if(dataWith) {
            setWit(dataWith.userconnections)
        }
    }, [data, dataCon, dataPen, dataWith])

    return (
        <div className='search-user'>
            {
                user.map((e) => {
                    if(id != e.id) {
                        if(con.some(item => item.useridconnect == e.id)) {
                            return (
                                <div className="search-profile" key={e.id}>
                                    <p>Connection</p>
                                    <button type='button'>Message</button>
                                    <Link to={ `/profile/${e.profileurl}` }><h1>{e.firstname} {e.lastname}</h1></Link>
                                </div>
                            )
                        }
                        else if(pen.some(item => item.userid == e.id)) {
                            return (
                                <div className="search-profile" key={e.id}>
                                    <button type='button'>Accept Invitation</button>
                                    <Link to={ `/profile/${e.profileurl}` }><h1>{e.firstname} {e.lastname}</h1></Link>
                                </div>
                            )
                        }
                        else if(wit.some(item => item.useridconnect == e.id)) {
                            return (
                                <div className="search-profile" key={e.id}>
                                    <p className='withdraw'>Pending Invitation</p>
                                    <button type='button' className='withdraw' onClick={ () => withdraw(e.id) }>Withdraw</button>
                                    <Link to={ `/profile/${e.profileurl}` }><h1>{e.firstname} {e.lastname}</h1></Link>
                                </div>
                            )
                        }
                        else {
                            return (
                                <div className="search-profile" key={e.id}>
                                    <button type='button' onClick={ () => connect(e.id) }>Connect</button>
                                    <Link to={ `/profile/${e.profileurl}` }><h1>{e.firstname} {e.lastname}</h1></Link>
                                </div>
                            )
                        }
                    }
                })
            }
        </div>
    )
}
