// LOGIN
const formularioLogin = document.querySelector("#formularioLogin");

const _loginCorreo = document.getElementById("correo");
const _loginPassword = document.getElementById("contraseña");



formularioLogin.addEventListener("submit", function (e) {
  e.preventDefault();

  let loginCorreo = _loginCorreo.value;
  let loginPassword = _loginPassword.value;

  let s = localStorage.getItem(loginCorreo); //traemos el objeto del correo ingresado
  let cuenta = JSON.parse(s);

  
  if(loginCorreo != "" && loginPassword != ""){
  if (cuenta.contraseña === loginPassword) {
    console.log("Iniciando sesiónn..");
    let users = [
      {
        correo: loginCorreo,
        contraseña: loginPassword,
        tareas: Array(),
      },
    ];

    let tareas = [];
    
    localStorage.setItem("user", JSON.stringify(users));
    // localStorage.setItem("userTareas", tareas);

    // Mandamos al usuario a la HOME
    window.location.pathname = "/home.html";
  } else {
    console.log("datosIncorrectos");
  }
  } else{
    alert('Completa todos los campos')
  }
  //   console.log(loginCorreo);
  //   console.log(loginPassword);
});
