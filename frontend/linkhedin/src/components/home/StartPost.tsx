import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useRef, useState } from 'react'
import { useCookies } from 'react-cookie'
import { GET_ALL_POST, GET_ALL_USERS, GET_USER_BY_URL } from '../../graphql/Queries'
import '../../styles/modal/createpost.scss'
import { GrClose } from 'react-icons/gr'
import Axios from 'axios'
import { INSERT_POST } from '../../graphql/Mutation'
import { blue } from '@cloudinary/url-gen/actions/adjust'
import { MentionsInput, Mention } from 'react-mentions'

export default function StartPost() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    const url = cookies['user-login']
    const id = cookies['user-login-id']
    const[dataLoad, setDataLoad] = useState(false)
    const up_preset = "linkhedin_su"
    
    const{error: errData, loading, data} = useQuery(GET_USER_BY_URL, {
        variables: {
            url
        }
    })

    const{error: errAll, loading: loadAll, data: dataAll} = useQuery(GET_ALL_USERS)
    const{error: errPost, loading: loadPost, data: dataPost} = useQuery(GET_ALL_POST)

    const[insertPost] = useMutation(INSERT_POST)
    const[showModal, setShowModal] = useState(false)

    const startPost = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }
    
    const fileRef = useRef(null)
    const[caption, setCaption] = useState("")
    const[media, setMedia] = useState("")
    const[error, setError] = useState("")
    const[all, setAll] = useState([])
    const[posts, setPosts] = useState([])

    const createPost = (caption: string, media: string) => {
        if(caption == "") {
            setError("Caption must be filled!")
        }
        else {
            if(media == "") {
                insertPost({
                    variables: {
                        userid: id,
                        media: null,
                        caption: caption,
                        display: `#${caption.toUpperCase().replace(/\s/g, '')}`
                    }, refetchQueries: [{query: GET_ALL_POST}]
                })
            }
            else {
                insertPost({
                    variables: {
                        userid: id,
                        media: media,
                        caption: caption,
                        display: `#${caption.toUpperCase().replace(/\s/g, '')}`
                    }, refetchQueries: [{query: GET_ALL_POST}]
                })
            }

            setShowModal(false)
        }
    }

    const showImage = async () => {
        const config = {
            headers: { "X-Requested-With": "XMLHttpRequest" },
        };

        let mediaPromise = null
        const formData = new FormData()

        formData.append("file", media)
        formData.append("upload_preset", up_preset)

        mediaPromise = Axios.post("https://api.cloudinary.com/v1_1/cloudinarysu/upload", formData, config).then((response) => {
            return response.data
        })

        const mediaRe= Promise.resolve(mediaPromise)

        let mediaStr = mediaRe.then((value) => {
            if(value) return value.url
            return null
        })

        const med = Promise.resolve(mediaStr)
        const medValue: string = await med
        
        setMedia(medValue)
    }

    useEffect(() => {
        if(!loading){
            setDataLoad(true)
        }
        else {
            setDataLoad(false)
        }
        if(dataAll) {
            setAll(dataAll.users)
        }
        if(dataPost) {
            setPosts(dataPost.posts)
        }
    }, [loading, dataAll, dataPost])

    console.log(posts)

    return (
        <>
            <div className='start-post-home'>
                <div className="profile">
                    { dataLoad ? (data['users'][0].profile ? <img src={ data['users'][0].profile } alt="not found" /> : <img src="/src/assets/default-profile-photo.jpg" alt="not found" />) : null }
                </div>
                <div className="post-button-form">
                    <button type='button' onClick={ () => startPost() }>Start a post</button>
                </div>
            </div>

            { showModal ? 
                <div className='create-post'>
                    <div className="card">
                        <div className="card-header">
                            <i onClick={ () => startPost() }><GrClose /></i>
                            <h2>Create a post</h2>
                        </div>
                        <hr />
                        <div className="card-body">
                            <p className='error'>
                                { error }
                            </p>
                            <form action="" onSubmit={ () => {
                                event?.preventDefault()
                            }}>
                                <div className="caption">
                                    <MentionsInput value={caption} onChange={(e) => {
                                        setCaption(e.target.value)
                                    } } style={{width: "300px", height: "150px", margin: "10px 0px", border: "2px black solid", borderRadius: "5px"}}>
                                        <Mention trigger="@" data={dataAll['users']} style={{color: "blue"}}/>
                                        <Mention trigger="#" data={dataPost['posts']} style={{color: "blue"}} />
                                    </MentionsInput>
                                    {/* <textarea name="" id="" cols="50" rows="8" onChange={ (e) => {
                                        setCaption(e.target.value)
                                    }}></textarea> */}
                                </div>
                                <div className="media">
                                    <input ref={fileRef} type="file" name="" id="" onChange={ (e) => {
                                        setMedia(e.target.files[0])
                                    }}/>
                                    {
                                        media != "" ?
                                        <>
                                            <button onClick={ () => showImage() }>Preview</button>
                                        
                                            <div className="preview">
                                                {
                                                    media.toString().indexOf("mp4") != -1 ?
                                                    <video width="150" height="100" controls>
                                                        <source src={ media } type="video/mp4" />
                                                    </video>
                                                    :
                                                    <img src={ media } alt="" />
                                                }
                                                <button onClick={ () => {
                                                    fileRef.current.value = null
                                                    setMedia("")
                                                } }>Remove</button>
                                            </div>
                                        </> 
                                        :
                                        null
                                    }

                                    <div className="post-submit">
                                        <input type="submit" value="Post" onClick={ () => createPost(caption, media)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                :
                <div></div>
            }
        </>
    )
}
