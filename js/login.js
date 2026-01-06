const USUARIO = "golden";
const CLAVE = "1234";

function login() {
  const usuario = document.getElementById("usuarioInput").value.trim();
  const clave = document.getElementById("claveInput").value.trim();
  if (usuario !== USUARIO || clave !== CLAVE) return alert("Usuario o clave incorrecta");

  document.getElementById("loginScreen").style.display = "none";
  document.getElementById("mainScreen").style.display = "block";
  document.getElementById("userTicket").innerText = usuario;
  document.getElementById("userLabel").innerText = "Usuario: " + usuario;
}

function salir() {
  document.getElementById("mainScreen").style.display = "none";
  document.getElementById("loginScreen").style.display = "block";
  document.getElementById("usuarioInput").value = "";
  document.getElementById("claveInput").value = "";
}
