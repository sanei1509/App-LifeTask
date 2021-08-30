




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

    // Agregamos evento para eliminar una tarea
    todoCloneDeleteTodoButtonElement.addEventListener("click", () => {
      console.log(`eliminando..${tarea.id}`)
      console.log(userTareas)
      PintarTareas(dataLogin);
    });

    // Agregamos evento que muestra las acciones cuando el mouse entra a la card
    // todoCloneCardElement.addEventListener("mouseenter", () => {
    //   todoCloneActionsElement.classList.remove("d-none");
    // });
    todoCloneActionsElement.classList.remove("d-none");


    //  damos el color según prioridad 
    if(tarea.priority === "Alta"){
      //todoCloneCardElement.classList.add('border-danger');
    }
    if(tarea.priority === "Media"){
      //todoCloneCardElement.classList.add('border-warning');
    }
    if(tarea.priority === "Baja"){
      //todoCloneCardElement.classList.add('border-success');
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
      PintarTareas(dataLogin);
    });

    // Si la tarea esta completada, agregamos una clase para tachar el titulo
    if (tarea.completed) {
      todoCloneTitleElement.classList.add('text-success');
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
  let taskPriority = prioridad.value;
  

  //creamos la tarea con los valores ingresados
  let tarea = crearTarea(titleText, descriptionText, taskPriority);

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

