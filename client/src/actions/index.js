import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const API_URL = 'http://localhost:3001/graphql'

const client = new ApolloClient({
    uri: API_URL
})

// start load phone data
export const loadPhoneSuccess = ({ totalData, items }) => ({
    type: 'LOAD_PHONE_SUCCESS',
    totalData,
    items
})

export const loadPhoneFailure = () => ({
    type: 'LOAD_PHONE_FAILURE'
})

export const loadPhone = (offset = 0, limit = 3) => {
    const usersQuery = gql`
    query{
        phones(pagination:{offset: ${offset}, limit:${limit}}){
            totalData
            items{
                id
                name
                phone
                image
            }
        }
    }`
    return dispatch => {
        return client.query({
            query: usersQuery,
        }).then(function (response) {
            // console.log('load', response.data)
            dispatch(loadPhoneSuccess(response.data.phones))
        }).catch(function (error) {
            console.error(error);
            dispatch(loadPhoneFailure())
        })
    }
}

//end load phone data


// on search 
export const searchMode = (filter) => ({
    type: 'MODE_SEARCH_ACTIVE',
    filter
})

export const cancelSearch = () => ({
    type: "MODE_SEARCH_INACTIVE",
})

export const searchPhones = (name, phone, image, offset = 0, limit = 3) => {
    const searchQuery = gql`
    query phones($name:String,$phone:String,$offset:Int,$limit:Int , $image: String){
        phones(name:$name,phone:$phone , image: $image,pagination:{
            offset:$offset,
            limit:$limit
        }) {
            totalData
            items{
                id
                name
                phone
                image
            }
        }
    }`
    return dispatch => {
        return client.query({
            query: searchQuery,
            variables: {
                name,
                phone,
                offset,
                limit,
                image
            }
        })
            .then(response => {
                dispatch(loadPhoneSuccess(response.data.phones))
            })
            .catch(error => {
                console.log(error)
                dispatch(loadPhoneFailure())
            })
    }
}


// start post phone data

export const postPhoneSuccess = (phones) => ({
    type: 'POST_PHONE_SUCCESS',
    phones
})

export const postPhoneFailure = (id) => ({
    type: 'POST_PHONE_FAILURE', id
})

export const postPhoneRedux = (id, name, phone, image) => ({
    type: 'POST_PHONE',
    id,
    name,
    phone,
    image
})


export const postPhone = (name, phone, image) => {
    let id = Date.now();
    const addQuery = gql`
    mutation addContact($name: String!, $phone: String!, $id:ID! $image: String!) {
        addContact(name: $name, phone: $phone, id:$id, image: $image ) {
            name
            phone
            id
            image
        }
    }`
    return dispatch => {
        dispatch(postPhoneRedux(
            id,
            name,
            phone,
            image))
        return client.mutate({
            mutation: addQuery,
            variables: {
                name,
                phone,
                id,
                image
            }
        })
            .then(function (response) {
                console.log('add', response)
                dispatch(postPhoneSuccess(response.data.addContact))
            })
            .catch(function (error) {
                console.error('eror action',error);
                dispatch(postPhoneFailure(id))
            });
    }
}

// start delete phone data

export const deletePhoneRedux = (id) => ({
    type: 'DELETE_PHONE',
    id
})

export const deletePhoneSuccess = (id) => ({
    type: 'DELETE_PHONE_SUCCESS',
    id
})

export const deletePhoneFailure = () => ({
    type: 'DELETE_PHONE_FAILURE'
})


export const deletePhone = (id) => {
    const deleteQuery = gql`
    mutation removeContact($id: ID!) {
        removeContact(id: $id){
            id
        }
    }`;

    return dispatch => {
        dispatch(deletePhoneRedux(id))
        return client.mutate({
            mutation: deleteQuery,
            variables: {
                id
            }
        })
            .then(function (response) {
                dispatch(deletePhoneSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(deletePhoneFailure())
            });
    }
}

// end delete phone data

// start resend phone data

export const resendChatSuccess = (id) => ({
    type: 'RESEND_CHAT_SUCCESS',
    id
})


export const resendPhone = (id, name, phone, image) => {
    const addQuery = gql`
    mutation addContact($name: String!, $phone: String!,$id:ID!, $image: String!){
        addContact(name: $name, phone: $phone,id:$id, image: $image){
            phone
            name
            image
        }
    }`
    return dispatch => {
        return client.mutate({
            mutation: addQuery,
            variables: {
                phone,
                name,
                id,
                image
            }
        })
            .then(function (response) {
                dispatch(resendChatSuccess(id))
            })
            .catch(function (error) {
                console.error('client',error);
                dispatch(postPhoneFailure(id))
            });
    }
}
// end resend phone data

// start edit phone data

export const togleThisButton = (id) => ({
    type: 'TOGLE',
    id
})

export const TogleButtonCta = () => {
    return dispatch => {
        dispatch(togleThisButton())
    }
}

export const clickEdit = (id) => ({
    type: 'EDIT_CLICK',
    id
})

export const clickEditAct = (id) => {
    return dispatch => {
        dispatch(clickEdit(id))
    }
}

export const cancelEdit = (id) => ({
    type: 'EDIT_CLICK_CANCEL',
    id
})

export const clickCancel = (id) => ({
    type: 'CANCEL_CLICK',
    id
})

export const clickCancelEditAct = (id) => {
    return dispatch => {
        dispatch(cancelEdit(id))
    }
}


export const updatePhoneSuccess = (phone) => ({
    type: 'UPDATE_PHONE_SUCCESS',
    phone
})

export const updatePhoneFailure = (id) => ({
    type: 'UPDATE_PHONE_FAILURE',
    id
})

export const updatePhoneRedux = (id, Name, Phone) => ({
    type: 'UPDATE_PHONE',
    id,
    Name,
    Phone
})


export const editUpdatePhone = (id, name, phone) => {
    const updateQuery = gql`
    mutation updateContact($name: String!, $phone: String!,$id:ID!){
        updateContact(name: $name, phone: $phone,id:$id){
            phone
            name
            id
            image
        }
    }`

    return dispatch => {
        dispatch(updatePhoneRedux(id, name, phone))
        return client.mutate({
            mutation: updateQuery,
            variables: {
                phone,
                name,
                id,
            }
        })
            .then(function (response) {
                dispatch(updatePhoneSuccess(response.data))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(updatePhoneFailure(id))
            });
    }
}


export const nextPage = (offset) => ({
    type: "NEXT_PAGE",
    offset,
})

export const previousPage = (offset) => ({
    type: "PREVIOUS_PAGE",
    offset,
})

export const switchPage = (offset, switchToPage) => ({
    type: "SWITCH_PAGE",
    offset,
    switchToPage
})


//end edit phone data

