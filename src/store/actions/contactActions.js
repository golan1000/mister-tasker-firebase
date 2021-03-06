import contactService from "../../services/contactService"

export function loadContacts() {
    return async (dispatch, getState) => {
        try {
            const { filterBy } = getState().contactModule
            const contacts = await contactService.getContacts(filterBy)
            dispatch({ type: 'SET_CONTACTS', contacts })
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function saveContact(contactToSave) {
    return async (dispatch) => {
        try {
            const contact = await contactService.saveContact()
            if (contactToSave._id) dispatch({ type: 'UPDATE_CONTACT', contact })
            else dispatch({ type: 'ADD_CONTACT', contact })
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function removeContact(contactId) {
    return async (dispatch) => {
        try {
            await contactService.deleteContact(contactId)
            dispatch({ type: 'REMOVE_CONTACT', contactId })
        } catch (err) {
            console.log('err', err)
        }
    }
}

export function setFilter(filterBy) {
    return async (dispatch) => {
        dispatch({ type: 'SET_FILTER', filterBy })
    }
}
