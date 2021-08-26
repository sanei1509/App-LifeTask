// Obtenemos todos los inputs de los que vamos a ir extrayendo datos
const formularioTareas = document.getElementById("formulario_tareas");

const titulo = document.getElementById("title-tarea");
const descripcion = document.getElementById("description-tarea");
const prioridad = document.querySelector('input[name = "priority"]');


// traemos el user del localStorage
const usuario = JSON.parse(localStorage.getItem('user'));
console.log(usuario)

formularioTareas.addEventListener("submit", function (e) {
  e.preventDefault();
  //   var titulo = document.querySelector("#addpelicula").value;
  let titleText = titulo.value;
  let descriptionText = descripcion.value;
  let taskPriority = prioridad.value;

  //   if (contraseña === contraseña2) {
  //comprobamos no este registrado
  //   if (localStorage.getItem(correo)) {
  //     alert("Este correo ya esta asociado a una cuenta");
  //     return;
  //   }
  // Armamos el objeto a conveniencia
  let tarea = {
    id: '',
    titleText: String(titleText),
    descriptionText: String(descriptionText),
    taskPriority: taskPriority,
    completed: false// boolean falso por defecto
  };

  

 
  usuario[0].tareas.push((tarea));
  localStorage.setItem('user', JSON.stringify(usuario[0]));


  
  // actualizamos para guardar cambios en LOCALSTORAGE
  

  console.log(titleText);
  console.log(descriptionText);
  console.log(taskPriority);
  console.log(tarea);

  // Luego de haber almacenado en todos.js
  // location.reload();

  // limpiamos
  descriptionText, titleText, taskPriority = "";

  // funcion de pintar tarea según la prioridad
  function colorear() {
    if (tarea.taskPriority === "Alta") {
      console.log("cambiando clase a rojo de tarea en especifico");
    }
  }
});
