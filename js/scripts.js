// Seleccionar los tres elementos por ID
const showcaseImgs = [
  document.getElementById("showA"),
  document.getElementById("showC"),
];

// Verificar si los elementos existen
if (showcaseImgs.every((img) => img !== null)) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Cuando el elemento entra en el viewport, se le añade la clase "entrar-salir"
          entry.target.classList.add("entrar-salir");

          // Detener la observación del elemento después de que haya entrado
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 } // El 50% del elemento debe ser visible para activarse
  );

  // Observar cada uno de los elementos seleccionados
  showcaseImgs.forEach((img) => {
    observer.observe(img);
  });
}

const showB = document.getElementById("showBAnimated");

if (showB !== null) {
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Cuando el elemento entra en el viewport, se le añade la clase "entrar-salir"
          entry.target.classList.add("entrar-salir2");

          // Detener la observación del elemento después de que haya entrado
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 } // El 50% del elemento debe ser visible para activarse
  );

  observer.observe(showB);
}
