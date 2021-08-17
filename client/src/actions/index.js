import ApolloClient from 'apollo-boost'
import gql from 'graphql-tag'

const API_URL = 'http://localhost:3001/graphql'

const client = new ApolloClient({
    uri: API_URL
})


// start load phone data
const loadPhoneSuccess = (phones, totalData) => ({
    type: 'LOAD_PHONE_SUCCESS',
    totalData,
    phones
})

const loadPhoneFailure = () => ({
    type: 'LOAD_PHONE_FAILURE'
})

export const loadPhone = (offset = 0, limit = 5) => {
    const usersQuery = gql`
    query{
        phones(pagination:{offset: ${offset}, limit:${limit}}){
            totalData
            items{
                id,
                Name
                Phone
            }
        }
    }`
    return dispatch => {
        return client.query({
            query: usersQuery,
        }).then(function (response) {
            dispatch(loadPhoneSuccess(response.data.phones.items))
            
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

export const cancelSearch = (filter) => ({
    type: "MODE_SEARCH_INACTIVE",
    filter
})

export const searchPhones = (name, phone, offset = 0, limit = 5) => {
    const searchQuery = gql`
    query phones($name:String,$phone:String,$offset:Int,$limit:Int){
        phones(name:$name,phone:$phone,pagination:{
            offset:$offset,
            limit:$limit
        }) {
            totalData
            items{
                id
                Name
                Phone
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
                limit
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

const postPhoneSuccess = (phones) => ({
    type: 'POST_PHONE_SUCCESS',
    phones
})

const postPhoneFailure = (id) => ({
    type: 'POST_PHONE_FAILURE', id
})

const postPhoneRedux = (id, Name, Phone) => ({
    type: 'POST_PHONE', id, Name, Phone
})

 
export const postPhone = (Name, Phone) => {
    let id = Date.now();
    const addQuery = gql`
    mutation addContact($Name: String!, $Phone: String!,$id:ID!) {
        addContact(Name: $Name, Phone: $Phone,id:$id) {
            Name
            Phone
            id
        }
    }`
    return dispatch => {
        dispatch(postPhoneRedux(id, Name, Phone))
        return client.mutate({ 
            mutation: addQuery,
            variables: {
                Name,
                Phone,
                id
            }
        })
            .then(function (response) {
                console.log(response)
                dispatch(postPhoneSuccess(response.data.addContact))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(postPhoneFailure(id))
            });
    }
}

// start delete phone data

const deletePhoneRedux = (id) => ({
    type: 'DELETE_PHONE',
    id
})

const deletePhoneSuccess = (id) => ({
    type: 'DELETE_PHONE_SUCCESS',
    id
})

const deletePhoneFailure = () => ({
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

const resendChatSuccess = (id) => ({
    type: 'RESEND_CHAT_SUCCESS',
    id
})


export const resendPhone = (id, Name, Phone) => {
    const addQuery = gql`
    mutation addContact($Phone: String!, $Name: String!, $id:ID!){
        addContact(Phone: $Phone, Name: $Name, id: $id){
            Phone
            Name
        }
    }`
    return dispatch => {
        return client.mutate({
            mutation: addQuery,
            variables: {
                Phone,
                Name,
                id
            }
        })
            .then(function (response) {
                dispatch(resendChatSuccess(id))
            })
            .catch(function (error) {
                console.error(error);
                dispatch(postPhoneFailure(id))
            });
    }
}
// end resend phone data

// start edit phone data

const togleThisButton = (id) => ({
    type: 'TOGLE',
    id
})

export const togleButtonCta = (id) => {
    return dispatch => {
        dispatch(togleThisButton(id))
    }
}

const clickEdit = (id) => ({
    type: 'EDIT_CLICK',
    id
})

export const clickEditAct = (id) => {
    return dispatch => {
        dispatch(clickEdit(id))
    }
}

const cancelEdit = (id) => ({
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


const updatePhoneSuccess = (phone) => ({
    type: 'UPDATE_PHONE_SUCCESS',
    phone
})

const updatePhoneFailure = (id) => ({
    type: 'UPDATE_PHONE_FAILURE',
     id
})

const updatePhoneRedux = (id, Name, Phone) => ({
    type: 'UPDATE_PHONE',
     id, 
     Name, 
     Phone
})


export const editUpdatePhone = (id, Name, Phone) => {
    const updateQuery = gql`
    mutation updateContact($Phone: String!, $Name: String!, $id: ID!){
        updateContact(Phone: $Phone, Name:$Name, id:$id){
            Phone
            Name
            id
        }
    }`

    return dispatch => {
        dispatch(updatePhoneRedux(id, Name, Phone))
        return client.mutate({
            mutation: updateQuery,
            variables:{
                Phone,
                Name,
                id
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
    offset
})

export const previousPage = (offset) => ({
    type: "PREVIOOUS_PAGE",
    offset
})

export const switchPage = (offset, switchToPage) => ({
    type: "SWITCH_PAGE",
    offset,
    switchToPage
})


//end edit phone data

