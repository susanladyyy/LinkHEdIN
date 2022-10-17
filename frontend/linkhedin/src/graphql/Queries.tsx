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
            banner
            theme
            display
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
            banner
            theme
            display
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
            banner
            theme
            display
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
            banner
            theme
            display
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

export const GET_CONNECTION_NUM = gql`
    query getUserConnection
    (
        $id : Float!
        $status : Boolean!
    ){
        userconnections (
            id: $id,
            status: $status
        ) {
            id
            userid
            useridconnect
            status
        }
    }
`

export const GET_INVITATION_NUM = gql`
    query getUserInvitation(
        $id: Float!,
        $status: Boolean!
    ) {
        userinvitations (
            id: $id,
            status: $status
        ) {
            id
            userid
            useridconnect
            status
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

export const GET_USER_FOLLOWING = gql`
    query getUserFollowing(
        $id:Float!
    ) {
        userfollowing (
            id: $id
        ) {
            id
            userid
            useridfollowed
        }
    }
`

export const GET_USER_FOLLOWER = gql`
    query getUserFollower(
        $id:Float!
    ) {
        userfollower (
            id: $id
        ) {
            id
            userid
            useridfollower
        }
    }
`

export const GET_NOTIFICATIONS = gql`
    query getNotifications {
        notifications {
            id
            userid
            desc
            date
        }
    }
`

export const GET_PROFILE_VIEWS = gql`
    query getUserProfileViews(
        $id: Float!
    ) {
        profileviews (
            id: $id
        ) {
            id
            useridviewed
        }
    }
`

export const GET_USER_EDUCATION = gql`
    query getUserEducation (
        $id :Float!
    ) {
        educations (
            id: $id
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

export const GET_USER_EXPERIENCE = gql`
    query getUserExperience (
        $id: Float!
    ) {
        experiences (
            id: $id
        ) {
            id
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

export const GET_ALL_POST = gql`
    query getAllPost {
        posts {
            id
            userid
            media
            caption
            display
        }
    }
`

export const GET_COMMENTS = gql`
    query getComments {
        comments {
            id
            userid
            postid
            comment
        }
    }
`

// export const GET_COMMENTS = gql`
//     query getComments(
//         $offset: Int!
//         $limit:Int!
//     ){
//         comments (
//             offset: $offset
//             limit: $limit
//         ){
//             id
//             userid
//             postid
//             comment
//         }
//     }
// `

export const GET_LIKES = gql`
    query getLikes {
        likes {
            id
            userid
            postid
        }
    }
`

export const GET_COMMENT_LIKES = gql`
    query getCommentLikes {
        commentlikes {
            id
            commentid
            userid
        }
    }
`

export const GET_POST_BY_CAPTION = gql`
    query getPostByCaption (
        $caption: String
    ) {
        posts (
            title: $caption
        ) {
            id
            userid
            media
            caption
            display
        }
    }
`

export const GET_BLOCK_BY_USER = gql`
    query getUserBlocks (
        $id: Float
    ) {
        userblocks (
            id: $id
        ){
            id
            userid
            useridblocked
        }
    }
`

export const GET_BLOCKED = gql`
    query getBlocks (
        $useridblocked: Float
    ) {
        userblocks (
            blocked: $useridblocked
        ) {
            id
            userid
            useridblocked
        }
    }
`

export const GET_COMMENT_REPLIES = gql`
    query getCommentReplies {
        commentreplies {
            id
            commentid
            userid
            commentreply
        }
    }
`

export const GET_COMMENT_REPLY_LIKES = gql`
    query getCommentReplyLikes {
        commentreplylikes {
            id
            userid
            commentreplyid
        }
    }
`

export const GET_MESSAGES = gql`
    query messages {
        messages {
            id
            useridsend
            useridreceive
        }
    }
`

export const GET_USER_MESSAGES = gql`
    query usermessages {
        usermessages {
            id
            useridsend
            useridreceive
            message
        }
    }
`