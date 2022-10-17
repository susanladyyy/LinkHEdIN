import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ALL_DEGREES, ALL_EMPLOYMENT_TYPES, GET_BLOCK_BY_USER, GET_CONNECTION_NUM, GET_INVITATION_NUM, GET_JOB_BY_USER_ID, GET_PROFILE_VIEWS, GET_USER_BY_URL, GET_USER_EDUCATION, GET_USER_EXPERIENCE, GET_USER_FOLLOWER, GET_USER_FOLLOWING } from '../../graphql/Queries'
import { useCookies } from 'react-cookie'
import { MdOutlineModeEditOutline } from 'react-icons/md'
import { AiOutlineMinus } from 'react-icons/ai'
import { IoMdAdd } from 'react-icons/io'
import { DELETE_BLOCK, DELETE_CONNECTION, DELETE_EDUCATION, DELETE_EXPERIENCE, DELETE_FOLLOWER, DELETE_FOLLOWING, INSERT_BLOCK, INSERT_CONNECTION, INSERT_FOLLOWER, INSERT_FOLLOWING, INSERT_VIEW } from '../../graphql/Mutation'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

export default function ProfileView() {
    const [cookies, setCookie, removeCookie] = useCookies(['user-login', 'user-login-id'])
    let url = ""
    const userurl = useParams()
    const param = userurl['profile']

    if(userurl['profile'] == "me") {
        url = cookies['user-login']
    }
    else {
        url = userurl['profile'] as string
    }

    const[dataLoad, setDataLoad] = useState(false)
    const[jobs, setJobs] = useState([])
    const[following, setFollowing] = useState([])
    const[follower, setFollower] = useState([])
    const[inv, setInv] = useState([])
    const[con, setCon] = useState([])
    const[view, setView] = useState([])
    const[edu, setEdu] = useState([])
    const[deg, setDeg] = useState([])
    const[exp, setExp] = useState([])
    const[type, setType] = useState([])
    const[pen, setPen] = useState([])
    const[block, setBlock] = useState([])
    const[insertFollowing] = useMutation(INSERT_FOLLOWING)
    const[insertFollower] = useMutation(INSERT_FOLLOWER)
    const[removeFolw] = useMutation(DELETE_FOLLOWING)
    const[removeFol] = useMutation(DELETE_FOLLOWER)
    const[invite] = useMutation(INSERT_CONNECTION)
    const[removeInv] = useMutation(DELETE_CONNECTION)
    const[insertView] = useMutation(INSERT_VIEW)
    const[removeEdu] = useMutation(DELETE_EDUCATION)
    const[removeExp] = useMutation(DELETE_EXPERIENCE)
    const[insertBlock] = useMutation(INSERT_BLOCK)
    const[removeBlock] = useMutation(DELETE_BLOCK)
    const[removeConnection] = useMutation(DELETE_CONNECTION)
    
    const{error, loading, data} = useQuery(GET_USER_BY_URL, {
        variables : { 
            url
        }
    })

    let id = ""
    let currId = cookies['user-login-id']
    if(userurl['profile'] == "me") {
        id = cookies['user-login-id']
    }
    else {
        if(data && !loading) {
            id = data['users'][0].id
        }
    }

    const{error: errEdu, loading: loadEdu, data: dataEdu} = useQuery(GET_USER_EDUCATION, {
        variables: {
            id : id
        }
    })

    const{error: errDeg, loading: loadDeg, data: dataDeg} = useQuery(ALL_DEGREES)

    const{error: errJob, loading: loadJob, data: dataJob} = useQuery(GET_JOB_BY_USER_ID, {
        variables: {
            id: id
        }
    })

    const{error: errCon, loading: loadCon, data: dataCon} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id : id,
            status : true,
        }
    })

    const{error: errPen, loading: loadPen, data: dataPen} = useQuery(GET_CONNECTION_NUM, {
        variables: {
            id : currId,
            status : false,
        }
    })

    const{error: errFol, loading: loadFol, data: dataFol} = useQuery(GET_USER_FOLLOWING, {
        variables: {
            id: currId
        }
    })

    const{error: errFolw, loading: loadFolw, data: dataFolw} = useQuery(GET_USER_FOLLOWER, {
        variables: {
            id: id
        }
    })

    const{error: errInv, loading: loadInv, data: dataInv} = useQuery(GET_INVITATION_NUM, {
        variables: {
            id: currId,
            status: false
        }
    })

    const{error: errView, loading: loadView, data: dataView} = useQuery(GET_PROFILE_VIEWS, {
        variables: {
            id: id
        }
    })

    const{error: errExp, loading: loadExp, data: dataExp} = useQuery(GET_USER_EXPERIENCE, {
        variables: {
            id: id
        }
    })

    const{error: errType, loading: loadType, data: dataType} = useQuery(ALL_EMPLOYMENT_TYPES)
    const{error: errBlock, loading: loadBlock, data: dataBlock} = useQuery(GET_BLOCK_BY_USER, {
        variables: {
            id: currId
        }
    })

    useEffect(() => {
        if(!loading){
            setDataLoad(true)
        }
        else {
            setDataLoad(false)
        }

        if(!loadJob) {
            setJobs(dataJob.jobs)
        }

        if(dataJob) {
            setJobs(dataJob.jobs)
        }

        if(dataFol) {
            setFollowing(dataFol.userfollowing)
        }

        if(dataFolw) {
            setFollower(dataFolw.userfollower)
        }

        if(dataInv) {
            setInv(dataInv.userinvitations)
        }

        if(dataCon) {
            setCon(dataCon.userconnections)
        }

        if(dataView) {
            setView(dataView.profileviews)
        }

        if(dataEdu) {
            setEdu(dataEdu.educations)
        }

        if(dataDeg) {
            setDeg(dataDeg.degrees)
        }

        if(dataExp) {
            setExp(dataExp.experiences)
        }

        if(dataType) {
            setType(dataType.employmenttypes)
        }

        if(dataPen) {
            setPen(dataPen.userconnections)
        }
        
        if(dataBlock) {
            setBlock(dataBlock.userblocks)
        }
    }, [loading, loadJob, dataJob, dataFol, dataFolw, dataInv, dataCon, dataView, dataEdu, dataDeg, dataExp, dataType, dataPen, dataBlock])

    useEffect(() => {
        const incViews = () => {
            if(param != "me")
            insertView({
                variables: {
                    id: id
                }, refetchQueries: [{query: GET_PROFILE_VIEWS, variables: {
                    id : id
                }}]
            })
        }

        incViews()
    }, [param])
    
    let navigate = useNavigate()

    const follow = (followed: string) => {
        insertFollowing({
            variables: {
                userid: currId,
                useridfollowed: followed
            }, 
            refetchQueries: [{ query: GET_USER_FOLLOWING, variables: {
                id: currId
            } }]
        })

        insertFollower({
            variables: {
                userid: followed,
                useridfollower: currId
            }
        })
    }

    const connect = (idCon: string) => {
        invite({
            variables: {
                userid: currId,
                useridconnect: idCon,
                status: false,
            }, refetchQueries: [{query: GET_CONNECTION_NUM, variables: {
                id: currId,
                status: false,
            } }]
        })
    }

    const withdraw = (idCon : string) => {
        removeInv ({
            variables: {
                userid: currId,
                useridconnect: idCon,
            }, refetchQueries: [{query: GET_CONNECTION_NUM, variables: {
                id: currId,
                status: false,
            }}]
        })
    }

    const removeEducation = (eduId : string) => {
        removeEdu({
            variables: {
                id : eduId
            }, refetchQueries: [{query: GET_USER_EDUCATION, variables: {
                id : id
            }}]
        })
    }

    const removeExperience = (expId : string) => {
        removeExp({
            variables: {
                id : expId
            }, refetchQueries: [{query: GET_USER_EXPERIENCE, variables: {
                id : id
            }}]
        })
    }

    const unfollow = (followed: string) => {
        removeFolw({
            variables: {
                userid: currId,
                useridfollowed: followed
            }, 
            refetchQueries: [{ query: GET_USER_FOLLOWING, variables: {
                id: currId
            } }]
        })

        removeFol({
            variables: {
                userid: followed,
                useridfollower: currId
            }, refetchQueries: [{ query: GET_USER_FOLLOWER, variables: {
                id: followed
            } }]
        })
    }

    const exportAsPDF = (fileName: string, pro: string, ban: string) => {
        const page = document.getElementById("download-profile")
        html2canvas(page as HTMLElement).then((canvas) => {
            const profile = canvas.toDataURL(pro)
            const banner = canvas.toDataURL(ban)
            const pdf = new jsPDF("p", "mm", [500, 600])
            pdf.addImage(profile, "JPEG", 0, 0)
            pdf.addImage(banner, "JPEG", 0, 0)
            pdf.save(`${fileName}`)
        })
    }

    const disconnect = (idBlocked: string) => {
        removeConnection({
            variables: {
                userid: currId,
                useridconnect: idBlocked,
            }, refetchQueries: [{query: GET_CONNECTION_NUM, variables: {
                id: currId,
                status: true,
            }}, {query: GET_CONNECTION_NUM, variables: {
                id: id,
                status: true,
            }}]
        })

        removeConnection({
            variables: {
                userid: idBlocked,
                useridconnect: currId,
            }, refetchQueries: [{query: GET_CONNECTION_NUM, variables: {
                id: currId,
                status: true,
            }}, {query: GET_CONNECTION_NUM, variables: {
                id: id,
                status: true,
            }}]
        })
    }

    const blockUser = (idBlocked: string) => {
        if(con.some(item => item.useridconnect == currId) == true) {
            disconnect(idBlocked)
        }

        if(following.some(item => item.useridfollowed == id) == true) {
            unfollow(idBlocked)
        }

        if(pen.some(item => item.useridconnect == id) == true) {
            withdraw(idBlocked)
        }

        insertBlock({
            variables: {
                userid: currId,
                useridblocked: idBlocked
            }, refetchQueries: [{query: GET_BLOCK_BY_USER, variables: {
                id: currId
            }}]
        })
    }

    const unblockUser = (idBlocked: string) => {
        removeBlock({
            variables: {
                userid: currId,
                useridblocked: idBlocked
            }, refetchQueries: [{query: GET_BLOCK_BY_USER, variables: {
                id: currId
            }}]
        })
    }

    return (
        <div className='profileView' id='download-profile'>
            <div className="left-profile">
                <div className="profile">
                    <div className="banner">
                        { dataLoad ? (data['users'][0].banner ? <img src={ data['users'][0].banner } alt="not found" /> : <img src="/src/assets/default_banner.jpg" alt="not found" />) : null }
                    </div>
                    <div className="profile-image">
                        { dataLoad ? (data['users'][0].profile ? <img src={ data['users'][0].profile } className="db" alt="not found" /> : <img src="/src/assets/default-profile-photo.jpg" alt="not found" />) : null }
                    </div>
                    <div className="profile-data">
                        {
                            userurl['profile'] == "me" ?
                            <div className="edit-icon">
                                <Link to={'/edit-profile'}><MdOutlineModeEditOutline /></Link>
                            </div>
                            :
                            null
                        }
                        { userurl['profile'] != "me" ?
                            <div className="follow-connect">
                                {
                                    block.length == 0 || (block.some(item => item.useridblocked == id) == false) ?
                                    <div className="block">
                                        <button type='button' onClick={ () => {
                                            blockUser(id)
                                        }}>Block</button>
                                    </div>
                                    :
                                    <div className="blocked">
                                        <button type='button' onClick={ () => {
                                            unblockUser(id)
                                        }}></button>
                                    </div>
                                }
                                { (block.some(item => item.useridblocked == id) == false) ?
                                    (
                                        following.length == 0 || (following.some(item => item.useridfollowed == id) == false) ? 
                                        <div className="follow">
                                            <button type='button' onClick={ () => follow(id) }>Follow</button>
                                        </div>
                                        :
                                        <div className="following">
                                            <button type='button' onClick={ () => unfollow(id) }></button>
                                        </div> 
                                    )
                                    :
                                    <></>
                                }

                                { 
                                (block.some(item => item.useridblocked == id) == false) ?
                                (inv.length != 0 && (inv.some(item => item.userid == id) == true) ?
                                <div className="connect">
                                    <button type='button'>Accept Invite</button>
                                </div>
                                :
                                <>
                                    {
                                        pen.length != 0 ? ((pen.some(item => item.useridconnect == id) == true) ?
                                        <div className="withdraw">
                                            <button type='button' onClick={ () => withdraw(id) }>Withdraw</button>
                                        </div> : 
                                        <>
                                        { 
                                            (con.some(item => item.useridconnect == currId) == false) ? 
                                            <div className="connect">
                                                <button type='button' onClick={ () =>  connect(id) }>Connect</button>
                                            </div>
                                            :
                                            <div className="connection">
                                                <button type='button'>Connection</button>
                                            </div> 
                                        }
                                        </>)
                                        :
                                        <>
                                        { 
                                            (con.some(item => item.useridconnect == currId) == false) ? 
                                            <div className="connect">
                                                <button type='button' onClick={ () =>  connect(id) }>Connect</button>
                                            </div>
                                            :
                                            <div className="connection">
                                                <button type='button'>Connection</button>
                                            </div> 
                                        }
                                        </>
                                    }
                                </>)
                                :
                                <></>
                                } 
                            </div>
                            :
                            <div className="follow-connect">
                                <div className="follow">
                                    <button type='button' onClick={ () => exportAsPDF(`${data['users'][0].firstname} ${data['users'][0].lastname}'s Profile`, data['users'][0].profile, data['users'][0].banner) }>Export as PDF</button>
                                </div>
                            </div>
                        }
                        { dataLoad ? <h1>{data['users'][0].firstname } { data['users'][0].lastname }</h1> : <h1>Loading...</h1> }
                        { dataLoad ? (data['users'][0].headline ? <p>{ data['users'][0].headline }</p> : <p></p>) : null } 
                        { dataLoad ? (data['users'][0].locationid ? <p>Show Location</p> : <p></p>) : null}
                        <div className="follow-connect-num">
                            { id == "" ? <p>loading</p> : !loadCon && dataCon ? <p className='connections'><Link to={''}>{ con.length } Connections</Link></p> : <p>loading...</p> }
                            { id == "" ? <p>loading</p> : !loadFolw && dataFolw ? <p className='connections'><Link to={''}>{ follower.length } Followers</Link></p> : <p>loading...</p> }
                            { id == "" ? <p>loading</p> : (userurl['profile'] == "me" ? <p className='connections'><Link to={''}>{ view.length / 2 } Profile views</Link></p> : null) }
                        </div>
                    </div>
                </div>

                { userurl['profile'] == "me" ? 
                    <div className="about">
                        <div className="edit-icon">
                            <Link to={'/edit-profile'}><MdOutlineModeEditOutline /></Link>
                        </div>

                        <p className='title-about'>About</p>

                        <div className="content-about">
                            { dataLoad ? (data['users'][0].about != "" ? <p> { data['users'][0].about } </p> : <p>Start writing about yourself</p>) : null }
                        </div>
                    </div>
                : 
                    <div className="about">
                        <p className='title-about'>About</p>

                        <div className="content-about">
                            { dataLoad ? (data['users'][0].about != "" ? <p> { data['users'][0].about } </p> : <p>Not Set</p>) : null }
                        </div>
                    </div>
                }

                <div className="experience">
                    {
                        userurl['profile'] == "me" ?
                        <div className="edit-icon">
                            <Link to={'/edit-experience'}><IoMdAdd /></Link>
                        </div>
                        : 
                        <></>
                    }
                    <h1>Experience</h1>
                    { exp.length == 0 ?
                        ( userurl['profile'] == "me" ? <p>Set your experience</p> : <p>Experience not set</p>)
                        :
                        exp.map((e) => {
                            return <div className='experienceList' key={e.id}>
                                <hr />
                                <div className="edit-icon">
                                    <AiOutlineMinus onClick={ () => removeExperience(e.id) }></AiOutlineMinus>
                                </div>
                                <p>{ e.title } [{ e.industry }]</p>
                                {
                                    type.map((ty) => {
                                        if(ty.id == e.employmentypeid) {
                                            return <p key={ty.id}>{ ty.employmenttypename }</p>
                                        }
                                    })
                                }
                                <p>{ e.companyname }</p>
                                <p>{ e.location }</p>
                                <p>{ e.startdate } - { e.enddate == null ? <span> Present</span> : e.enddate}</p>
                                <hr className='hr-bottom'></hr>
                            </div>
                        })
                    }
                </div> 

                <div className="education">
                    {
                        userurl['profile'] == "me" ?
                        <div className="edit-icon">
                            <Link to={'/edit-education'}><IoMdAdd /></Link>
                        </div>
                        : 
                        <></>
                    }
                    <h1>Education</h1>
                    { edu.length == 0 ? 
                        ( userurl['profile'] == "me" ? <p>Set your education</p> : <p>Education not set</p>)
                        :
                        edu.map((e) => {
                            return <div key={e.id} className='educationList'>
                                <hr />
                                <div className="edit-icon">
                                    <AiOutlineMinus onClick={ () => removeEducation(e.id) }></AiOutlineMinus>
                                </div>
                                <p>{ e.schoolname }</p>
                                <p>{ e.fieldofstudy }</p>
                                {
                                    deg.map((deg) => {
                                        if(deg.id == e.degreeid) {
                                            return <p key={deg.id}>{ deg.degreename }</p>
                                        }
                                    })
                                }
                                <p>Grade: { e.grade == null ? <span></span> : <span>{ e.grade }</span> }</p>
                                <p>{ e.startdate } - { e.enddate == null ? <span> Present</span> : e.enddate}</p>
                                <p>{ e.activities == null ? <span></span> : <span>{ e.activities }</span> }</p>
                                <p>{ e.description == null ? <span></span> : <span>{ e.description }</span> }</p>
                                <hr className='hr-bottom'></hr>
                            </div>
                        })
                    }
                </div>

                {
                    id == "" ? <p>loading...</p> :
                    (
                        (!loadJob ? 
                            (dataJob['jobs'].length != 0 ? 
                                <div className="uploaded-jobs">
                                    { userurl['profile'] == "me" ?  
                                        <i onClick={ () => {
                                            navigate('/jobs')
                                        }}><IoMdAdd /></i>
                                        :
                                        <i></i>
                                    }
                                    <p className='title-job'>Posted Jobs</p>

                                    <div className="list-job">
                                        { jobs.map((e) => {
                                            return (
                                                <p key={e.id}>{e.name}</p>
                                            )
                                        }) }
                                    </div>
                                </div> 
                                : 
                                <div></div>
                            ) : null
                        )
                    )
                }
            </div>

            <div className="right-profile">
                <div className="edit-pro">
                    <h1><Link to={'/edit-profile'}>Edit Profile</Link></h1>
                    <hr />
                </div>
                <Link to={'/jobs'}>
                    <div className="jobs-profile">
                        <img src="/src/assets/jobs_img.jpg" alt="" />
                    </div>
                </Link>
            </div>
        </div>
    )
}
