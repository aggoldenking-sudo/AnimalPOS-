// BOTONES DEL HEADER
const animalitosBtn = document.getElementById("animalitosBtn");
const pollaHipicaBtn = document.getElementById("pollaHipicaBtn");

// SECCIONES
const animalitosSection = document.querySelector(".animales-section");
const pollaHipicaSection = document.querySelector(".polla-hipica-section");

// FUNCIONES PARA MOSTRAR SECCIONES
animalitosBtn.addEventListener("click", () => {
  animalitosSection.style.display = "block";
  pollaHipicaSection.style.display = "none";
});

pollaHipicaBtn.addEventListener("click", () => {
  animalitosSection.style.display = "none";
  pollaHipicaSection.style.display = "block";
});

// OPCIONAL: puedes agregar aquí tu lógica de selección de animales, montos y tickets
