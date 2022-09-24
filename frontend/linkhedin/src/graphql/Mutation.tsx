import { gql } from "@apollo/client/core";

export const CREATE_USER = gql`
    mutation insertNewUser (
        $firstname: String!
        $lastname: String!
        $password: String!
        $profileurl: String!
        $email: String!
        $activation: Boolean!
    ) {
        createUser (input: {
            firstname : $firstname,
            lastname : $lastname,
            password : $password,
            profileurl : $profileurl,
            email : $email,
            activation : $activation
        }) {
            id
            firstname
            lastname
            password
            profileurl
            email
            activation
        }
    }
`

export const CREATE_TEMPORARY = gql`
    mutation insertTemporary (
        $email: String!
        $password: String!
        $url: String!
        ) {
        createTemporary (input: {
            password : $password,
            email : $email,
            url: $url
        }) {
            email
            password
            url
        }
    }
`

export const DELETE_TEMPORARY = gql`
    mutation deleteTemporary (
        $url: String!
    ) {
        deleteTemporary (input: {
            url: $url
        })
    }
`

export const UPDATE_PASSWORD = gql`
    mutation updatePassword (
        $id: ID!
        $password: String!
    ) {
        updatePassword (
            input: {
                id: $id
                password: $password
            }
        ) {
            id
            firstname
        }
    }
`

export const INSERT_JOB = gql`
    mutation insertJob (
        $name: String!
        $company: String!
        $location: String!
        $userid: Float!
    ) {
        createJob (input: {
            name:$name
            company: $company
            location: $location
            userid: $userid
        }) {
            id
            name
            company
            location
            userid
        }
    }
`

export const UPDATE_CONNECTION = gql`
    mutation updateConnect (
        $userid: Float!
        $useridconnect:Float!
    ){
        updateConnect(
            input: {
                userid: $userid
                useridconnect: $useridconnect
                status: true
            }
        ){
            id
            userid
            useridconnect
            status
        }
    }
`

export const INSERT_CONNECTION = gql`
    mutation insertConnection (
        $userid:Float!
        $useridconnect: Float!
        $status: Boolean!
    ) {
        createConnect (input:{
            userid: $userid,
            useridconnect: $useridconnect,
            status:$status
        }) {
            id
            userid
            useridconnect
            status
        }
    }
`

export const DELETE_CONNECTION = gql`
    mutation deleteConnection (
        $userid: Float!
        $useridconnect: Float!
    ) {
        deleteConnect (input: {
            userid: $userid,
            useridconnect:$useridconnect
        })
    }
`

export const INSERT_NOTIFICATION = gql`
    mutation insertNotification (
        $userid: Float!
        $desc: String!
        $date: String!
    ) {
        createNotification (
            input: {
                userid: $userid
                desc: $desc
                date: $date
            }
        ) {
            id
            userid
            desc
            date
        }
    }
`

export const INSERT_FOLLOWING = gql`
    mutation insertFollowing(
        $userid: Float!
        $useridfollowed: Float!
    ) {
        createFollowing (
            input: {
                userid: $userid
                useridfollowed: $useridfollowed
            }
        ) {
            id
            userid
            useridfollowed
        }
    }
`

export const INSERT_FOLLOWER = gql`
    mutation insertFollower(
        $userid: Float!
        $useridfollower: Float!
    ) {
        createFollower (
            input: {
                userid: $userid
                useridfollower: $useridfollower
            }
        ) {
            id
            userid
            useridfollower
        }
    }
`

export const DELETE_FOLLOWER = gql`
    mutation deleteFollower(
        $userid: Float!
        $useridfollower: Float!
    ) {
        deleteFollower (
            input: {
                userid: $userid
                useridfollower: $useridfollower
            }
        )
    }
`

export const DELETE_FOLLOWING = gql`
    mutation deleteFollowing(
        $userid: Float!
        $useridfollowed: Float!
    ) {
        deleteFollowing (
            input: {
                userid: $userid
                useridfollowed: $useridfollowed
            }
        )
    }
`

export const INSERT_VIEW = gql`
    mutation insertView(
        $id: Float!
    ) {
        createView (
            input: {
            useridviewed:$id
            }
        ) {
            id
            useridviewed
        }
    }
`

export const DELETE_VIEWS = gql`
    mutation deleteViews {
        deleteView(status: true)
    }
`

export const INSERT_EDUCATION = gql`
    mutation insertEducation (
        $Grade: Float!
        $Activities: String
        $Description: String
        $Schoolname: String!
        $Degreeid: Float!
        $Fieldofstudy: String!
        $Startdate: String!
        $Enddate: String
        $Userid: Float!
    ) {
        createEducation (
            input: {
                grade: $Grade,
                activities: $Activities,
                description: $Description,
                schoolname: $Schoolname,
                degreeid: $Degreeid,
                fieldofstudy: $Fieldofstudy,
                startdate: $Startdate,
                enddate: $Enddate,
                userid: $Userid
            }
        ) {
            id
            grade
            activities
            description
            schoolname
            degreeid
            fieldofstudy
            startdate
            enddate
            userid
        }
    }
`

export const INSERT_EXPERIENCE = gql`
    mutation insertExperience (
        $Userid: Float!
        $Title: String!
        $Employmentypeid: Float!
        $Companyname: String!
        $Location: String!
        $Startdate: String!
        $Enddate: String
        $Description: String
        $Industry: String!
    ) {
        createExperience (
            input: {
                userid: $Userid
                title: $Title
                employmentypeid: $Employmentypeid
                companyname: $Companyname
                location: $Location
                startdate: $Startdate
                enddate: $Enddate
                description: $Description
                industry: $Industry
            }
        ) {
            userid
            title
            employmentypeid
            companyname
            location
            startdate
            enddate
            description
            industry
        }
    }
`

export const UPDATE_PROFILE = gql`
    mutation updateProfile (
        $id: ID!
        $firstname: String!
        $lastname: String!
        $headline: String
        $about: String
    ) {
        updateProfile (
            input: {
                id: $id
                firstname: $firstname
                lastname: $lastname
                headline:$headline
                about: $about
            }
        ) {
            id
            email
            lastname
            firstname
            password
            activation
            profileurl
            profile
            about
            headline
        }
    }
`

export const DELETE_EDUCATION = gql`
    mutation deleteEducation (
        $id: ID!
    ) {
        deleteEducation (
            id: $id
        )
    }
`

export const DELETE_EXPERIENCE = gql`
    mutation deleteExperience (
        $id: ID!
    ) {
        deleteExperience (
            id: $id
        )
    }
`