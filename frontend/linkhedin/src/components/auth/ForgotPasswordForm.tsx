import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GET_ALL_USERS, GET_USER_BY_EMAIL } from '../../graphql/Queries'
import emailjs from 'emailjs-com'

export default function ForgotPasswordForm() {

    const[email, setEmail] = useState("")
    const [errorMsg, setErrorMsg] = useState(" ")
    const[dataLoad, setDataLoad] = useState([])
    const[idx, setIdx] = useState(0)

    const {error, loading, data} = useQuery(GET_USER_BY_EMAIL, {
        variables: { email }
    })
    
    const {error: allError, loading: allLoad, data: allData} = useQuery(GET_ALL_USERS)

    console.log(allData)

    const SubmitForm = () => {
        if(email == "") {
            setErrorMsg("Email must be filled")
            return
        }
        else if(email.indexOf("@") == -1 || email.indexOf(".com") == -1 || email.indexOf(".") - email.indexOf("@") == 1){
            setErrorMsg("Please input a valid email")
            return
        }
        let data_json = JSON.stringify(data)
        let data_parse = JSON.parse(data_json)
        
        if(data_parse['users'].length == 0) {
            setErrorMsg("Email not found!")
            return
        }

        for (let index = 0; index < allData.length; index++) {
            if(allData['users'][index].email == email) {
                setIdx(index)
                break
            }
        }

        setErrorMsg("")
    }

    const sendEmail = (e: any) => {
        e.preventDefault()

        console.log(e.target)
        emailjs.sendForm('service_r12gyii', 'template_q25bvkj', e.target, 'JHYmq3PUOHPN9c1Ei').then((res) => {
            console.log(res.text);
        }, (error) => {
            console.log(error.text);
        })
    }

    return (
        <div className="forgotForm">
            <form action="" onSubmit={ errorMsg == "" ? () => sendEmail(event) : () => {
                event?.preventDefault()
                console.log("invalid")
            }}>
                <div className="hidden">
                    <input type="hidden" name="name" value={allData['users'][idx].firstname}/>
                    <input type="hidden" name="url" value={allData['users'][idx].profileurl}/>
                </div> 
            
                <div className="error-message">
                    { errorMsg }
                </div>


                <div className="forgot-form-title">
                    <p className='forgot-title'>Forgot Password?</p>
                    <div className="tagline">
                        <p>Reset password in two quick steps</p>
                    </div>
                </div>
                <div className="form-input-group">
                    <div className="forgot-form-input">
                        <input type="text" name='email' placeholder='Email or Phone Number' onChange={ (e) => {
                            setEmail(e.target.value)
                        } }/>
                    </div>
                </div>

                <div className="form-input-group submit-button">
                    <div className="auth-form-button">
                        <button type="submit" onClick={ SubmitForm }>Reset Password</button>
                    </div>

                    <div className="back-button">
                        <p><Link to={'/login'}>Back</Link></p>
                    </div>
                </div>
            </form>
        </div>
    )
}
