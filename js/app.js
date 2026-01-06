// ANIMALES
const selectedAnimals = new Set();

animales.forEach(a => {
  let div = document.createElement("div");
  div.className = "animal";
  div.textContent = a;
  div.onclick = () => {
    if(div.classList.contains("active")) {
      div.classList.remove("active");
      selectedAnimals.delete(a);
    } else {
      div.classList.add("active");
      selectedAnimals.add(a);
    }
    document.getElementById("animalInput").value = Array.from(selectedAnimals).join(", ");
  };
  aDiv.appendChild(div);
});
