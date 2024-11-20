/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
// Seleccionar el elemento
document.addEventListener("DOMContentLoaded", function() {
    // Intenta obtener el elemento
    const showcaseImg = document.getElementById('showC');
    
    // Verifica si el elemento realmente existe
    if (showcaseImg) {
        // Crear un observador de intersección
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Cuando el elemento entra en el viewport, agrega la clase 'is-visible'
                    entry.target.classList.add('is-visible');
                    
                    // Deja de observar una vez que la animación ha sido activada
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.5  // 50% del elemento debe ser visible para activar la animación
        });

        // Iniciar la observación
        observer.observe(showcaseImg);
    } else {
        console.error("El elemento con el ID 'showC' no se encuentra en el DOM.");
    }
});
