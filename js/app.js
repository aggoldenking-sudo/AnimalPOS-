let sorteoActivo = [];
let ticketItems = [];
let total = 0;
let ticketNumero = 0;

function generarTicket(){
  ticketNumero = Math.floor(100000000 + Math.random() * 900000000);
  document.getElementById("numeroTicket").innerText = "TCK# " + ticketNumero;
}

// Render sorteos
function renderSorteos(){
  const sDiv = document.getElementById("sorteos");
  sorteos.forEach(s => {
    const d = document.createElement("div");
    d.className = "sorteo";
    d.innerHTML = `<h4>${s.nombre}</h4>`;
    const h = document.createElement("div");
    h.className = "horarios";
    s.horarios.forEach(hr => {
      const b = document.createElement("button");
      b.textContent = hr;
      b.onclick = () => {
        const existe = sorteoActivo.find(x => x.nombre === s.nombre && x.horario === hr);
        if (existe) {
          sorteoActivo = sorteoActivo.filter(x => !(x.nombre === s.nombre && x.horario === hr));
          b.classList.remove("active");
        } else {
          sorteoActivo.push({nombre:s.nombre, horario:hr});
          b.classList.add("active");
        }
      };
      h.appendChild(b);
    });
    d.appendChild(h);
    sDiv.appendChild(d);
  });
}

// Render animales
function renderAnimales(){
  const aDiv = document.getElementById("animales");
  animales.forEach(a => {
    const d = document.createElement("div");
    d.className = "animal";
    d.textContent = a;
    d.onclick = () => {
      d.classList.toggle("active");
      actualizarAnimalesSeleccionados();
    };
    aDiv.appendChild(d);
  });
}

function actualizarAnimalesSeleccionados(){
  const seleccionados = [];
  document.querySelectorAll(".animal.active").forEach(a => seleccionados.push(a.textContent));
  document.getElementById("animalInput").value = seleccionados.join(", ");
  document.getElementById("montoInput").focus();
}

document.getElementById("montoInput").addEventListener("keydown", e => {
  if(e.key==="Enter"){ e.preventDefault(); agregar(); }
});

function agregar(){
  if(sorteoActivo.length===0) return alert("Seleccione al menos un sorteo y horario");
  const animalesInput = document.getElementById("animalInput").value.split(",").map(a=>a.trim()).filter(a=>a);
  const monto = Number(document.getElementById("montoInput").value);
  if(!animalesInput.length || !monto) return;

  animalesInput.forEach(animal=>{
    sorteoActivo.forEach(s=>{
      ticketItems.push({animal, monto, sorteo: s.nombre, horario: s.horario});
      const fila = document.createElement("div");
      fila.style.display="grid";
      fila.style.gridTemplateColumns="2fr 2fr 1fr 1fr";
      fila.style.padding="4px 0";
      fila.style.borderBottom="1px dashed #ccc";
      fila.innerHTML=`<div>${animal}</div><div>${s.nombre}</div><div>${s.horario}</div><div>${monto}</div>`;
      document.getElementById("tabla").appendChild(fila);
      total += monto;
    });
  });

  document.getElementById("total").innerText = "TOTAL BS " + total;
  document.getElementById("animalInput").value="";
  document.getElementById("montoInput").value="";
  document.querySelectorAll(".animal").forEach(a=>a.classList.remove("active"));
}

function procesar(){
  if(ticketItems.length===0) return alert("Ticket vacío");

  let txt = `AG ${document.getElementById("userTicket").innerText} TQ1\n`;
  txt += `TCK# ${ticketNumero} SER# ${Math.floor(10000000 + Math.random()*90000000)}\n`;
  txt += new Date().toLocaleString()+"\n--------------------------------\n";

  let grupos = {};
  ticketItems.forEach(it=>{
    const key = it.sorteo+" "+it.horario;
    if(!grupos[key]) grupos[key]=[];
    grupos[key].push(it);
  });

  for(let key in grupos){
    txt += key + "\n";
    grupos[key].forEach((it,i)=>{
      let a = animalesMap.find(x => it.animal.includes(x.nombre));
      txt += a ? `${a.num}-${a.nombre}x${it.monto} ` : `${it.animal}x${it.monto} `;
      if((i+1)%3===0) txt+="\n";
    });
    txt+="\n";
  }

  txt += "--------------------------------\n";
  txt += `MON: ${total},00 (BS) JUG: ${ticketItems.length}\nCADUCA A LOS 3 DIAS\n.`;

  const p = document.getElementById("printTicket");
  p.innerHTML = `<pre>${txt}</pre>`;
  p.style.display="block";
  window.print();

  // limpiar
  document.getElementById("tabla").innerHTML = `<div style="display:grid;grid-template-columns:2fr 2fr 1fr 1fr;font-weight:bold;"><div>Animal</div><div>Lotería</div><div>Hora</div><div>Monto</div></div>`;
  total=0;
  ticketItems=[];
  document.getElementById("total").innerText="TOTAL BS 0";
  document.getElementById("animalInput").value="";
  document.getElementById("montoInput").value="";
  document.querySelectorAll(".animal").forEach(a=>a.classList.remove("active"));
  document.querySelectorAll(".horarios button").forEach(b=>b.classList.remove("active"));
  sorteoActivo=[];
  generarTicket();
}

generarTicket();
renderSorteos();
renderAnimales();
