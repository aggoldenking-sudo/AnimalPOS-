<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Animal POS - Golden King</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <!-- ---------- LOGIN ---------- -->
  <div class="login-card" id="loginScreen">
    <h2>Iniciar Sesión</h2>
    <input type="text" id="usuarioInput" placeholder="Usuario">
    <input type="password" id="claveInput" placeholder="Clave">
    <button onclick="login()">Ingresar</button>
  </div>

  <!-- ---------- HEADER ---------- -->
  <div class="header" id="mainScreen" style="display:none;">
    <h1>Golden King</h1>
    <div class="header-buttons">
      <button id="animalitosTab" class="active">Animalitos</button>
      <button id="pollaHipicaTab">Polla Hípica</button>
      <button onclick="salir()" style="background:#ef4444;">Salir</button>
    </div>
  </div>

  <!-- ---------- MAIN ---------- -->
  <div class="main" id="mainContent" style="display:none;">

    <!-- ---------- SECCIÓN ANIMALITOS ---------- -->
    <div class="animales-section">
      <div class="animales">
        <!-- Los animales se generan dinámicamente desde app.js -->
      </div>
    </div>

    <!-- ---------- SECCIÓN POLLA HÍPICA ---------- -->
    <div class="polla-hipica-section" style="display:none;">
      <p>Polla Hípica</p>
    </div>

    <!-- ---------- TICKET ---------- -->
    <div class="card ticket">
      <h3>Ticket</h3>
      <div class="table"></div>
      <div class="total">Total: 0</div>
      <button id="processTicket">Procesar e Imprimir</button>
    </div>

  </div>

  <!-- ---------- JS ---------- -->
  <script src="app.js"></script>
  <script>
    // ---------- LOGIN ESTÁTICO ----------
    const USUARIO = "golden";
    const CLAVE = "1234";

    function login() {
      const usuario = document.getElementById("usuarioInput").value.trim();
      const clave = document.getElementById("claveInput").value.trim();
      if (usuario !== USUARIO || clave !== CLAVE) {
        return alert("Usuario o clave incorrecta");
      }

      document.getElementById("loginScreen").style.display = "none";
      document.getElementById("mainScreen").style.display = "flex";
      document.getElementById("mainContent").style.display = "grid";
    }

    function salir() {
      document.getElementById("mainScreen").style.display = "none";
      document.getElementById("mainContent").style.display = "none";
      document.getElementById("loginScreen").style.display = "block";
      document.getElementById("usuarioInput").value = "";
      document.getElementById("claveInput").value = "";
    }

    // Permitir login con Enter
    const usuarioInput = document.getElementById("usuarioInput");
    const claveInput = document.getElementById("claveInput");

    usuarioInput.addEventListener("keyup", e => { if(e.key==="Enter") login(); });
    claveInput.addEventListener("keyup", e => { if(e.key==="Enter") login(); });

    // ---------- SWITCH SECCIONES ----------
    const animalitosTab = document.getElementById("animalitosTab");
    const pollaHipicaTab = document.getElementById("pollaHipicaTab");
    const animalesSection = document.querySelector(".animales-section");
    const pollaHipicaSection = document.querySelector(".polla-hipica-section");

    animalitosTab.addEventListener("click", () => {
      animalesSection.style.display = "block";
      pollaHipicaSection.style.display = "none";
      animalitosTab.classList.add("active");
      pollaHipicaTab.classList.remove("active");
    });

    pollaHipicaTab.addEventListener("click", () => {
      animalesSection.style.display = "none";
      pollaHipicaSection.style.display = "block";
      animalitosTab.classList.remove("active");
      pollaHipicaTab.classList.add("active");
    });
  </script>
</body>
</html>
