/* ==========================
   VARIABLES GLOBALES
========================== */

let sorteoActivo = "";
let horaActiva = "";
let selectedAnimals = new Set();
let ticket = [];
let total = 0;

/* ==========================
   ELEMENTOS DOM
========================== */

const animalesDiv = document.getElementById("animales");
const sorteosDiv = document.getElementById("sorteos");
const animalInput = document.getElementById("animalInput");
const montoInput = document.getElementById("montoInput");
const tabla = document.getElementById("tabla");
const totalDiv = document.getElementById("total");

/* ==========================
   CARGA INICIAL
========================== */

cargarSorteos();
cargarAnimales();

/* ==========================
   SORTEOS Y HORARIOS
========================== */

function cargarSorteos() {
  sorteosDiv.innerHTML = "";

  sorteos.forEach(s => {
    const bloque = document.createElement("div");
    bloque.className = "sorteo";

    const titulo = document.createElement("h4");
    titulo.textContent = s.nombre;
    bloque.appendChild(titulo);

    const horariosDiv = document.createElement("div");
    horariosDiv.className = "horarios";

    s.horarios.forEach(h => {
      const btn = document.createElement("button");
      btn.textContent = h;
      btn.onclick = () => {
        document.querySelectorAll(".horarios button").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        sorteoActivo = s.nombre;
        horaActiva = h;
      };
      horariosDiv.appendChild(btn);
    });

    bloque.appendChild(horariosDiv);
    sorteosDiv.appendChild(bloque);
  });
}

/* ==========================
   ANIMALES
========================== */

function cargarAnimales() {
  animalesDiv.innerHTML = "";

  animales.forEach(a => {
    const div = document.createElement("div");
    div.className = "animal";
    div.textContent = `${a.numero} ${a.nombre}`;

    div.onclick = () => {
      if (selectedAnimals.has(div.textContent)) {
        selectedAnimals.delete(div.textContent);
        div.classList.remove("active");
      } else {
        selectedAnimals.add(div.textContent);
        div.classList.add("active");
      }
      actualizarInputAnimales();
    };

    animalesDiv.appendChild(div);
  });
}

/* ==========================
   INPUT MANUAL
========================== */

animalInput.addEventListener("input", () => {
  selectedAnimals.clear();
  document.querySelectorAll(".animal").forEach(a => a.classList.remove("active"));

  animalInput.value.split(",").map(v => v.trim()).forEach(v => {
    const match = [...document.querySelectorAll(".animal")]
      .find(a => a.textContent.startsWith(v.padStart(2,"0")));
    if (match) {
      match.classList.add("active");
      selectedAnimals.add(match.textContent);
    }
  });
});

/* ==========================
   AGREGAR AL TICKET
========================== */

function agregar() {
  if (!sorteoActivo || !horaActiva || selectedAnimals.size === 0 || !montoInput.value) {
    alert("Seleccione sorteo, hora, animales y monto");
    return;
  }

  selectedAnimals.forEach(a => {
    ticket.push({
      animal: a,
      sorteo: sorteoActivo,
      hora: horaActiva,
      monto: parseFloat(montoInput.value)
    });
  });

  total += selectedAnimals.size * parseFloat(montoInput.value);
  renderTicket();

  selectedAnimals.clear();
  document.querySelectorAll(".animal").forEach(a => a.classList.remove("active"));
  animalInput.value = "";
  montoInput.value = "";
}

/* ==========================
   TICKET
========================== */

function renderTicket() {
  tabla.innerHTML = `
    <div style="display:grid;grid-template-columns:2fr 2fr 1fr 1fr;font-weight:bold;">
      <div>Animal</div><div>Lotería</div><div>Hora</div><div>Monto</div>
    </div>
  `;

  ticket.forEach(t => {
    const row = document.createElement("div");
    row.innerHTML = `
      <div>${t.animal}</div>
      <div>${t.sorteo}</div>
      <div>${t.hora}</div>
      <div>${t.monto.toFixed(2)}</div>
    `;
    tabla.appendChild(row);
  });

  totalDiv.textContent = `TOTAL BS ${total.toFixed(2)}`;
}

/* ==========================
   IMPRIMIR
========================== */

function procesar() {
  if (ticket.length === 0) {
    alert("No hay jugadas");
    return;
  }

  let html = `<h3>GOLDEN KING</h3><hr>`;

  ticket.forEach(t => {
    html += `<div>${t.animal} | ${t.sorteo} ${t.hora} | Bs ${t.monto.toFixed(2)}</div>`;
  });

  html += `<hr><b>TOTAL: Bs ${total.toFixed(2)}</b>`;

  const printDiv = document.getElementById("printTicket");
  printDiv.innerHTML = html;
  printDiv.style.display = "block";

  window.print();
  location.reload();
}

/* ==========================
   UTILIDAD
========================== */

function actualizarInputAnimales() {
  animalInput.value = [...selectedAnimals]
    .map(a => a.split(" ")[0])
    .join(",");
}
