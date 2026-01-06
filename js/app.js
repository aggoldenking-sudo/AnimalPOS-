let sorteoActivo = "";
let horarioActivo = "";
let ticketItems = [];
const selectedAnimals = new Set();

const sDiv = document.getElementById("sorteos");
const aDiv = document.getElementById("animales");
const tabla = document.getElementById("tabla");
const totalDiv = document.getElementById("total");
const animalInput = document.getElementById("animalInput");
const montoInput = document.getElementById("montoInput");

/* ================= SORTEOS ================= */
sorteos.forEach(s => {
  const btn = document.createElement("button");
  btn.className = "sorteo-btn";
  btn.textContent = s;
  btn.onclick = () => {
    document.querySelectorAll(".sorteo-btn").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    sorteoActivo = s;
    crearHorarios();
  };
  sDiv.appendChild(btn);
});

/* ================= HORARIOS ================= */
const HORARIOS = [
  "08:00 AM","09:00 AM","10:00 AM","11:00 AM",
  "12:00 PM","01:00 PM","02:00 PM","03:00 PM",
  "04:00 PM","05:00 PM","06:00 PM","07:00 PM"
];

function crearHorarios() {
  let hDiv = document.getElementById("horariosDiv");
  if (!hDiv) {
    hDiv = document.createElement("div");
    hDiv.id = "horariosDiv";
    hDiv.className = "horarios";
    sDiv.appendChild(hDiv);
  }
  hDiv.innerHTML = "";

  HORARIOS.forEach(h => {
    const b = document.createElement("button");
    b.textContent = h;
    b.onclick = () => {
      horarioActivo = h;
      hDiv.querySelectorAll("button").forEach(x => x.classList.remove("active"));
      b.classList.add("active");
    };
    hDiv.appendChild(b);
  });
}

/* ================= ANIMALES ================= */
animales.forEach(a => {
  const div = document.createElement("div");
  div.className = "animal";
  div.textContent = a;
  div.onclick = () => {
    if (div.classList.contains("active")) {
      div.classList.remove("active");
      selectedAnimals.delete(a);
    } else {
      div.classList.add("active");
      selectedAnimals.add(a);
    }
    animalInput.value = [...selectedAnimals].join(", ");
  };
  aDiv.appendChild(div);
});

/* ================= AGREGAR ================= */
function agregar() {
  if (!sorteoActivo || !horarioActivo || selectedAnimals.size === 0 || !montoInput.value) {
    alert("Complete todos los datos");
    return;
  }

  ticketItems.push({
    sorteo: sorteoActivo,
    hora: horarioActivo,
    animales: [...selectedAnimals],
    monto: Number(montoInput.value)
  });

  selectedAnimals.clear();
  animalInput.value = "";
  montoInput.value = "";

  document.querySelectorAll(".animal").forEach(a => a.classList.remove("active"));
  actualizarTabla();
}

/* ================= TABLA ================= */
function actualizarTabla() {
  tabla.innerHTML = `
    <div style="display:grid;grid-template-columns:2fr 2fr 1fr 1fr;font-weight:bold;">
      <div>Animal</div><div>Lotería</div><div>Hora</div><div>Monto</div>
    </div>`;
  let total = 0;

  ticketItems.forEach(item => {
    item.animales.forEach(animal => {
      const row = document.createElement("div");
      row.style.display = "grid";
      row.style.gridTemplateColumns = "2fr 2fr 1fr 1fr";
      row.innerHTML = `
        <div>${animal}</div>
        <div>${item.sorteo}</div>
        <div>${item.hora}</div>
        <div>${item.monto}</div>`;
      tabla.appendChild(row);
      total += item.monto;
    });
  });

  totalDiv.textContent = "TOTAL BS " + total;
}

/* ================= PROCESAR ================= */
function procesar() {
  if (ticketItems.length === 0) {
    alert("No hay jugadas");
    return;
  }

  const ticket = Math.floor(100000000 + Math.random() * 900000000);
  document.getElementById("numeroTicket").textContent = "TCK# " + ticket;

  window.print();

  ticketItems = [];
  actualizarTabla();
}
