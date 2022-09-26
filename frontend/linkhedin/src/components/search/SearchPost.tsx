import React from 'react'
import { useParams } from 'react-router-dom'

export default function SearchPost() {

    const param = useParams()
    const title = '%' + param['input'] + '%'

    return (
        <div>

        </div>
    )
}
