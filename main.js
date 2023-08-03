const addForm = document.querySelector(".add-form")
const taskInput = document.querySelector(".input-text")
const tasksContainer = document.querySelector(".tasks-list")
const deleteAllbtn = document.querySelector(".deleteAll-btn")


// definir lista de tareas 
let taskList = JSON.parse(localStorage.getItem("tasks")) || []

// funcion que guarda en el localstorage el array de tareas

const saveLocalstorage = () => {
    localStorage.setItem("tasks", JSON.stringify(taskList))
}

// funcion que crea el html de una tarea 
const createTask = (task) => {
    const { name, id } = task
    return `<li>${name}<img class="delete-btn" src="./img/delete.svg" alt="boton de borrar" data-id="${id}"></li>`
}


// funcion que renderiza la lista de tareas 
const renderTasklist = () => {
    tasksContainer.innerHTML = taskList.map((task) => createTask(task)).join("")

}




// funcion que oculta o muestra el boton de borrar tareas

const toggleDeleteAllButton = () => {
    if (!taskList.length) {
        deleteAllbtn.classList.add("hidden")
        return;
    }
    deleteAllbtn.classList.remove("hidden")
}

// funcion que convierte el valor del taskInput en un string sin espacios al principio y al final.
// sacarle multiespacios

const correctInputValue = () => {
    return taskInput.value.trim().replace(/\s+/g, " ")
}

// funcion que verifica si la tarea ingresada es valida (no esta vacia y no esta repetida)

const isValidTask = (taskName) => {
    let isValid = true;
    if (!taskName.length) {
        alert("por favor,ingrese una tarea")
        isValid = false
    }
    else if (
        taskList.some((task) => task.name.toLowerCase() === taskName.toLowerCase()
        )) {
        alert("Ya existe una tarea con ese nombre")
        isValid = false

    }
    return isValid
}


// funcion que agrega una tarea al array de tareas
const addTask = (e) => {
    e.preventDefault()
    const taskName = correctInputValue()
    if (isValidTask(taskName)) {
        taskList = [...taskList, { name: taskName, id: Date.now() }]
        addForm.reset()
        renderTasklist()
        saveLocalstorage()
        toggleDeleteAllButton()
    }
}


// funcion para remvover una tarea del array de tareas
const removeTask = (e) => {
    if (!e.target.classList.contains("delete-btn")) return
    const filterId = Number(e.target.dataset.id)
    taskList = taskList.filter((task) => task.id !== filterId)
    renderTasklist()
    saveLocalstorage()
    toggleDeleteAllButton()
}

// funcion que borra todas las tareas del array de tareas
const removeAll = () => {
    taskList = []
    renderTasklist()
    saveLocalstorage()
    toggleDeleteAllButton()
}


// funcion inicializadora  de la app 

const init = () => {
    document.addEventListener("DOMContentLoaded", renderTasklist)
    addForm.addEventListener("submit", addTask)
    tasksContainer.addEventListener("click", removeTask)
    deleteAllbtn.addEventListener("click", removeAll)
    document.addEventListener("DOMContentLoaded", toggleDeleteAllButton)

}
init()