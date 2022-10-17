import { useMutation, useQuery } from '@apollo/client'
import React, { useState, createRef, useRef, useEffect, useDebugValue } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CREATE_USER, DELETE_TEMPORARY } from '../../graphql/Mutation'
import { GET_ALL_TEMPS } from '../../graphql/Queries'

export default function AfterRegisterForm() {

    const[firstName, setFirstName] = useState("")
    const[lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const[errorMsg, setErrorMsg] = useState(" ")
    const[createUser] = useMutation(CREATE_USER)
    const[deleteTemporary] = useMutation(DELETE_TEMPORARY)
    const{error, loading, data} = useQuery(GET_ALL_TEMPS)
    const[url, setUrl] = useState("")
    let navigate = useNavigate()
    const paramUrl = useParams()
    const[newData, setNewData] = useState([])
    let idx = 0

    useEffect(() => {
        if(!loading) {
            setNewData(data.temporaries)
        }
    }, [loading])

    const getCredential = (firstName: string, lastName: string) => {
        if(firstName != "" && lastName != ""){
            setErrorMsg("")
            
            if(data) {
                for (let index = 0; index < newData.length; index++) {
                    if(newData[index]['url'] == paramUrl['url']) {
                        idx = index
                        break
                    }
                }
            }

            insertNewUser(newData[idx]['email'], newData[idx]['password'], newData[idx]['url'])

            deleteTemp(newData[idx]['url'])
            navigate('/login')
            return
        }

        if(firstName == "") {
            setErrorMsg("First name must be filled")
        }
        else if(lastName == "") {
            setErrorMsg("Last name must be filled")
        }
    }

    const insertNewUser = (email: string, password: string, url: string) => {
        createUser ({
            variables : {
                firstname: firstName,
                lastname: lastName,
                password: password,
                profileurl: url,
                email: email,
                activation: true,
                theme: 1,
                display: `@${firstName.toLowerCase()}${lastName.toLowerCase()}`
            }
        })
    }

    const deleteTemp = (url: string) => {
        deleteTemporary ({
            variables : {
                url : url
            }
        })
    }

    return (
        <div className="after-registerForm">
            <form action="">
                <div className="error-message">
                    { errorMsg }
                </div>

                <div className="form-input-group">
                    <div className="after-register-form-label">
                        <label htmlFor="first-name">First Name</label>
                    </div>
                    <div className="after-register-form-input">
                        <input type="text" name='first-name' id='first-name' onChange={ (e) => {
                            setFirstName(e.target.value)
                        } }/>
                    </div>
                </div>

                <div className="form-input-group">
                    <div className="after-register-form-label">
                        <label htmlFor="last-name">Last Name</label>
                    </div>
                    <div className="after-register-form-input">
                        <input type="text" name='last-name' id='last-name' onChange={ (e) => {
                            setLastName(e.target.value)
                        } }/>
                    </div> 
                </div>

                <div className="form-input-group submit-button">
                    <div className="auth-form-button">
                    <button type="button" onClick={ () => getCredential(firstName, lastName) }>Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
