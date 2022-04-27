const INITIAL_STATE = {
  tasks: null,
  filterBy: null,
}

export function taskReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_CONTACTS':
      return {
        ...state,
        tasks: action.tasks,
      }

    case 'ADD_CONTACT':
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      }

    case 'UPDATE_CONTACT':
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.task._id ? action.task : task,
        ),
      }

    case 'REMOVE_CONTACT':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== action.taskId),
      }

    case 'SET_FILTER':
      return {
        ...state,
        filterBy: { ...action.filterBy },
      }

    default:
      return state
  }
}
