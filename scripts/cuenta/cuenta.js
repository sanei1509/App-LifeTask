// Validaciones de formularios

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
  password: /^.{4,12}$/, // 4 a 12 digitos.
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
};

const campos = {
  correo: false,
  password: false,
};

const validarPassword2 = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos["password"] = false;
  } else {
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos["password"] = true;
  }
};

// creamos cuentas con ejemplos de tareas por cualquier cosa que pase con localStorage

const account1 = {
  firstName: "santiago",
  email: "sadasd@gmail.com",
  password: "123456",

  tasks: {
    id: taskIndex + 1,
    shouldDisplay: true,
    title: faker.commerce.productName(),
    content: faker.commerce.productDescription(),
    completed: faker.datatype.boolean(),
    priority: priority.HIGH,
    dueDate: dueDate,
    category: "",
    location: {
      lat: -34.894671014924775,
      lng: -56.15264228201083,
    },
    files: files,
    subTasks: subTasks,
  },
};

const account2 = {
  firstName: "facundo",
  email: "sdadsadsaf@gmail.com",
  password: "1234567",

  tasks: {
    id: taskIndex + 1,
    shouldDisplay: true,
    title: faker.commerce.productName(),
    content: faker.commerce.productDescription(),
    completed: faker.datatype.boolean(),
    priority: priority.HIGH,
    dueDate: dueDate,
    category: "",
    location: {
      lat: -34.894671014924775,
      lng: -56.15264228201083,
    },
    files: files,
    subTasks: subTasks,
  },
};

// Obtencion de elementos

// const formulario = document.getElementById("formulario");
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
// Creamos un container en donde podamos ver donde añadimos elementos

var elements = [];

// Generar registro de cuentas
const addAccount = function () {
  if (document.querySelector(".addText").value.trim() != "") {
    elements.push(document.querySelector(".addTxt").value.trim());
    // sino hay datos guardados
    if (localStorage.getItem("account-users") == null) {
      localStorage.setItem("account-users", JSON.stringify(elements));
    } else {
      // pero si hay datos guardados debemos devolver "error"
      localStorage.getItem("account-users");
    }
  }
};

// LOCAL STORAGE

const cuentas = [];

/* register */
const formularioRegistro = document.getElementById("formulario");
const inputCorreo = document.getElementById("email");
const inputPassword1 = document.getElementById("password");
const inputPassword2 = document.getElementById("password2");

/* login */
const login_inputCorreo = docuemnt.getElementById("correo");
const loin_inputPassword = document.getElementById("contraseña");

/* tareas */
//principales
const titulo = document.getElementById("title-tarea");
const descripcion = document.getElementById("description-tarea");
const prioridad = document.querySelector(
  'input[name = "priority"]:checked'
).value;

//opcionales
// const ubicacion;
// const subTareas;
// const archivos;
