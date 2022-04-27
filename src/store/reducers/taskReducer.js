const INITIAL_STATE = {
  tasks: null,
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
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task._id === action.task._id ? action.task : task,
        ),
      }

    case 'REMOVE_TASK':
      console.log('action.taskId', action.taskId)
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.taskId),
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
