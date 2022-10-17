import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { FaSearch } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import { INSERT_MESSAGE, INSERT_USER_MESSAGE } from '../../graphql/Mutation'
import { GET_ALL_USERS, GET_MESSAGES, GET_USER_MESSAGES, SEARCH_USER_BY_NAME } from '../../graphql/Queries'

export default function Message() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login-id'])
    const id = cookies['user-login-id']
    const[prm, setPrm] = useState("")
    
    const{error, loading, data} = useQuery(GET_MESSAGES)
    const{error: errUser, loading: loadUser, data: dataUser} = useQuery(GET_ALL_USERS)
    const{error: errSearch, loading: loadSearch, data: dataSearch} = useQuery(SEARCH_USER_BY_NAME, {
        variables: {
            name: '%' + prm + '%',
        }
    })
    const{error: errMsg, loading: loadMsg, data: dataMsg} = useQuery(GET_USER_MESSAGES)

    const[message, setMessage] = useState([])
    const[users, setUsers] = useState([])
    const[search, setSearch] = useState([])
    const[userMsg, setUserMsg] = useState([])
    const[currRe, setCurrRe] = useState("")
    const[currMe, setCurrMe] = useState("")
    const[mes, setMes] = useState("")

    const[insertMessage] = useMutation(INSERT_MESSAGE)
    const[insertUserMessage] = useMutation(INSERT_USER_MESSAGE)

    useEffect(() => {
        if(data) {
            setMessage(data.messages)
        }
        if(dataUser) {
            setUsers(dataUser.users)
        }
        if(dataSearch) {
            setSearch(dataSearch.users)
        }
        if(dataMsg) {
            setUserMsg(dataMsg.usermessages)
        }
    }, [data, dataUser, dataSearch, dataMsg])

    console.log(userMsg)

    const addList = () => {
        while(search.length == 0) {
            if(search.length != 0) {
                break
            }
        }

        if(message.some(item => item.useridsend == id && item.useridreceive == search[0]['id'])) {
            return
        }
        insertMessage ({
            variables: {
                useridsend: id,
                useridreceive: search[0]['id'],
            }, refetchQueries: [{query: GET_MESSAGES}]
        })

        insertMessage ({
            variables: {
                useridsend: search[0]['id'],
                useridreceive: id,
            }, refetchQueries: [{query: GET_MESSAGES}]
        })
    }

    const newMessage = () => {
        insertUserMessage ({
            variables: {
                useridsend: id,
                useridreceive: currMe,
                message: mes,
            }, refetchQueries: [{query: GET_USER_MESSAGES}]
        })

        setMes("")
    }

    return (
        <div className='message-comp'>
            <div className="left">
                <div className="searchBar">
                    <form action="" onSubmit={ () => {
                        event?.preventDefault()
                        addList()
                    }}>
                        <i><FaSearch /></i>
                        <input type="text" name="" id="" placeholder='Search' onChange={(e) => {
                            setPrm(e.target.value)
                        }}/>
                    </form>
                </div>
                <div className="user-list">
                    {
                        message.map((e) => {
                            if(e.useridsend == id) {
                                return (
                                    <div key={e.id}>
                                        {
                                            users.map((u) => {
                                                if(u.id == e.useridreceive)
                                                return (
                                                    <>
                                                        <div className='user-info' key={u.id} onClick={() => {
                                                            setCurrRe(u.id)
                                                            setCurrMe(u.id)
                                                        }}>
                                                            {
                                                                u.profile == null ? <img src="src/assets/default-profile-photo.jpg" alt="" width="80px"/> : <img src={ u.profile } alt="" width="100px"/>
                                                            }
                                                            { u.id == id ? 
                                                                <Link to={''}><p><abbr title={u.headline != null ? u.headline : "no additional information"}>{ u.firstname } { u.lastname }</abbr></p></Link>
                                                            :
                                                                <Link to={''}><p><abbr title={u.headline != null ? u.headline : "no additional information"}>{ u.firstname } { u.lastname }</abbr></p></Link>
                                                            }
                                                        </div>
                                                        <hr />
                                                    </>
                                                )
                                            })
                                        }
                                    </div>
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="right">
                <div className="chat-room">
                    {
                        userMsg.map((um) => {
                            if(currRe == "" && currMe == "") {
                                return 
                            }
                            else {
                                if((um.useridsend == id && um.useridreceive == currMe)) {
                                    if(um.useridsend == id) {
                                        return (
                                            <div key={um.id} className='sender'>
                                                <p style={{textAlign: "right"}}>{ um.message }</p>
                                            </div>
                                        )
                                    }
                                }
                                if((um.useridsend == currMe && um.useridreceive == id)) {
                                    if(um.useridsend == currMe) {
                                        return (
                                            <div key={um.id} className='recipient'>
                                                <p style={{textAlign: "left"}}>{ um.message }</p>
                                            </div>
                                        )
                                    }
                                }
                            }
                        })
                    }
                </div>
                <div className="send-message">
                    <form action="" onSubmit={ () => {
                        event?.preventDefault()
                        newMessage()
                    }}>
                        <input type="text" name="" id="" onChange={ (e) => {
                            setMes(e.target.value)
                        }}/>
                        <input type="submit" value="Send" />
                    </form>
                </div>
            </div>
        </div>
    )
}
