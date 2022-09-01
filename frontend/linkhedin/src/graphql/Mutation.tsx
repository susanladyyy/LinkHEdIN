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
        $id: ID!
        $status: Boolean!
    ){
        updateConnect(
            input: {
                id: $id,
            status: $status
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
        $id: ID!
    ) {
        deleteConnect (input: {
            id: $id
        })
    }
`