import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_ALL_POST } from '../../graphql/Queries'

export default function Post() {
    const{error, loading, data} = useQuery(GET_ALL_POST)
    const[post, setPost] = useState([])

    useEffect(() => {
        if(data) {
            setPost(data.posts)
        }
    }, [data])
    
    console.log(post)
    
    return (
        <>
            <div className="card">
                <div className="card-header">
                    <p>Username</p>
                </div>
                <div className="card-body">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png" alt="" />
                </div>
                <div className="card-footer">
                    <p className='likes'>Number of Likes</p>
                    <p className='comment'><Link to={''}>Clickable number of comments</Link></p>
                </div>
            </div>
        </>
    )
}
