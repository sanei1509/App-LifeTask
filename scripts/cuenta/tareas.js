






const todoViewModal = new bootstrap.Modal(
  document.getElementById("todo-view-modal")
);
const todosContainer = document.getElementById("todos-container");
// funciones a utilizar
const crearTarea = (title, description, priority) => {
    
  let tarea = {
      id: Number(createID()),
      title: title,
      description: description,
      priority: priority,
      completed: false,
  }

  todos.push(tarea);

  return tarea;
}

//retirar valor de radio button
function obtenerPrioridad() { 
  var i 
  for (i = 0; i < document.formTasks.priority.length; i++){ 
     if (document.formTasks.priority[i].checked) {
        return document.formTasks.priority[i].value;
  }
  
  } }

const PintarTareas = (dataUser) => {

  //traemos el container de vacío
  const vacio = document.getElementById('no-hay-tareas');
  const todoTemplate = document.getElementById("todo-temlpate");

  todosContainer.innerHTML = '';

  let userTareas = dataUser.tareas;

  
  userTareas.forEach( tarea => {
    const todoClone = todoTemplate.content.cloneNode(true);

    // Obtenemos los elementos
    const todoCloneCardElement = todoClone.querySelector(".card");
    const todoCloneTitleElement = todoClone.querySelector(".card-title");
    const todoCloneContentElement = todoClone.querySelector(".card-text");
    const todoCloneActionsElement = todoClone.querySelector(
      ".card-floating-actions"
    );
    const todoCloneChangeTodoStatusButtonElement = todoClone.querySelector(
      ".btn-change-todo-status"
    );
    const todoCloneViewTodoButtonElement =
      todoClone.querySelector(".btn-view-todo");
    const todoCloneDeleteTodoButtonElement =
      todoClone.querySelector(".btn-delete-todo");
    const changeStatusIconElement =
      todoCloneChangeTodoStatusButtonElement.querySelector("i.bi");

    // ##########################################
    // Seteo de eventos
    // ##########################################

    // Agregamos evento para ver todos los datos de una tarea
    todoCloneViewTodoButtonElement.addEventListener("click", () => {
      // dataLogin.tareas.forEach((elemento, index) => {
      //   if(tarea.id === elemento.id){
      //     console.log(elemento)
      //   }
      let tareaClicked;
      dataLogin.tareas.forEach((elemento, index) => {
        if(tarea.id === elemento.id){
          tareaClicked = elemento;
        }
      });
      console.log(tareaClicked)

      todoViewModal.show();
      openViewTaskModal(tareaClicked)
    });

    // Agregamos evento para eliminar una tarea
    todoCloneDeleteTodoButtonElement.addEventListener("click", () => {
      let indexArray;
      //console.log(`eliminando..${tarea.id}`)
      //console.log(dataLogin.tareas)
      console.log(tarea)
      dataLogin.tareas.forEach((elemento, index) => {
        if(tarea.id === elemento.id){
          indexArray = index;
          console.log(indexArray);
        }
        
      })
     console.log(dataLogin.tareas.splice(indexArray, 1));
     PintarTareas(dataLogin);
     // 'Confirmamos los cambios'
     localStorage.setItem(userMail, JSON.stringify(dataLogin))
    });

    // Agregamos evento que muestra las acciones cuando el mouse entra a la card
    // todoCloneCardElement.addEventListener("mouseenter", () => {
    //   todoCloneActionsElement.classList.remove("d-none");
    // });
    todoCloneActionsElement.classList.remove("d-none");


    //  damos el color según prioridad 
    if(tarea.priority === "Alta"){
      todoCloneCardElement.classList.add('border-3');
      todoCloneCardElement.classList.add('border-danger');
    }
    if(tarea.priority === "Media"){
      todoCloneCardElement.classList.add('border-3');
      todoCloneCardElement.classList.add('border-warning');
      
    }
    if(tarea.priority === "Baja"){
      todoCloneCardElement.classList.add('border-3');

      todoCloneCardElement.classList.add('border-none');
    }
    switch (tarea.priority) {
      case 'Alta':
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor1
        break;
      case 'Media':
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con el valor2
        break;
      case 'Baja':
        //Declaraciones ejecutadas cuando el resultado de expresión coincide con valorN
        break;
      default:
        break;
    }
        
    // Agregamos evento para cambiar el estado de una tarea (completa / no completa)
    todoCloneChangeTodoStatusButtonElement.addEventListener("click", () => {
      tarea.completed = !tarea.completed;
      //confirmamos cambios
      localStorage.setItem(userMail, JSON.stringify(dataLogin))
      PintarTareas(dataLogin);
    });

    // Si la tarea esta completada, agregamos una clase para tachar el titulo
    if (tarea.completed) {
      todoCloneTitleElement.classList.add('text-success');
      todoCloneContentElement.classList.add('text-dark-50');
      todoCloneCardElement.classList.add('.bg-dark');
      //todoCloneTitleElement.classList.add("text-decoration-line-through");
      changeStatusIconElement.classList.add("bi-x-lg");
      updateStorage();
    } else {
      changeStatusIconElement.classList.add("bi-check-lg");
    }

   // Seteamos el titulo de la tarea en el clon
   todoCloneTitleElement.innerText = tarea.title;

    // Seteamos la descripcion de la tarea en el clon
    todoCloneContentElement.innerText = tarea.description;

    // Agregamos la tarea clonada al contenedor de tareas
    todosContainer.appendChild(todoClone);  
      })

}

