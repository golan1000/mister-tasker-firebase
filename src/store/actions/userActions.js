import userService from '../../services/userService'

export function loadUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getUser()
      dispatch({ type: 'SET_LOGGEDIN_USER', user })
    } catch (err) {
      console.log('err', err)
    }
  }
}

export function addMove(contact, amount) {
  return async (dispatch) => {
    try {
      const move = await userService.addMove(contact, amount)
      dispatch({ type: 'ADD_MOVE', move })
    } catch (err) {
      console.log('err', err)
    }
  }
}
