import { useQuery } from '@apollo/client'
import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GET_USER_BY_EMAIL } from '../../graphql/Queries'
import { useCookies } from 'react-cookie'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function LoginForm() {
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState(" ")
    const navigate = useNavigate()
    const [cookies, setCookie] = useCookies(['user-login-id', 'user-login', 'user-theme'])
    const[showPass, setShowPass] = useState(false)

    const {error, loading, data} = useQuery(GET_USER_BY_EMAIL, {
        variables: { email }
    })

    const SubmitForm = () => {
        if(email == "") {
            setErrorMsg("Email must be filled")
            return
        }
        else if(email.indexOf("@") == -1 || email.indexOf(".com") == -1 || email.indexOf(".") - email.indexOf("@") == 1){
            setErrorMsg("Please input a valid email")
            return
        }
        else if(password == "") {
            setErrorMsg("Password must be filled")
            return
        }
        else if(password.length < 6) {
            setErrorMsg("Password length must be 6 or more")
            return
        }

        let data_json = JSON.stringify(data)
        let data_parse = JSON.parse(data_json)
        
        if(data_parse['users'].length == 0) {
            setErrorMsg("Email not found!")
            return
        }
        else if(data_parse['users'].length != 0 && password != data_parse['users'][0].password) {
            setErrorMsg("Invalid credentials")
            return
        }
        else if(data_parse['users'][0].activation == false){
            setErrorMsg("Please activate your account first! (Check email for activation link)")
            return
        }

        login()
        setErrorMsg("")
    }

    const login = () => {
        let data_json = JSON.stringify(data)
        let data_parse = JSON.parse(data_json)
        let exp = new Date()
        exp.setTime(exp.getTime() + (60*60*1000))

        setCookie('user-login', data_parse['users'][0].profileurl, {expires: exp})
        setCookie('user-login-id', data_parse['users'][0].id, {expires: exp})
        setCookie('user-theme', data_parse['users'][0].theme, {expires: exp})

        navigate('/home')
    }

    const showPassword = (showPass: boolean) => {
        showPass ? setShowPass(false) : setShowPass(true)
    }

    return (
        <div className="loginForm">
            <form action="">

                <div className="error-message">
                    { errorMsg }
                </div>

                <div className="login-form-title">
                    <p className='signin-title'>Sign In</p>
                    <div className="tagline">
                        <p>Stay updated on your professional world</p>
                    </div>
                </div>
                <div className="form-input-group">
                    <div className="login-form-input">
                        <input type="text" name='email' placeholder='Email or Phone Number' onChange={ (e) => {
                            setEmail(e.target.value)
                        } }/>
                    </div>
                </div>

                {
                    showPass ? 
                    <div className="form-input-group">
                        <i onClick={ () => showPassword(showPass) }><AiFillEye /></i>
                        <div className="login-form-input">
                            <input type="text" name='password' placeholder='Password' onChange={ (e) => {
                                setPassword(e.target.value)
                            } }/>
                        </div>
                    </div> 
                    :
                    <div className="form-input-group">
                        <i onClick={ () => showPassword(showPass) }><AiFillEyeInvisible /></i>
                        <div className="login-form-input">
                            <input type="password" name='password' placeholder='Password' onChange={ (e) => {
                                setPassword(e.target.value)
                            } }/>
                        </div>
                    </div>
                }

                <div className="forgot-password">
                    <p><Link to={'/forgot-password'}>Forgot Password?</Link></p>
                </div>

                <div className="form-input-group submit-button">
                    <div className="auth-form-button">
                        <button type="button" onClick={ SubmitForm }>Sign In</button>
                    </div>
                    <p className='or-google-login'>OR</p>
                    <div className="google-login-button">
                        <img src="src/assets/google_logo.svg" alt="" />
                        <button>Sign In with Google</button>
                    </div>
                </div>

                <div className="already-a-user">
                    <p>New to LinkedIn? <Link to={'/'}>Sign Up</Link></p>
                </div>
            </form>
        </div>
    )
}
