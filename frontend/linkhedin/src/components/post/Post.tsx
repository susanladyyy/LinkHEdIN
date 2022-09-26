import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_ALL_POST, GET_ALL_USERS, GET_COMMENTS, GET_LIKES } from '../../graphql/Queries'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { useCookies } from 'react-cookie'
import { DELETE_LIKE, INSERT_COMMENT, INSERT_LIKE } from '../../graphql/Mutation'

export default function Post() {
    const[insertComment] = useMutation(INSERT_COMMENT)
    const[insertLike] = useMutation(INSERT_LIKE)
    const[deleteLike] = useMutation(DELETE_LIKE)
    const{error, loading, data} = useQuery(GET_ALL_POST)
    const{error: errLike, loading: loadLike, data: dataLike} = useQuery(GET_LIKES)
    const{error: errCom, loading: loadCom, data: dataCom} = useQuery(GET_COMMENTS)
    const{error: errUser, loading: loadUser, data: dataUser} = useQuery(GET_ALL_USERS)
    const[post, setPost] = useState([])
    const[user, setUser] = useState([])
    const[like, setLike] = useState([])
    const[com, setCom] = useState([])
    const[newCom, setNewCom] = useState("")

    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    let id = cookies['user-login-id']

    const likePost = (id: string, postid: string) => {
        insertLike({
            variables: {
                userid: id,
                postid: postid,
            }, refetchQueries: [{query: GET_LIKES}]
        })
    }

    const unlikePost = (id: string) => {
        deleteLike({
            variables: {
                id: id
            }, refetchQueries: [{query: GET_LIKES}]
        })
    }

    const newComment = (postid: string) => {
        event?.preventDefault()
        if(newCom != "") {
            insertComment({
                variables: {
                    userid: id,
                    postid: postid,
                    comment: newCom
                }, refetchQueries: [{query: GET_COMMENTS}]
            })

            setNewCom("")
        }
    }

    let likeNo = 0
    let comNo = 0

    useEffect(() => {
        if(data) {
            setPost(data.posts)
        }

        if(dataUser) {
            setUser(dataUser.users)
        }

        if(dataLike) {
            setLike(dataLike.likes)
        }

        if(dataCom) {
            setCom(dataCom.comments)
        }
    }, [data, dataUser, dataLike, dataCom])

    return (
        <>
            {
                post.map((e) => {
                    return (
                        <div className="card" key={e.id}>
                            <div className="likeno">
                                { likeNo != 0 ? likeNo = 0 : null}
                                { comNo != 0 ? comNo = 0 : null }
                            </div>
                            <div className="card-header">
                                {
                                    user.map((u) => {
                                        if(u.id == e.userid) {
                                            return (
                                                <div className='user-info'>
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
                            <hr />
                            <div className="card-footer">
                                {
                                    like.map((l) => {
                                        if(l.postid == e.id) {
                                            likeNo = likeNo + 1
                                            return <div key={l.id}></div>
                                        }
                                    })
                                }
                                {
                                    com.map((c) => {
                                        if(c.postid == e.id) {
                                            comNo = comNo + 1
                                            return <div key={c.id}></div>
                                        }
                                    })
                                }
                                { like.some(item => item.userid == id && item.postid == e.id) == true ? 
                                    <p className='likes'>{ likeNo } <BsHeartFill onClick={ () => {
                                        unlikePost(e.id)
                                    }}></BsHeartFill></p>
                                : <p className='likes'>{ likeNo } <BsHeart onClick={ () => {
                                    likePost(id, e.id)
                                }}></BsHeart></p>
                                }
                                
                                <p className='comment'><Link to={''}>{ comNo } Comment(s)</Link></p>
                                
                                <div className="comment-list">
                                    {
                                        com.map((co) => {
                                            if(co.postid == e.id) {
                                                return (
                                                    <>
                                                        {
                                                            user.map((u) => {
                                                                if(u.id == co.userid) {
                                                                    return (
                                                                        <div className='user-info'>
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
                                                        <p>{ co.comment }</p>
                                                        <hr />
                                                    </>
                                                )
                                            }
                                        })
                                    }
                                </div>

                                <form action="" className='new-comment'>
                                    <textarea name="comment" id="commnet" cols="30" rows="3" onChange={ (e) => {
                                        setNewCom(e.target.value)
                                    }}></textarea>
                                    <input type="button" value="Submit" onClick={ () => {
                                        event?.preventDefault()
                                        newComment(e.id)
                                    }} />
                                </form>
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
