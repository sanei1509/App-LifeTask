//obtenemos datos
const formularioRegistro = document.getElementById("formulario");
const inputUserName = document.getElementById("username");
const inputCorreo = document.getElementById("email");
const inputPassword1 = document.getElementById("password");
const inputPassword2 = document.getElementById("password2");

// var formulario = document.querySelector("#formpeliculas");

const cuentas = [];

formularioRegistro.addEventListener("submit", function (e) {
  e.preventDefault();
  //   var titulo = document.querySelector("#addpelicula").value;
  let username = inputUserName.value;
  let correo = inputCorreo.value;
  let contraseña = inputPassword1.value;
  let contraseña2 = inputPassword2.value;

  if(correo != "" && contraseña != "" && contraseña2 != "" && username != ""){
  
  
  if (contraseña === contraseña2) {
    //comprobamos no este registrado
    if (localStorage.getItem(correo)) {
      alert("Este correo ya esta asociado a una cuenta");
      return;
    }
    // Armamos el objeto a conveniencia
    let cuenta = {
      // nombre de user o simplemente nombre
      correo: correo,
      contraseña: String(contraseña),
      tareas: [],
      //   contraseña2: String(contraseña), /* no es necesario guardarla */
    };

    console.log(correo);
    console.log(contraseña);
    console.log(contraseña2);
    console.log(cuenta);

    localStorage.setItem(correo, JSON.stringify(cuenta));
    alert(localStorage.getItem(cuenta.correo) + "registrado correctamente");
    // redirigimos a Inicio de sesión
    window.location.pathname = "./registerNew/login2.html";
  } else {
    alert("Las claves no coinciden");
  }

}else{
  alert('debe completar todos los campos')
}

  //   let cuenta = {};

  //   if (password.length && password2 <= 4) {
  //     let cuenta = {
  //       correo: correo,
  //       password: password,
  //       password2: password2,
  //     };

  //   }

  //   if (titulo.length >= 1) {
  //     localStorage.setItem(titulo, titulo);
  //   }
});
