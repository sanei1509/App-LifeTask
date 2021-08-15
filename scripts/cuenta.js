// Obtencion de elementos

const formulario = document.getElementById("formulario");
const listaTarea = document.getElementById("lista-tareas");
const template = document.getElementById("template").content; // Accedemos al contenido del template
const fragment = document.createDocumentFragment(); // Crea un nuevo DocumentFragment vacio, dentro del cual un nodo del DOM puede ser adicionado para construir un nuevo arbol DOM fuera de pantalla.

let tareas = {
  martin: {
    email: "martin15@gmail.com",
    password: 2222,
  },
  santiago: {
    email: "santii@gmail.com",
    password: 2222,
  },
  facundo: {
    email: "facundo@gmail.com",
    password: 1111,
  },
};

const setUser = (e) => {
  if (input.value.trim() === "") {
    // Validamos el valor de los campos de registro completados
    console.log("Escribe algo para agregar una tarea");
    return;
  }

  // Crea la tarea
  const tarea = {
    id: Date.now(), // El id se crea desde el caracter numerico generado en base a la fecha actual
    texto: input.value, // El texto viene del valor del input que el usuario lleno
    estado: false,
  };
  tareas[tarea.id] = tarea; // Empujamos la tarea en el array tareas indicando su indice

  formulario.reset(); // Cuando el usuario escribe algo y da click en "agregar", se reinicia el formulario
  input.focus(); // Luego de agregar la tarea, el foco vuelve al input

  pintarTareas();
};

// en base a tutorial en youtube sobre localStorage use
