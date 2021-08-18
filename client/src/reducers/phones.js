let globalState = {
    phones: [],
    isActive: false,
    pages: 0,
    limit: 3,
    offset: 0,
    currentPage: 1,
    isSearchModeOn: false,
    filterName: '',
    filterPhone: ''
}

const phones = (state = globalState, action) => {
    switch (action.type) {
        case 'LOAD_PHONE_SUCCESS':

            return {
                ...state,
                phones: action.items.map((item) => {
                    item.sent = true
                    item.isEdit = false
                    return item
                }),

                pages: Number(Math.ceil(action.totalData / state.limit)),
                totalData: Number(action.totalData),
            }

        case 'MODE_SEARCH_ACTIVE':
            return {

                ...state,
                isSearchModeOn: true,
                filterName: action.filter.Name,
                filterPhone: action.filter.Phone
            }

        case 'MODE_SEARCH_INACTIVE':
            return {
                ...state,
                isSearchModeOn: false,
                filterName: "",
                filterPhone: ""
            }


        case 'NEXT_PAGE':
            return {
                ...state,
                currentPage: state.currentPage + 1,
                offset: action.offset
            }

        case 'PREVIOUS_PAGE':
            return {
                ...state,
                currentPage: state.currentPage - 1,
                offset: action.offset
            }

        case 'SWITCH_PAGE':
            return {
                ...state,
                currentPage: action.switchToPage,
                offset: action.offset
            }

        case 'POST_PHONE':
            return {
                ...state,
                phones: [
                    ...state.phones, {
                        id: action.id,
                        Name: action.Name,
                        Phone: action.Phone,
                        sent: true,
                        isEdit: false
                    }
                ]

            }


        case 'POST_PHONE_SUCCESS':
            return state

        case 'POST_PHONE_FAILURE':
            return {
                ...state, phones: state.phones.map((item) => {
                    if (item.id === action.id) {
                        item.sent = false;

                    }
                    return item
                })
            }

        case 'RESEND_CHAT_SUCCESS':
            return {
                ...state,
                phones: state.phones.map(item => {
                    if (item.id === action.id) {
                        item.sent = true;
                    }
                    return item;
                })
            }

        case 'TOGLE':
            return {
                ...state,
                isActive: !state.isActive
            }

        case 'EDIT_CLICK':
            return {
                ...state,
                phones: state.phones.map(item => {
                    if (item.id === action.id) {
                        item.isEdit = true
                    }
                    return item
                })
            }

        case 'EDIT_CLICK_CANCEL':
            return {
                ...state,
                phones: state.phones.map(item => {
                    if (item.id === action.id) {
                        item.isEdit = false
                    }
                    return item
                })
            }

        case 'UPDATE_PHONE':
            return {
                ...state,
                phones: state.phones.map(item => {
                    if (item.id === action.id) {
                        item.Name = action.Name
                        item.Phone = action.Phone
                        item.isEdit = false
                    }
                    return item
                })
            }

        case 'UPDATE_PHONE_SUCCESS':
            return state

        case 'UPDATE_PHONE_FAILURE':
            return {
                ...state,
                phones: state.phones.map((item) => {
                    if (item.id === action.id) {
                        item.isEdit = false
                    }
                    return item
                })
            }

        case 'DELETE_PHONE':
            return {
                ...state,
                phones: state.phones.filter((item) =>
                    item.id !== action.id)
            }

        case 'DELETE_PHONE_SUCCESS':
            return state

        case 'LOAD_PHONE_FAILURE':
        case 'DELETE_PHONE_FAILURE':
        default:
            return state
    }
}

export default phones