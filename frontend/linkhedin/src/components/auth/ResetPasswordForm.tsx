import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { UPDATE_PASSWORD } from '../../graphql/Mutation'
import { GET_USER_BY_URL } from '../../graphql/Queries'

export default function ResetPasswordForm() {
    const[newPassword, setNewPassword] = useState("")
    const[conPassword, setConPassword] = useState("")
    const[errorMsg, setErrorMsg] = useState(" ")
    const[showPass, setShowPass] = useState(false)
    const[showConPass, setShowConPass] = useState(false)
    let urlParam = useParams()
    let url = urlParam['url']
    const[success, setSuccess] = useState(false)

    const[updatePassword] = useMutation(UPDATE_PASSWORD)

    const {error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables: {
            url
        }
    })
    let navigate = useNavigate()

    const SubmitForm = () => {
        if(newPassword == ""){
            setErrorMsg("New Password must be filled")
            return
        }
        else if(newPassword.length < 6) {
            setErrorMsg("Password length must be 6 or more")
            return
        }
        else if(conPassword == "") {
            setErrorMsg("Old Password must be filled")
            return
        }
        else if(newPassword != conPassword) {
            setErrorMsg("The passwords must match")
            return
        }

        setErrorMsg("")

        updPass(data['users'][0].id, newPassword)
        setSuccess(true)

        setTimeout(() => navigate('/login'), 3000)
    }

    const updPass = (id: string, newPassword: string) => {
        updatePassword ({
            variables : {
                id: id,
                password: newPassword
            }
        })
    }

    const showPassword = (showPass: boolean) => {
        showPass ? setShowPass(false) : setShowPass(true)
    }

    const showConPassword = (showConPass: boolean) => {
        showConPass ? setShowConPass(false) : setShowConPass(true)
    }

    return (
        <div className='resetPasswordForm'>
            <form action="">
                <div className="error-message">
                    { errorMsg }
                </div>

                <div className="reset-form-title">
                    <p className='reset-title'>Reset Password</p>
                    <div className="tagline">
                        <p>Renew you password down here</p>
                    </div>
                </div>

                { showPass ? 
                    <div className="form-input-group">
                        <i onClick={ () => showPassword(showPass) }><AiFillEye /></i>
                        <div className="reset-form-input">
                            <input type="text" name='new-pass' placeholder='New Password' onChange={ (e) => {
                                setNewPassword(e.target.value)
                            } }/>
                        </div>
                    </div>
                : 
                    <div className="form-input-group">
                        <i onClick={ () => showPassword(showPass) }><AiFillEyeInvisible /></i>
                        <div className="reset-form-input">
                            <input type="password" name='new-pass' placeholder='New Password' onChange={ (e) => {
                                setNewPassword(e.target.value)
                            } }/>
                        </div>
                    </div>
                }
                

                { showConPass? 
                    <div className="form-input-group">
                        <i onClick={ () => showConPassword(showConPass) }><AiFillEye /></i>
                        <div className="reset-form-input">
                            <input type="text" name='con-pass' placeholder='Confirm Password' onChange={ (e) => {
                                setConPassword(e.target.value)
                            } }/>
                        </div>
                    </div>
                : 
                    <div className="form-input-group">
                        <i onClick={ () => showConPassword(showConPass) }><AiFillEyeInvisible /></i>
                        <div className="reset-form-input">
                            <input type="password" name='con-pass' placeholder='Confirm Password' onChange={ (e) => {
                                setConPassword(e.target.value)
                            } }/>
                        </div>
                    </div> 
                }

                <div className="form-input-group submit-button">
                    <div className="auth-form-button">
                        <button type="button" onClick={ SubmitForm }>Reset Password</button>
                    </div>
                </div>

                {success ? 
                    <div className="success">
                        <p>Reset password successful! Redirecting to Login Page...</p>
                    </div>
                :
                    <div></div>
                }
            </form>
        </div>
    )
}