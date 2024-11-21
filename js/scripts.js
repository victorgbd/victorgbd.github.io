// /*!
//  * Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
//  * Copyright 2013-2023 Start Bootstrap
//  * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
//  */
// // This file is intentionally blank
// // Use this file to add JavaScript to your project

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
      { threshold: 0.5 } // El 50% del elemento debe ser visible para activarse
    );
  
    // Observar cada uno de los elementos seleccionados
    showcaseImgs.forEach((img) => {
      observer.observe(img);
    });
  }
  
  const showB = document.getElementById("showB");
  
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
      { threshold: 0.5 } // El 50% del elemento debe ser visible para activarse
    );
  
    observer.observe(showB);
  }
  