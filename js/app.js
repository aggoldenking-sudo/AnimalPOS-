/* ---------- BOTONES HEADER ---------- */
const animalitosBtn = document.getElementById("animalitosBtn");
const pollaHipicaBtn = document.getElementById("pollaHipicaBtn");

// SECCIONES
const animalitosSection = document.querySelector(".animales-section");
const pollaHipicaSection = document.querySelector(".polla-hipica-section");

// MOSTRAR SECCIONES
animalitosBtn.addEventListener("click", () => {
  animalitosSection.style.display = "block";
  pollaHipicaSection.style.display = "none";
});

pollaHipicaBtn.addEventListener("click", () => {
  animalitosSection.style.display = "none";
  pollaHipicaSection.style.display = "block";
});

/* ---------- LISTA DE ANIMALES ---------- */
const animales = [
  { numero: "00", nombre: "Ballena" },
  { numero: "0", nombre: "Delfín" },
  { numero: "01", nombre: "Carnero" },
  { numero: "02", nombre: "Toro" },
  { numero: "03", nombre: "Ciempiés" },
  { numero: "04", nombre: "Alacrán" },
  { numero: "05", nombre: "León" },
  { numero: "06", nombre: "Sapo" },
  { numero: "07", nombre: "Loro" },
  { numero: "08", nombre: "Ratón" },
  { numero: "09", nombre: "Águila" },
  { numero: "10", nombre: "Tigre" },
  { numero: "11", nombre: "Gato" },
  { numero: "12", nombre: "Caballo" },
  { numero: "13", nombre: "Mono" },
  { numero: "14", nombre: "Paloma" },
  { numero: "15", nombre: "Zorro" },
  { numero: "16", nombre: "Oso" },
  { numero: "17", nombre: "Pavo" },
  { numero: "18", nombre: "Burro" },
  { numero: "19", nombre: "Pescado" },
  { numero: "20", nombre: "Caimán" },
  { numero: "21", nombre: "Gallo" },
  { numero: "22", nombre: "Camello" },
  { numero: "23", nombre: "Cebra" },
  { numero: "24", nombre: "Iguana" },
  { numero: "25", nombre: "Gallina" },
  { numero: "26", nombre: "Vaca" },
  { numero: "27", nombre: "Perro" },
  { numero: "28", nombre: "Zamuro" },
  { numero: "29", nombre: "Elefante" },
  { numero: "30", nombre: "Caimán" },
  { numero: "31", nombre: "Lapa" },
  { numero: "32", nombre: "Ardilla" },
  { numero: "33", nombre: "Pato" },
  { numero: "34", nombre: "Venado" },
  { numero: "35", nombre: "Jirafa" },
  { numero: "36", nombre: "Culebra" }
];

/* ---------- GENERAR ANIMALES EN LA SECCIÓN ---------- */
const animalesContainer = document.querySelector(".animales-section .animales");

// Limpiar y crear divs de animales
animalesContainer.innerHTML = "";
animales.forEach(animal => {
  const div = document.createElement("div");
  div.classList.add("animal");
  div.textContent = `${animal.numero} ${animal.nombre}`;
  animalesContainer.appendChild(div);

  // Click para seleccionar
  div.addEventListener("click", () => {
    const monto = prompt(`Ingrese el monto para ${animal.nombre} (${animal.numero}):`);
    if (monto && !isNaN(monto)) {
      div.dataset.monto = monto;
      div.classList.add("active");
      agregarTicket(animal.numero, animal.nombre, monto);
    }
  });
});

/* ---------- TICKET ---------- */
const ticketContainer = document.createElement("div");
ticketContainer.classList.add("ticket");
document.body.appendChild(ticketContainer);

function agregarTicket(numero, nombre, monto) {
  const div = document.createElement("div");
  div.innerHTML = `<strong>${numero} ${nombre}</strong> - Monto: $${monto}`;
  ticketContainer.appendChild(div);
  actualizarTotal();
}

function actualizarTotal() {
  let total = 0;
  ticketContainer.querySelectorAll("div").forEach(item => {
    const texto = item.textContent;
    const match = texto.match(/\$([0-9\.]+)/);
    if (match) total += parseFloat(match[1]);
  });

  let totalDiv = ticketContainer.querySelector(".total");
  if (!totalDiv) {
    totalDiv = document.createElement("div");
    totalDiv.classList.add("total");
    ticketContainer.appendChild(totalDiv);
  }
  totalDiv.textContent = `Total: $${total}`;
}
