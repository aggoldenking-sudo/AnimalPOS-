/* ================== VARIABLES ================== */
let sorteoActivo = null;
let horaActiva = null;
let seleccionados = [];
let total = 0;

/* ================== ELEMENTOS ================== */
const sorteosDiv = document.getElementById("sorteos");
const animalesDiv = document.getElementById("animales");
const animalInput = document.getElementById("animalInput");
const montoInput = document.getElementById("montoInput");
const tabla = document.getElementById("tabla");
const totalDiv = document.getElementById("total");
const ticketSpan = document.getElementById("numeroTicket");
const printTicket = document.getElementById("printTicket");

/* ================== INIT ================== */
generarTicket();
cargarSorteos();
cargarAnimales();

/* ================== TICKET ================== */
function generarTicket() {
  const n = Math.floor(100000000 + Math.random() * 900000000);
  ticketSpan.textContent = `TCK# ${n}`;
}

/* ================== SORTEOS ================== */
function cargarSorteos() {
  sorteosDiv.innerHTML = "";

  sorteos.forEach(s => {
    const div = document.createElement("div");
    div.className = "sorteo";

    const titulo = document.createElement("h4");
    titulo.textContent = s.nombre;
    div.appendChild(titulo);

    const horariosDiv = document.createElement("div");
    horariosDiv.className = "horarios";

    s.horarios.forEach(h => {
      const btn = document.createElement("button");
      btn.textContent = h;

      btn.onclick = () => {
        document.querySelectorAll(".horarios button")
          .forEach(b => b.classList.remove("active"));

        btn.classList.add("active");
        sorteoActivo = s.nombre;
        horaActiva = h;
      };

      horariosDiv.appendChild(btn);
    });

    div.appendChild(horariosDiv);
    sorteosDiv.appendChild(div);
  });
}

/* ================== ANIMALES ================== */
function cargarAnimales() {
  animalesDiv.innerHTML = "";

  animales.forEach(a => {
    const d = document.createElement("div");
    d.className = "animal";
    d.textContent = `${a.numero} - ${a.nombre}`;

    d.onclick = () => toggleAnimal(a, d);

    animalesDiv.appendChild(d);
  });
}

/* ================== TOGGLE ANIMAL ================== */
function toggleAnimal(animal, div) {
  const key = `${animal.numero}-${animal.nombre}`;

  if (seleccionados.includes(key)) {
    seleccionados = seleccionados.filter(x => x !== key);
    div.classList.remove("active");
  } else {
    seleccionados.push(key);
    div.classList.add("active");
  }

  animalInput.value = seleccionados.join(", ");
}

/* ================== AGREGAR ================== */
function agregar() {
  if (!sorteoActivo || !horaActiva) {
    alert("Seleccione sorteo y hora");
    return;
  }

  if (seleccionados.length === 0) {
    alert("Seleccione o escriba animales");
    return;
  }

  const monto = Number(montoInput.value);
  if (!monto || monto <= 0) {
    alert("Monto inválido");
    return;
  }

  seleccionados.forEach(a => {
    const fila = document.createElement("div");
    fila.style.display = "grid";
    fila.style.gridTemplateColumns = "2fr 2fr 1fr 1fr";

    fila.innerHTML = `
      <div>${a}</div>
      <div>${sorteoActivo}</div>
      <div>${horaActiva}</div>
      <div>${monto}</div>
    `;

    tabla.appendChild(fila);
    total += monto;
  });

  totalDiv.textContent = `TOTAL BS ${total}`;

  // Reset
  seleccionados = [];
  animalInput.value = "";
  montoInput.value = "";
  document.querySelectorAll(".animal").forEach(a => a.classList.remove("active"));
}

/* ================== INGRESO MANUAL ================== */
animalInput.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();

    const texto = animalInput.value.trim();
    if (!texto) return;

    seleccionados = texto.split(",").map(x => x.trim());
    animalInput.value = seleccionados.join(", ");
  }
});

/* ================== ENTER MONTO ================== */
montoInput.addEventListener("keydown", e => {
  if (e.key === "Enter") agregar();
});

/* ================== PROCESAR ================== */
function procesar() {
  if (total === 0) {
    alert("No hay jugadas");
    return;
  }

  generarTicket();
  imprimirTicket();

  // Limpiar
  tabla.innerHTML = `
    <div style="display:grid;grid-template-columns:2fr 2fr 1fr 1fr;font-weight:bold;">
      <div>Animal</div><div>Lotería</div><div>Hora</div><div>Monto</div>
    </div>
  `;
  total = 0;
  totalDiv.textContent = "TOTAL BS 0";
}

/* ================== IMPRIMIR ================== */
function imprimirTicket() {
  printTicket.innerHTML = `
<pre>
AG GOLDEN KING TQ1
${ticketSpan.textContent}
${new Date().toLocaleString()}
--------------------------------
${tabla.innerText}
--------------------------------
TOTAL: ${total} BS
CADUCA A LOS 3 DIAS
</pre>
`;
  window.print();
}
