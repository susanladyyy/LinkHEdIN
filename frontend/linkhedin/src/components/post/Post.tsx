import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_ALL_POST, GET_ALL_USERS, GET_COMMENTS, GET_COMMENT_LIKES, GET_COMMENT_REPLIES, GET_COMMENT_REPLY_LIKES, GET_LIKES } from '../../graphql/Queries'
import { BsHeartFill, BsHeart } from 'react-icons/bs'
import { useCookies } from 'react-cookie'
import { DELETE_COMMENT, DELETE_COMMENT_LIKE, DELETE_COMMENT_REPLY, DELETE_COMMENT_REPLY_LIKE, DELETE_LIKE, INSERT_COMMENT, INSERT_COMMENT_LIKE, INSERT_COMMENT_REPLY, INSERT_COMMENT_REPLY_LIKE, INSERT_LIKE } from '../../graphql/Mutation'

export default function Post() {
    const[insertComment] = useMutation(INSERT_COMMENT)
    const[insertLike] = useMutation(INSERT_LIKE)
    const[deleteLike] = useMutation(DELETE_LIKE)
    const[deleteComment] = useMutation(DELETE_COMMENT)
    const[insertCommentLike] = useMutation(INSERT_COMMENT_LIKE)
    const[deleteCommentLike] = useMutation(DELETE_COMMENT_LIKE)
    const[insertCommentReply] = useMutation(INSERT_COMMENT_REPLY)
    const[deleteCommentReply] = useMutation(DELETE_COMMENT_REPLY)
    const[insertCommentReplyLike] = useMutation(INSERT_COMMENT_REPLY_LIKE)
    const[deleteCommentReplyLike] = useMutation(DELETE_COMMENT_REPLY_LIKE)
    const{error, loading, data} = useQuery(GET_ALL_POST)
    const{error: errLike, loading: loadLike, data: dataLike} = useQuery(GET_LIKES)
    const{error: errComLike, loading: loadComLike, data: dataComLike} = useQuery(GET_COMMENT_LIKES)
    const{error: errCom, loading: loadCom, data: dataCom} = useQuery(GET_COMMENTS)
    const{error: errUser, loading: loadUser, data: dataUser} = useQuery(GET_ALL_USERS)
    const{error: errRep, loading: loadingRep, data: dataRep} = useQuery(GET_COMMENT_REPLIES)
    const{error: errRepLike, loading: loadingRepLike, data: dataRepLike} = useQuery(GET_COMMENT_REPLY_LIKES)
    const[post, setPost] = useState([])
    const[user, setUser] = useState([])
    const[like, setLike] = useState([])
    const[likeCom, setLikeCom] = useState([])
    const[com, setCom] = useState([])
    const[rep, setRep] = useState([])
    const[repLike, setRepLike] = useState([])
    const[newCom, setNewCom] = useState("")
    const[newRep, setNewRep] = useState("")

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

    const unlikePost = (postid: string) => {
        deleteLike({
            variables: {
                id: postid,
                userid: id
            }, refetchQueries: [{query: GET_LIKES}]
        })
    }

    const likeComment = (comid: string) => {
        insertCommentLike({
            variables: {
                commentid: comid,
                userid: id,
            }, refetchQueries: [{query: GET_COMMENT_LIKES}]
        })
    }

    const likeCommentReply = (coid: string) => {
        insertCommentReplyLike({
            variables: {
                userid: id,
                commentreplyid: coid,
            }, refetchQueries: [{query: GET_COMMENT_REPLY_LIKES}]
        })
    }

    const unlikeComment = (comid: string) => {
        deleteCommentLike({
            variables: {
                commentid: comid,
                userid: id,
            }, refetchQueries: [{query: GET_COMMENT_LIKES}]
        })
    }

    const unlikeCommentReply = (coid: string) => {
        deleteCommentReplyLike({
            variables: {
                userid: id,
                commentreplyid: coid,
            }, refetchQueries: [{query: GET_COMMENT_REPLY_LIKES}]
        })
    }

    const newComment = (postid: string) => {
        event?.preventDefault()
        if(newCom != "") {
            insertComment({
                variables: {
                    userid: id,
                    postid: postid,
                    comment: newCom,
                }, refetchQueries: [{query: GET_COMMENTS}]
            })

            setNewCom("")
        }
    }

    const delComment = (coid: string) => {
        deleteComment({
            variables: {
                id: coid,
            }, refetchQueries: [{query: GET_COMMENTS}]
        })
    }

    const delCommentReply = (coid: string) => {
        deleteCommentReply({
            variables: {
                id: coid
            }, refetchQueries: [{query: GET_COMMENT_REPLIES}]
        })
    }

    const insertComReply = (coid: string) => {
        insertCommentReply({
            variables: {
                commentid : coid,
                userid: id,
                commentreply: newRep,
            }, refetchQueries: [{query: GET_COMMENT_REPLIES}]
        })
    }

    let likeNo = 0
    let comNo = 0
    let likeComNo = 0
    let replyNo = 0
    let likeComRepNo = 0

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

        if(dataComLike) {
            setLikeCom(dataComLike.commentlikes)
        }

        if(dataRep) {
            setRep(dataRep.commentreplies)
        }

        if(dataRepLike) {
            setRepLike(dataRepLike.commentreplylikes)
        }
    }, [data, dataUser, dataLike, dataCom, dataComLike, dataRep, dataRepLike])

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
                                                <div className='user-info' key={u.id}>
                                                    {
                                                        u.profile == null ? <img src="src/assets/default-profile-photo.jpg" alt="" width="80px"/> : <img src={ u.profile } alt="" width="100px"/>
                                                    }
                                                    { u.id == id ? 
                                                        <Link to={'/profile/me'}><p><abbr title={u.headline != null ? u.headline : "no additional information"}>{ u.firstname } { u.lastname }</abbr></p></Link>
                                                    :
                                                        <Link to={`/profile/${u.profileurl}`}><p><abbr title={u.headline != null ? u.headline : "no additional information"}>{ u.firstname } { u.lastname }</abbr></p></Link>
                                                    }
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                            <div className="card-body">
                                {e.media == null ? 
                                    null 
                                    : 
                                    (
                                        e.media.toString().indexOf("mp4") != -1 ?
                                        <video controls>
                                            <source src={ e.media } type="video/mp4"/>
                                        </video>
                                        :
                                        <img src={ e.media } alt="" /> 
                                    )
                                    
                                }
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
                                                    <div key={co.id}>
                                                        {
                                                            user.map((u) => {
                                                                if(u.id == co.userid) {
                                                                    return (
                                                                        <div className='user-info'>
                                                                            {
                                                                                u.profile == null ? <img src="src/assets/default-profile-photo.jpg" alt="" width="80px"/> : <img src={ u.profile } alt="" width="100px"/>
                                                                            }
                                                                            { u.id == id ? 
                                                                                <Link to={'/profile/me'}><p><abbr title={u.headline != null ? u.headline : "no additional information"}>{ u.firstname } { u.lastname }</abbr></p></Link>
                                                                            :
                                                                                <Link to={`/profile/${u.profileurl}`}><abbr title={u.headline != null ? u.headline : "no additional information"}>{ u.firstname } { u.lastname }</abbr></Link>
                                                                            }
                                                                            
                                                                            {
                                                                                u.id == id?
                                                                                <div className="delete">
                                                                                    <p onClick={ () => {
                                                                                        delComment(co.id)
                                                                                    }}>Delete</p>
                                                                                </div>
                                                                                :
                                                                                <></>
                                                                            }
                                                                        </div>
                                                                    )
                                                                }
                                                            })
                                                        }
                                                        <div className="likeno">
                                                            { likeComNo != 0 ? likeComNo = 0 : null }
                                                        </div>
                                                        {
                                                            likeCom.map((lc) => {
                                                                if(lc.commentid == co.id) {
                                                                    likeComNo = likeComNo + 1
                                                                    return <div key={lc.id}></div>
                                                                }
                                                            })
                                                        }
                                                        {
                                                            likeCom.some(item => item.userid == id && item.commentid == co.id) == true ? 
                                                            <p className='comment-likes'>{ likeComNo } <BsHeartFill onClick={ () => {
                                                                unlikeComment(co.id)
                                                            }}></BsHeartFill></p>
                                                            :
                                                            <p className='comment-likes'>{ likeComNo } <BsHeart onClick={ () => {
                                                                likeComment(co.id)
                                                            }}></BsHeart></p>
                                                        }
                                                        <p>{ co.comment }</p>
                                                        <div className="replies">
                                                            <div style={{display: "none"}}>
                                                                {replyNo != 0 ? replyNo = 0 : null }
                                                            </div>
                                                            <>
                                                                {
                                                                    rep.map((reCnt) => {
                                                                        if(reCnt.commentid == co.id) {
                                                                            replyNo += 1
                                                                            return (
                                                                                <div key={reCnt.id}></div>
                                                                            )
                                                                        }
                                                                    })
                                                                } 
                                                            </>
                                                            <div className='reply-title'>
                                                                <>
                                                                    <h5>Replies: { replyNo }</h5>
                                                                </>
                                                            </div>
                                                            {
                                                                rep.map((re) => {
                                                                    if(co.id == re.commentid) {
                                                                        return (
                                                                            <div className='list-reply' key={re.id}>
                                                                                {
                                                                                    user.map((u) => {
                                                                                        if(u.id == re.userid) {
                                                                                            return (
                                                                                                <div className='user-info'>
                                                                                                    {
                                                                                                        u.profile == null ? <img src="src/assets/default-profile-photo.jpg" alt="" width="80px"/> : <img src={ u.profile } alt="" width="100px"/>
                                                                                                    }
                                                                                                    { u.id == id ? 
                                                                                                        <Link to={'/profile/me'}><p><abbr title={u.headline != null ? u.headline : "no additional information"}>{ u.firstname } { u.lastname }</abbr></p></Link>
                                                                                                    :
                                                                                                        <Link to={`/profile/${u.profileurl}`}><abbr title={u.headline != null ? u.headline : "no additional information"}>{ u.firstname } { u.lastname }</abbr></Link>
                                                                                                    }
                                                                                                    
                                                                                                    {
                                                                                                        u.id == id?
                                                                                                        <div className="delete">
                                                                                                            <p onClick={ () => {
                                                                                                                delCommentReply(re.id)
                                                                                                            }}>Delete</p>
                                                                                                        </div>
                                                                                                        :
                                                                                                        <></>
                                                                                                    }
                                                                                                </div>
                                                                                            )
                                                                                        }
                                                                                    })
                                                                                }
                                                                                <div style={{display: "none"}}>
                                                                                    {likeComRepNo != 0 ? likeComRepNo = 0 : null }
                                                                                </div>
                                                                                {
                                                                                    repLike.map((reLCnt) => {
                                                                                        if(reLCnt.commentreplyid == re.id) {
                                                                                            likeComRepNo += 1

                                                                                            return (
                                                                                                <div key={reLCnt.id}></div>
                                                                                            )
                                                                                        }
                                                                                    })
                                                                                }
                                                                                <div className="reply-likes">
                                                                                    {
                                                                                        repLike.some(item => item.userid == id && item.commentreplyid == re.id) == true ? 
                                                                                        <p className='reply-likes'>{ likeComRepNo } <BsHeartFill onClick={ () => {
                                                                                            unlikeCommentReply(re.id)
                                                                                        }}></BsHeartFill></p>
                                                                                        :
                                                                                        <p className='reply-likes'>{ likeComRepNo } <BsHeart onClick={ () => {
                                                                                            likeCommentReply(re.id)
                                                                                        }}></BsHeart></p>
                                                                                    }
                                                                                </div>
                                                                                <p>{ re.commentreply }</p>
                                                                            </div>
                                                                        )
                                                                    }
                                                                })
                                                            }
                                                        </div>
                                                        <div className="reply-input">
                                                            <form action="" name="reply" onSubmit={ newRep == "" ? () => {
                                                                event?.preventDefault()
                                                            } : () => {
                                                                event?.preventDefault()
                                                                insertComReply(co.id)
                                                            }}>
                                                                <input type="text" name="" id="" onChange={ (e) => {
                                                                    setNewRep(e.target.value)
                                                                }}/>
                                                                <input type="submit" value="Send" />
                                                            </form>
                                                        </div>
                                                        <hr />
                                                    </div>
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
                }).reverse()
            }
        </>
    )
}
