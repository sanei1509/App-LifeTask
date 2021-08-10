// Variables globales
let user
let todos = []

showLoader()

// Constantes globales
const numberOfTasksToGenerate = 10
const todoViewModal = new bootstrap.Modal(document.getElementById('todo-view-modal'))
const todoCreatorModal = new bootstrap.Modal(document.getElementById('todo-creator-modal'))

// Constantes utilitarias
const priority = {
    LOW: 'LOW',
    MID: 'MID',
    HIGH: 'HIGH'
}

/**
 * Filtra las tareas mostradas en la UI basandose en las palabras clave escritas en la caja de busqueda
 */
function applySearchFilter() {
    // Obtenemos el valor de la caja de busqueda, le sacamos espacios de mas y pasamos a minusculas

    // Alternativa 1 (1 linea)
    // const keywords = document.getElementById('search-keywords').value.trim().toLowerCase()

    // Alternativa 2 (4 lineas)
    const searchInputElement = document.getElementById('search-keywords')
    let keywords = searchInputElement.value
    keywords = keywords.trim()
    keywords = keywords.toLowerCase()

    if (!keywords) {
        todos.forEach(todo => {
            todo.shouldDisplay = true
        })
    } else {
        todos.forEach(todo => {
            todo.shouldDisplay = false
        })
    
        // Filtra las tareas que hacen match ya sea con el titulo o la descripcion
        todos.filter(todo => {
            const titleMatch = todo.title.toLowerCase().includes(keywords) 
            const descriptionMatch = todo.content.toLowerCase().includes(keywords)
    
            return titleMatch || descriptionMatch
        }).forEach(todo => {
            todo.shouldDisplay = true
        })
    }

    renderToDos()
}

/**
 * Aplica filtro por tipo a las tareas
 * @param {*} filterType Valores posibles (MY_DAY, IMPORTANT, ALL)
 */
function applyTypeFilter(filterType) {
    switch (filterType) {
        case 'MY_DAY':
            // TODO: Aplicar filtro de tareas diarias
            break
        case 'IMPORTANT':
            // TODO: Aplicar filtro de tareas marcadas como importantes
            break
        case 'ALL':
            // TODO: Mostrar todas las tareas
            break
        default:
            console.error('Filtro no soportado')
            break
    }
}

// Obtiene la lista de tareas (actualmente hardcoded, posteriormente sera info desde el servidor)
function fetchToDos() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            let lastSubTaskId = 0
            let lastFileId = 0

            const dueDate = new Date()
            dueDate.setDate(dueDate.getDate() + 3)

            for (let taskIndex = 0; taskIndex < numberOfTasksToGenerate; taskIndex++) {
                const subTasks = []
                const files = []

                const numberOfSubTasks = faker.datatype.number({
                    min: 0,
                    max: 5
                })

                const numberOfFiles = faker.datatype.number({
                    min: 0,
                    max: 3
                })

                for (let subTaskIndex = 0; subTaskIndex < numberOfSubTasks; subTaskIndex++) {
                    subTasks.push({
                        id: lastSubTaskId + 1,
                        title: faker.commerce.productName(),
                        completed: faker.datatype.boolean()
                    })

                    lastSubTaskId += 1
                }

                for (let fileIndex = 0; fileIndex < numberOfFiles; fileIndex++) {
                    files.push({
                        id: lastFileId + 1,
                        url: faker.image.imageUrl()
                    })

                    lastFileId += 1
                }

                todos.push({
                    id: taskIndex + 1,
                    shouldDisplay: true,
                    title: faker.commerce.productName(),
                    content: faker.commerce.productDescription(),
                    completed: faker.datatype.boolean(),
                    priority: priority.LOW,
                    dueDate: dueDate,
                    category: '',
                    location: {
                        lat: -34.894671014924775,
                        lng: -56.15264228201083
                    },
                    files: files,
                    subTasks: subTasks
                })
            }

            resolve()
        }, 400)
    })
}

function initialLoad() {
    fetchToDos().then(() => {
        renderToDos()
    })
}

/**
 * Muestra la lista de todos en pantalla
 */