//function que crea id únicos

function addZero(x, n) {
  while (x.toString().length < n) {
    x = "0" + x;
  }
  return x;
}

const createID = function(){
let d = new Date();
let x = document.getElementById("demo");
let h = addZero(d.getHours(), 2);
let m = addZero(d.getMinutes(), 2);
let s = addZero(d.getSeconds(), 2);
let ms = addZero(d.getMilliseconds(), 3);
return h + m + s + ms
}





// Obtenemos todos los inputs de los que vamos a ir extrayendo datos
const formularioTareas = document.getElementById("formulario_tareas");
const titulo = document.getElementById("title-tarea");
const descripcion = document.getElementById("description-tarea");
const prioridad = document.querySelector('input[name = "priority"]');

//EventListeners

formularioTareas.addEventListener("submit", function (e) {
  e.preventDefault();
  

  let titleText = titulo.value;
  let descriptionText = descripcion.value;
  let taskPriority = obtenerPrioridad();
  

  //creamos la tarea con los valores ingresados
  let tarea = crearTarea(titleText, descriptionText, taskPriority);
  console.log(taskPriority)


  //let cuentaWtodos = userAccount[0].tareas.push(tarea);
  //actualizamos nuestra DB
  let userMail = userAccount[0].correo;
  let dataLogin = (JSON.parse(localStorage.getItem(userMail)));
  //metemos las tareas en información de sesión
  dataLogin.tareas.push(tarea);
  //actualizamos DB
  localStorage.setItem(userMail, JSON.stringify(dataLogin))
  console.log(dataLogin);

  //Pintamos las tareas que tenga el usuario
  PintarTareas(dataLogin);


  closeTodoCreatorModal();
  
  //limpiamos
  formularioTareas.reset()
  
});

let userMail = userAccount[0].correo;
let dataLogin = (JSON.parse(localStorage.getItem(userMail)));


document.addEventListener('DOMContentLoaded', PintarTareas(dataLogin));



function initialLoad() {
  PintarTareas(dataLogin);
}

function updateStorage(){
  let userMail = userAccount[0].correo;
  let dataLogin = (JSON.parse(localStorage.getItem(userMail)));
  localStorage.setItem(userMail, JSON.stringify(dataLogin))
};


//abrir el modal
function openTodoCreatorModal() {
  todoCreatorModal.show();
}
//cerrar el modal
function closeTodoCreatorModal() {
  todoCreatorModal.hide();
}

