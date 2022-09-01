import { useMutation, useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GET_ALL_TEMPS, GET_ALL_USERS, GET_USER_BY_EMAIL } from '../../graphql/Queries'
import emailjs from '@emailjs/browser'
import { CREATE_TEMPORARY } from '../../graphql/Mutation'
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai'

export default function RegisterForm() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState(" ")
    const [showAct, setShowAct] = useState(false)
    const[url, setUrl] = useState("")
    const[showPass, setShowPass] = useState(false)
    
    const sendEmail = (e: any) => {
        e.preventDefault()

        console.log(e.target)
        emailjs.sendForm('service_r12gyii', 'template_okegw9l', e.target, 'JHYmq3PUOHPN9c1Ei').then((res) => {
            console.log(res.text);
        }, (error) => {
            console.log(error.text);
        })
    }

    const {error, loading, data} = useQuery(GET_ALL_USERS)
    const {data: temp} = useQuery(GET_ALL_TEMPS)
    const [createTemporary] = useMutation(CREATE_TEMPORARY)

    let navigate = useNavigate()

    const insertTemp = (email: string, password: string) => {
        let tokens = []

        for (let index = 0; index < data['users'].length; index++) {
            tokens.push(data['users'][index].profileurl)
        }

        for (let index = 0; index < temp['temporaries'].length; index++) {
            tokens.push(temp['temporaries'][index].url)
        }

        let url = generateToken()

        while(tokens.includes(url)) {
            url = generateToken()
        }

        setUrl(url)

        createTemporary({
            variables: {
                email: email,
                password: password,
                url: url
            }
        })
    }

    const generateToken = () => {
        const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        let token = '';
        const charactersLength = characters.length;
        for ( let i = 0; i < 25; i++ ) {
            token += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return token;
    }

    const SubmitForm = (email: string, password: string) => {
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
        else {
            let data_json = JSON.stringify(data)
            let data_parse = JSON.parse(data_json)
            
            for (let index = 0; index < data['users'].length; index++) {
                if(data_parse['users'][index].email == email) {
                    setErrorMsg("Email is already taken")
                    return
                }
            }

            for (let index = 0; index < temp['temporaries'].length; index++) {
                if(temp['temporaries'][index].email == email) {
                    setErrorMsg("Email is already taken")
                    return
                }
            }
        }

        insertTemp(email, password)
        setShowAct(true)
        setErrorMsg("")
    }

    const showPassword = (showPass: boolean) => {
        showPass ? setShowPass(false) : setShowPass(true)
    }

    return (
        <div className="registerForm">
            <form action="" onSubmit={ showAct ? () => sendEmail(event) : () => {
                event?.preventDefault()
                console.log("invalid")
            } }>
                <div className="error-message">
                    { errorMsg }
                </div>

                <div className="form-input-group">
                    <div className="register-form-label">
                        <label htmlFor="email">Email</label>
                    </div>
                    <div className="register-form-input">
                        <input type="text" name='email' id='email-register' value={email} onChange={ (e) => {
                            setEmail(e.target.value)
                        } }/>
                    </div>
                </div>

                <div className="form-input-group">
                    <div className="register-form-label">
                        <label htmlFor="password">Password (6 characters or more)</label>
                    </div>
                    {showPass ? 
                        <div className="register-form-input">
                            <i onClick={ () => showPassword(showPass) }><AiFillEye /></i>
                            <input type="text" name='password' id='password-register' value={password} onChange={ (e) => {
                                setPassword(e.target.value)
                            } }/>
                        </div>  
                        : 
                        <div className="register-form-input">
                            <i onClick={ () => showPassword(showPass) }><AiFillEyeInvisible /></i>
                            <input type="password" name='password' id='password-register' value={password} onChange={ (e) => {
                                setPassword(e.target.value)
                            } }/>
                        </div> 
                    }

                    <input type="hidden" name="url" value={url} />
                </div>

                <div className="tnc-text">
                    <p>By cliking Agree & Join, you agree to the LinkedIn <a href="https://www.linkedin.com/legal/user-agreement?trk=registration-frontend_join-form-user-agreement">User Management</a>, <a href="https://www.linkedin.com/legal/privacy-policy?trk=registration-frontend_join-form-privacy-policy">Privacy Policy</a> and <a href="https://www.linkedin.com/legal/cookie-policy?trk=registration-frontend_join-form-cookie-policy">Cookie Policy</a></p>
                </div>

                <div className="form-input-group submit-button">
                    <div className="auth-form-button">
                        <button type="submit" onClick={ () => SubmitForm(email, password) }>Agree & Join</button>
                    </div>
                    <p className='or-google-login'>OR</p>
                    <div className="google-login-button">
                        <img src="src/assets/google_logo.svg" alt="" />
                        <button>Sign In with Google</button>
                    </div>
                </div>

                <div className="already-a-user">
                    <p>Already on LinkedIn? <Link to={'/login'}>Sign In</Link></p>
                </div>

                <div className="email-sent-message">
                    { showAct ? <p>Close this window and click the activation that link has been sent to your email!</p> : <p></p> }
                </div>
            </form>
        </div>
    )
}
