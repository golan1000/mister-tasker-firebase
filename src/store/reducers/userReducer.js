
const INITIAL_STATE = {
    loggedinUser: null
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_LOGGEDIN_USER':
            return {
                ...state,
                loggedinUser: action.user
            }
        case 'ADD_MOVE':
            return {
                ...state,
                loggedinUser: {
                    ...state.loggedinUser,
                    moves: [...state.loggedinUser.moves, action.move]
                }
            }

        default:
            return state;
    }
}