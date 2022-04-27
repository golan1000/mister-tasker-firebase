import { firebaseService } from './firebase.service.js'

const Tasks = [
  {
    _id: '5a5664025c3abdad6f5e098c',
    title: 'Lilly Conner',
    status: 'new',
    description: 'rrr rrr ttt yyu',
    importance: 1,
    createdAt: Date.now(),
    lastTriedAt: null,
    triesCount: null,
    doneAt: null,
    errors: []
  },
]


function sort(arr) {
  return arr.sort((a, b) => {
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return -1
    }
    if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return 1
    }

    return 0
  })
}

async function getTasks(filterBy = {}) {
  await firebaseService.initFirebase()
  const tasks = await firebaseService.getDocuments('tasks', filterBy)
  return tasks
  // console.log('filterBy=', filterBy)
  // return new Promise((resolve, reject) => {
  //   var TasksToReturn = Tasks
  //   if (filterBy && filterBy.term) {
  //     TasksToReturn = filter(filterBy.term)
  //   }
  //   resolve(sort(TasksToReturn))
  // })
}

function getTaskById(id) {
  return new Promise((resolve, reject) => {
    const Task = Tasks.find((Task) => Task._id === id)
    Task ? resolve(Task) : reject(`Task id ${id} not found!`)
  })
}

function deleteTask(id) {
  return new Promise((resolve, reject) => {
    const index = Tasks.findIndex((Task) => Task._id === id)
    if (index !== -1) {
      Tasks.splice(index, 1)
    }

    resolve(Tasks)
  })
}

function _updateTask(Task) {
  return new Promise((resolve, reject) => {
    const index = Tasks.findIndex((c) => Task._id === c._id)
    if (index !== -1) {
      Tasks[index] = Task
    }
    resolve(Task)
  })
}

function _addTask(Task) {
  return new Promise((resolve, reject) => {
    Task._id = _makeId()
    Tasks.push(Task)
    resolve(Task)
  })
}

function saveTask(Task) {
  return Task._id ? _updateTask(Task) : _addTask(Task)
}

function getEmptyTask() {
  return {
    title: '',
    status: 'new',
    description: '',
    importance: null,
    createdAt: Date.now(),
    lastTriedAt: null,
    triesCount: null,
    doneAt: null,
    errors: []
  }
}

function filter(term) {
  console.log('term from filter=', term)
  term = term.toLocaleLowerCase()
  return Tasks.filter((Task) => {
    return (
      Task.name.toLocaleLowerCase().includes(term) ||
      Task.phone.toLocaleLowerCase().includes(term) ||
      Task.email.toLocaleLowerCase().includes(term)
    )
  })
}

function _makeId(length = 10) {
  var txt = ''
  var possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
export default {
  getTasks,
  getTaskById,
  deleteTask,
  saveTask,
  getEmptyTask,
}
