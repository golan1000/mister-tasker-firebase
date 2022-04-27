const INITIAL_STATE = {
  tasks: [],
  filterBy: {},
}

export function taskReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'SET_TASKS':
      return {
        ...state,
        tasks: action.tasks,
      }

    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.task],
      }

    case 'UPDATE_TASK':
      console.log('state=', state)
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.task.id ? action.task : task,
        ),
      }

    case 'REMOVE_TASK':
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
