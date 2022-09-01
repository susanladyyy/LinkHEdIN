import { gql } from "@apollo/client/core";

export const ALL_COUNTRIES = gql` 
    query getAllCountries {
        countries {
            id
            countryname
        }
    }
`

export const ALL_CITIES = gql`
    query getAllCities {
        cities {
            id
            countryid
            cityname
        }
    } 
`

export const ALL_PRONOUNS = gql`
    query getAllPronouns {
        pronouns {
            id
            pronounsname
        }
    }
`

export const ALL_INDUSTRIES = gql`
    query getAllIndustries {
        industries {
            id
            industryname
        }
    }
`

export const ALL_EMPLOYMENT_TYPES = gql`
    query getAllEmploymentTypes {
        employmenttypes {
            id
            employmenttypename
        }
    }
`

export const ALL_DEGREES = gql`
    query getAllDegrees {
        degrees {
            id
            degreename
        }
    }
`

export const ALL_SCHOOLS = gql`
    query getAllSchools {
        schools {
            id
            schoolname
        }
    }
`

export const ALL_STUDY_FIELDS = gql`
    query getAllStudyFields {
        studyfields {
            id
            fieldname
        }
    }
`

export const ALL_PHONE_TYPES = gql`
    query getAllPhoneTypes {
        phonetypes {
            id
            phonetypename
        }
    }
`

export const ALL_WEBSITE_TYPES = gql`
    query getAllWebsiteTypes {
        websitetypes {
            id
            websitetypename
        }
    }
`

export const ALL_SERVICE_TYPES = gql`
    query getAllServicesTypes {
        servicetypes {
            id
            servicename
        }
    }
`

export const ALL_MEDIA_TYPES = gql`
    query getAllMediaTypes {
        mediatypes {
            id
            mediatypename
        }
    }
`

export const ALL_SKILLS = gql`
    query getAllSkills {
        skills {
            id
            skillname
        }
    }
` 

export const GET_USER_BY_EMAIL = gql`
    query getUserByEmail (
        $email: String!
    ){
        users (email: $email) {
            id
            email
            lastname
            firstname
            password
            activation
            profileurl
            profile
            about
        }
    }
`

export const GET_ALL_USERS = gql`
    query getAllUsers {
        users {
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

export const GET_USER_BY_URL = gql`
    query getUserByCode (
        $url: String!
    ){
        users (url: $url) {
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

export const SEARCH_USER_BY_NAME = gql`
    query searchUser (
        $name: String!
    ){
        users (name: $name){
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

export const GET_ALL_TEMPS = gql`
    query getAllTemps {
        temporaries {
            email
            password
            url
        }
    }
`

export const GET_ALL_USER_EDUCATION = gql`
    query getAllUserEdus ($id: ID!){
        usereducations (id: $id) {
            id
            educationid
        }
    }
`

export const GET_INVITATION_NUM = gql`
    query getUserConnection
    (
        $id:ID!
        $status:Boolean!
    ){
        userconnections (
            id: $id,
            status: $status
        ) {
            useridconnect
        }
    }
`

export const GET_ALL_JOBS = gql`
    query getAllJobs {
        jobs {
            id
            name
            company
            location
            userid
        }
    }
` 

export const GET_JOB_BY_USER_ID = gql`
    query getJobByUserId (
        $id: ID
    ) {
        jobs (
            userid: $id
        ) {
            id
            name
            company
            location
            userid
        }
    }
`