function renderToDos() {
    const todosContainer = document.getElementById('todos-container')
    const todoTemplate = document.getElementById('todo-temlpate')

    todosContainer.innerHTML = ''

    if (todos.length > 0) {
        for (let todosIndex = 0; todosIndex < todos.length; todosIndex++) {
            if (todos[todosIndex].shouldDisplay) {
                // Creamos un clon a partir del elemento template "todo-temlpate"
                const todoClone = todoTemplate.content.cloneNode(true)

                // Obtenemos los elementos
                const todoCloneCardElement = todoClone.querySelector('.card')
                const todoCloneTitleElement = todoClone.querySelector('.card-title')
                const todoCloneContentElement = todoClone.querySelector('.card-text')
                const todoCloneActionsElement = todoClone.querySelector('.card-floating-actions')
                const todoCloneChangeTodoStatusButtonElement = todoClone.querySelector('.btn-change-todo-status')
                const todoCloneViewTodoButtonElement = todoClone.querySelector('.btn-view-todo')
                const todoCloneDeleteTodoButtonElement = todoClone.querySelector('.btn-delete-todo')
                const changeStatusIconElement = todoCloneChangeTodoStatusButtonElement.querySelector('i.bi')

                // ##########################################
                // Seteo de eventos
                // ##########################################

                // Agregamos evento que muestra las acciones cuando el mouse entra a la card
                todoCloneCardElement.addEventListener('mouseenter', () => {
                    todoCloneActionsElement.classList.remove('d-none')
                })

                // Agregamos evento que oculta las acciones cuando el mouse sale de la card
                todoCloneCardElement.addEventListener('mouseleave', () => {
                    todoCloneActionsElement.classList.add('d-none')
                })

                // Agregamos evento para cambiar el estado de una tarea (completa / no completa)
                todoCloneChangeTodoStatusButtonElement.addEventListener('click', () => {
                    todos[todosIndex].completed = !todos[todosIndex].completed
                    renderToDos()
                })

                // Agregamos evento para ver todos los datos de una tarea
                todoCloneViewTodoButtonElement.addEventListener('click', () => {
                    openViewTaskModal(todos[todosIndex])
                })

                // Agregamos evento para eliminar una tarea
                todoCloneDeleteTodoButtonElement.addEventListener('click', () => {
                    todos.splice(todosIndex, 1)
                    renderToDos()
                })

                // ##########################################
                // Seteo de contenido
                // ##########################################

                // Seteamos el color del borde en base a la priodidad de la tarea
                todoCloneCardElement.classList.add(
                    getTodoBorderClass(todos[todosIndex].priority)
                )

                // Si la tarea esta completada, agregamos una clase para tachar el titulo
                if (todos[todosIndex].completed) {
                    todoCloneTitleElement.classList.add('text-decoration-line-through')
                    changeStatusIconElement.classList.add('bi-circle-fill')
                } else {
                    changeStatusIconElement.classList.add('bi-circle')
                }

                // Seteamos el titulo de la tarea en el clon
                todoCloneTitleElement.innerText = todos[todosIndex].title

                // Seteamos el contenido de la tarea en el clon
                todoCloneContentElement.innerText = todos[todosIndex].content

                // Agregamos la tarea clonada al contenedor de tareas
                todosContainer.appendChild(todoClone)
            }
        }
    } else {
        const createTodoHint = document.getElementById('create-new-todo-hint')

        createTodoHint.classList.remove('d-none')
        todosContainer.classList.add('d-none')
    }
}

/**
 * Muestra la lista de sub-tareas
 * @param {*} todo 
 * @param {*} subTaskContainerElement 
 * @param {*} subTaskTemplate 
 */
function renderSubTasks(todo, subTaskContainerElement, subTaskTemplate) {
    subTaskContainerElement.innerHTML = ''

    if (todo.subTasks.length > 0) {
        for (let subTaskIndex = 0; subTaskIndex < todo.subTasks.length; subTaskIndex++) {
            const subTaskClone = subTaskTemplate.content.cloneNode(true)

            const subTaskCheckbox = subTaskClone.querySelector('.list-group-item > div > input:first-child')
            const subTaskTitle = subTaskClone.querySelector('.list-group-item > div > input:last-child')
            const subTaskDeleteButton = subTaskClone.querySelector('.list-group-item > .btn-delete-sub-task')
    
            subTaskCheckbox.checked = todo.subTasks[subTaskIndex].completed
            subTaskTitle.value = todo.subTasks[subTaskIndex].title

            subTaskDeleteButton.addEventListener('click', (event) => {
                if (event.target.nodeName === 'BUTTON') {
                    event.target.parentElement.remove()
                } else {
                    event.target.parentElement.parentElement.remove()
                }
            })
    
            subTaskContainerElement.appendChild(subTaskClone)
        }
    }
}

