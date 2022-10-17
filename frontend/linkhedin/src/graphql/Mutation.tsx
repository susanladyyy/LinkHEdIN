import { gql } from "@apollo/client/core";

export const CREATE_USER = gql`
    mutation insertNewUser (
        $firstname: String!
        $lastname: String!
        $password: String!
        $profileurl: String!
        $email: String!
        $activation: Boolean!
        $theme: Boolean!
        $display: String!
    ) {
        createUser (input: {
            firstname : $firstname,
            lastname : $lastname,
            password : $password,
            profileurl : $profileurl,
            email : $email,
            activation : $activation,
            theme: $theme,
            display: $display
        }) {
            id
            firstname
            lastname
            password
            profileurl
            email
            activation
            theme
            display
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
        $profile: String
        $banner: String
    ) {
        updateProfile (
            input: {
            id: $id
            firstname: $firstname
            lastname: $lastname
            headline:$headline
            about: $about
            profile: $profile
            banner: $banner
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
                banner
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

export const INSERT_POST = gql`
    mutation insertPost (
        $userid: Float!
        $media: String
        $caption: String!
        $display: String!
    ) {
        createPost(
            input: {
                userid: $userid
                media: $media
                caption: $caption
                display: $display
            }
        ) {
            id
            userid
            media
            caption
            display
        }
    }
`

export const INSERT_COMMENT = gql`
    mutation insertComment (
        $userid: Float!
        $postid: Float!
        $comment: String!
    ) {
        createComment(
            input: {
                userid: $userid
                postid: $postid
                comment: $comment
            }
        ) {
            id
            userid
            postid
            comment
        }
    }
`

export const INSERT_LIKE = gql`
    mutation insertLike (
        $userid: Float!
        $postid: Float!
    ) {
        createLike (
            input: {
                userid: $userid
                postid: $postid
            }
        ) {
            id
            userid
            postid
        }
    }
`

export const DELETE_LIKE = gql`
    mutation deleteLike (
        $id :ID!
        $userid : ID!
    ) {
        deleteLike (
            id: $id
            userid: $userid
        )
    }
`

export const DELETE_COMMENT = gql`
    mutation deleteComment (
        $id: ID!
    ) {
        deleteComment (
            id: $id
        )
    }
`

export const INSERT_COMMENT_LIKE = gql`
    mutation insertCommentLike (
        $commentid: Float!
        $userid: Float!
    ) {
        createCommentLike (
            input: {
                commentid: $commentid
                userid: $userid
            }
        ) {
            id
            userid
            commentid
        }
    }
`

export const DELETE_COMMENT_LIKE = gql`
    mutation deleteCommentLike (
        $commentid: Float!
        $userid: Float!
    ) {
        deleteCommentLike (
            commentid: $commentid
            userid: $userid
        )
    }
`

export const INSERT_BLOCK = gql`
    mutation insertBlock (
        $userid: Float!
        $useridblocked: Float!
    ) {
        createBlock (
            input: {
                userid: $userid
                useridblocked: $useridblocked
            }
        ) {
            id
            userid
            useridblocked
        }
    }
`

export const DELETE_BLOCK = gql`
    mutation deleteBlock (
    $userid: Float!
    $useridblocked: Float!
    ) {
        deleteBlock (
            input: {
                userid: $userid
                useridblocked: $useridblocked
            }
        )
    }
`

export const INSERT_COMMENT_REPLY = gql`
    mutation createCommentReply (
        $commentid: Float!
        $userid: Float!
        $commentreply: String!
    ) {
        createCommentReply (
            input: {
                commentid: $commentid
                userid: $userid
                commentreply: $commentreply
            }
        ) {
            id
            commentid
            userid
            commentreply
        }
    }
`

export const DELETE_COMMENT_REPLY = gql`
    mutation deleteCommentReply (
        $id: ID!
    ) {
        deleteCommentReply (
            id: $id
        )
    }
`

export const INSERT_COMMENT_REPLY_LIKE = gql`
    mutation createCommentLike (
        $userid: Float!
        $commentreplyid: Float!
    ) {
        createCommentReplyLike (
            input: {
                userid: $userid
                commentreplyid: $commentreplyid
            }
        ) {
            id
            userid
            commentreplyid
        }
    }
`

export const DELETE_COMMENT_REPLY_LIKE = gql`
    mutation deleteCommentReplyLike (
        $userid: Float!
        $commentreplyid: Float!
    ) {
        deleteCommentReplyLike (
            userid: $userid
            commentreplyid: $commentreplyid
        )
    }
`

export const UPDATE_THEME = gql`
    mutation updateTheme (
        $id: ID!
        $theme: Float!
    ) {
        updateTheme (
            input: {
                id: $id
                theme: $theme
            }
        ) {
            theme
        }
    }
`