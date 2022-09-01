import React from 'react'
import { Link } from 'react-router-dom'

export default function AddToFeeds() {
    return (
        <div className='right'>
            <div className="add-to-feeds">

            </div>

            <Link to={'/jobs'}>
                <div className="see-whos-hiring">
                    <img src="src/assets/jobs_img.jpg" alt="" />
                </div>
            </Link>
        </div>
    )
}
