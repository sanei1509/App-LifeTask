// LOGIN
const formularioLogin = document.querySelector("#formularioLogin");

const _loginCorreo = document.getElementById("correo");
const _loginPassword = document.getElementById("contraseña");

formularioLogin.addEventListener("submit", function (e) {
  e.preventDefault();
  let loginCorreo = _loginCorreo.value;
  let loginPassword = _loginPassword.value;

  let s = localStorage.getItem(loginCorreo);
  let cuenta = JSON.parse(s);

  if (cuenta.contraseña === loginPassword) {
    console.log("Iniciando sesiónn..");
    // Mandamos al usuario a la HOME
    window.location.pathname = "/home.html";
  } else {
    console.log("datosIncorrectos");
  }

  //   console.log(loginCorreo);
  //   console.log(loginPassword);
});
