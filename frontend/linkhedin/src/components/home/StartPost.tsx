import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import { GET_USER_BY_URL } from '../../graphql/Queries'
import CreatePost from '../modal/CreatePost'
import '../../styles/modal/createpost.scss'
import { GrClose } from 'react-icons/gr'

export default function StartPost() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login'])
    const url = cookies['user-login']
    const[dataLoad, setDataLoad] = useState(false)
    
    const{error: errData, loading, data} = useQuery(GET_USER_BY_URL, {
        variables: {
            url
        }
    })

    const[showModal, setShowModal] = useState(false)

    const startPost = () => {
        showModal ? setShowModal(false) : setShowModal(true)
    }

    const[caption, setCaption] = useState("")
    const[media, setMedia] = useState("")
    const[error, setError] = useState("")

    const createPost = (caption: string, media: string) => {
        if(caption == "") {
            setError("Caption must be filled!")
        }
        else {
            setError("OKAY")
        }
    }

    useEffect(() => {
        if(!loading){
            setDataLoad(true)
        }
        else {
            setDataLoad(false)
        }
    }, [loading])
    
    return (
        <>
            <div className='start-post-home'>
                <div className="profile">
                    { dataLoad ? (data['users'][0].profile ? <img src="" alt="not found" /> : <img src="/src/assets/default-profile-photo.jpg" alt="not found" />) : null }
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
                                    <textarea name="" id="" cols="50" rows="8" onChange={ (e) => {
                                        setCaption(e.target.value)
                                    }}></textarea>
                                </div>
                                <div className="media">
                                    <input type="file" name="" id="" onChange={ (e) => {
                                        setMedia(e.target.value)
                                    }}/>
                                    
                                    { media != "" ? (media.split(".")[1].match("png") || media.split(".")[1].match("jpg") || media.split(".")[1].match("jpeg") ? 
                                    <div className="preview">
                                        <img src={ media } alt="" />
                                    </div> : 
                                    <div className="preview">
                                        <video src={ media }></video>
                                    </div>
                                    ) : null}

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
