// ----------------- VARIABLES GLOBALES -----------------
let sorteoActivo = null;
let horarioActivo = null;
let selectedAnimals = new Set();
let detalles = [];
let total = 0;

// ----------------- ELEMENTOS -----------------
const sorteosDiv = document.getElementById("sorteos");
const animalesDiv = document.getElementById("animales");
const animalInput = document.getElementById("animalInput");
const montoInput = document.getElementById("montoInput");
const tabla = document.getElementById("tabla");
const totalDiv = document.getElementById("total");
const numeroTicketSpan = document.getElementById("numeroTicket");

// ----------------- INICIO -----------------
generarTicket();
cargarSorteos();
cargarAnimales();

// ----------------- TICKET -----------------
function generarTicket() {
  const n = Math.floor(100000000 + Math.random() * 900000000);
  numeroTicketSpan.textContent = `TCK# ${n}`;
}

// ----------------- SORTEOS -----------------
function cargarSorteos() {
  sorteosDiv.innerHTML = "";
  sorteos
