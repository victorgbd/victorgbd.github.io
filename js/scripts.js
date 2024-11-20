/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
// Seleccionar el elemento
const showcaseImg = document.getElementById('showC');

// Crear un observador de intersección
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Cuando el elemento entra en el viewport, agregar la clase
            entry.target.classList.add('is-visible');
            // Dejar de observar el elemento una vez que la animación se haya ejecutado
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 }); // Umbral de visibilidad (0.5 significa que el 50% del elemento debe ser visible)

// Observar el elemento
observer.observe(showcaseImg);