/**
 * Dada la prioridad de una tarea, retorna la clase para aplicar en la card
 * @param {*} todoPriority 
 * @returns 
 */
function getTodoBorderClass(todoPriority) {
    switch (todoPriority) {
        case priority.HIGH:
            return 'border-danger'
        case priority.MID:
            return 'border-warning'
        default:
            return 'border-success'
    }
}

// Crea una tarea
function createToDo() {}

// Modifica los valores de una tarea
function editToDo() {}

// Elimina una tarea
function deleteToDo() {}

// Cambia la prioridad de una tarea
function changeToDoPriority() {}

function getFileIcon(fileUrl) {}

// Abre el modal de vista de tarea
function openViewTaskModal(todo) {
    const modalElement = document.getElementById('todo-view-modal')
    const titleElement = modalElement.querySelector('.modal-title')
    const contentElement = modalElement.querySelector('.modal-task-content')
    const editTodoButtonElement = modalElement.querySelector('.btn-edit-todo')
    const createSubTaskButtonElement = modalElement.querySelector('.btn-create-sub-task')

    const subTaskTemplate = document.getElementById('todo-sub-task-template')
    const subTaskContainerElement = modalElement.querySelector('.modal-subtask-container')

    // Seteamos titulo y contenido de la tarea
    titleElement.innerText = todo.title
    contentElement.value = todo.content

    if (todo.location) {
        placeMarker(todo.location)
    } else {
        resetMap()
    }

    // Marcamos el texto del titulo si la tarea esta completada
    if (todo.completed) {
        titleElement.classList.add('text-decoration-line-through')
    } else {
        titleElement.classList.remove('text-decoration-line-through')
    }

    // Agregamos evento click al boton guardar todo
    editTodoButtonElement.onclick = () => {
        // Actualizamos la tarea con los nuevos valores
        todo.title = titleElement.innerText
        todo.content = contentElement.value

        // TODO: Actualizar el estado de la sub-tareas

        if (marker) {
            todo.location = {
                lat: marker.position.lat(),
                lng: marker.position.lng()
            }
        }

        // Refrescamos la UI luego de guardar los nuevos valores
        renderToDos()

        // Cerramos el modal
        todoViewModal.hide()
    }

    // Agregamos evento click al boton de crear sub-tarea
    createSubTaskButtonElement.onclick = () => {
        const subTaskClone = subTaskTemplate.content.cloneNode(true)

        const subTaskDeleteButton = subTaskClone.querySelector('.list-group-item > .btn-delete-sub-task')

        subTaskDeleteButton.addEventListener('click', (event) => {
            if (event.target.nodeName === 'BUTTON') {
                event.target.parentElement.remove()
            } else {
                event.target.parentElement.parentElement.remove()
            }
        })

        subTaskContainerElement.appendChild(subTaskClone)
    }

    // ##########################################
    // Generacion dinamica de sub-tareas
    // ##########################################
    renderSubTasks(todo, subTaskContainerElement, subTaskTemplate)

    // ##########################################
    // Generacion dinamica de archivos adjuntos
    // ##########################################
    const fileTemplate = document.getElementById('todo-file-template')
    const filesContainerElement = modalElement.querySelector('.modal-files-container')

    if (todo.files.length > 0) {
        for (let fileIndex = 0; fileIndex < todo.files.length; fileIndex++) {
            const fileClone = fileTemplate.content.cloneNode(true)
    
            // TODO: setear informacion en el archivo adjunto
            // todo.files[fileIndex]
            // usar getFileIcon para obtener icono
    
            filesContainerElement.appendChild(fileClone)
        }
    }

    todoViewModal.show()
}

// Abre el modal de creacion de tarea
function openTodoCreatorModal() {
    todoCreatorModal.show()
}
