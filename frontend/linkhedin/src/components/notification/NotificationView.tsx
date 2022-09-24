import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { GET_CONNECTION_NUM, GET_NOTIFICATIONS } from '../../graphql/Queries'

export default function Notification() {

    const[notif, setNotif] = useState([])
    const[con, setCon] = useState([])
    const[cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const id = cookies['user-login-id']

    const{error, loading, data} = useQuery(GET_NOTIFICATIONS)
    const{error: errCon, loading: loadCon, data: dataCon} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id: id,
            status: true,
        }
    })

    useEffect(() => {
        if(data) {
            setNotif(data.notifications)
        }

        if(dataCon) {
            setCon(dataCon.userconnections)
        }
    }, [data, dataCon])

    console.log(con)

    return (
        <div className='notification-list'>
            {
                notif.map((e) => {
                    return (
                        <>
                            { e.userid == id ? 
                                <div className="notif-card" key={e.id}>
                                    <p className='act'>Your Activity</p>
                                    <h3 className='desc'>{ e.desc }</h3>
                                    <p className='date'>{ e.date }</p>
                                </div>
                                :
                                <div></div>
                            }

                            {

                                con.length != 0 ? (con.some(item => item.useridconnect == e.userid) == true ?
                                <div className="notif-card" key={e.id}>
                                    <p className='act'>Connection's Activity</p>
                                    <h3 className='desc'>{ e.desc }</h3>
                                    <p className='date'>{ e.date }</p>
                                </div>
                                :
                                <div></div>)
                                :
                                <div></div>
                            }
                        </>
                    )
                })
            }
        </div>
    )
}