/**
 * Filtra las tareas mostradas en la UI basandose en las palabras clave escritas en la caja de busqueda
 */
 function applySearchFilter() {
   //almacenamos los valores que hicieron match
   var dataLoginResult = [];
  // Obtenemos el valor de la caja de busqueda, le sacamos espacios de mas y pasamos a minusculas

  // Alternativa 1 (1 linea)
  // const keywords = document.getElementById('search-keywords').value.trim().toLowerCase()

  // Alternativa 2 (4 lineas)
  const searchInputElement = document.getElementById("search-keywords");
  let keywords = searchInputElement.value;
  keywords = keywords.trim();
  keywords = keywords.toLowerCase();


  if (!keywords) {
    window.location.reload();
  } else {
    dataLogin.tareas.forEach((todo) => {
      console.log('BINGOU')
    });

    
    // Filtra las tareas que hacen match ya sea con el titulo o la descripcion
    dataLogin.tareas
      .filter((todo) => {
        const titleMatch = todo.title.toLowerCase().includes(keywords);
        const descriptionMatch = todo.description.toLowerCase().includes(keywords);

        return titleMatch || descriptionMatch;
      })
      .forEach((todo) => {
        console.log(todo)
        dataLoginResult.push(todo)
      });
  }

  console.log(dataLoginResult);

  var dataLoginResultConvert = {
    tareas : dataLoginResult
  } 

  console.log(dataLoginResultConvert);

  PintarTareas(dataLoginResultConvert);
}

//variables para filtro
let dataLoginNormal = [];
let dataLoginHigh = [];
let dataHighConvert = {
  tareas : dataLoginHigh
};
let dataNormalConvert = {
  tareas: dataLoginNormal
}

//Pildoras de filtro
function applyTypeFilter(filterType) {
  switch (filterType) {
    case "ALL":
      
      filtro1.classList.toggle("active");
      regularFilter(filtro2);
      regularFilter(filtro3);
      console.log('mostrando todas');
      PintarTareas(dataLogin);
      break;
    case "IMPORTANT":
      // TODO: Aplicar filtro de tareas marcadas como importantes
      filtro2.classList.toggle("active");
      regularFilter(filtro1);
      regularFilter(filtro3);

      console.log('mostrando prioridad Alta');
      dataLogin.tareas.forEach((tarea) => {
        if(tarea.priority === 'Alta')
        dataLoginHigh.push(tarea);
      })
      PintarTareas(dataHighConvert);
      break;
    case "NORMAL":
      // TODO: Aplicar filtro de tareas diarias
      filtro3.classList.toggle("active");
      regularFilter(filtro1);
      regularFilter(filtro2);

      dataLogin.tareas.forEach((tarea) => {
        if(tarea.priority === 'Baja' ||  tarea.priority === 'Media')
        dataLoginNormal.push(tarea);
      })
      PintarTareas(dataNormalConvert);
      
      break;
    default:
      console.error("Filtro no soportado");
      break;
  }
}


// Abre el modal de vista de tarea
function openViewTaskModal(todo) {
  const modalElement = document.getElementById("todo-view-modal");
  const titleElement = modalElement.querySelector(".modal-title");
  const contentElement = modalElement.querySelector(".modal-task-content");
  const editTodoButtonElement = modalElement.querySelector(".btn-edit-todo");
  const createSubTaskButtonElement = modalElement.querySelector(
    ".btn-create-sub-task"
  );

  const subTaskTemplate = document.getElementById("todo-sub-task-template");
  const subTaskContainerElement = modalElement.querySelector(
    ".modal-subtask-container"
  );

  // Seteamos titulo y contenido de la tarea
  titleElement.innerText = todo.title;
  contentElement.value = todo.description;

  // Marcamos el texto del titulo si la tarea esta completada
  if (todo.completed) {
    titleElement.classList.add('text-success');
  } else {
    titleElement.classList.remove('text-success');
  }

  // Agregamos evento click al boton guardar todo
  editTodoButtonElement.onclick = () => {
    // Actualizamos la tarea con los nuevos valores
    todo.title = titleElement.innerText;
    todo.description = contentElement.value;

    // TODO: Actualizar el estado de la sub-tareas

    // Refrescamos la UI luego de guardar los nuevos valores
    PintarTareas(dataLogin);
    localStorage.setItem(userMail, JSON.stringify(dataLogin))


    // Cerramos el modal
    todoViewModal.hide();
  }};