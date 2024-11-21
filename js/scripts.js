/*!
* Start Bootstrap - Landing Page v6.0.6 (https://startbootstrap.com/theme/landing-page)
* Copyright 2013-2023 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-landing-page/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project
const showcaseImgs = document.querySelectorAll('.showcase-img');

if (showcaseImgs.length > 0) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            console.log(entry.isIntersecting);  // Verifica si está entrando en el viewport
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Deja de observar una vez que es visible
            }
        });
    }, { threshold: 0.1 });  // Umbral para la visibilidad, 10% del elemento visible

    showcaseImgs.forEach(img => {
        observer.observe(img);
    });
}
