
gsap.registerPlugin(ScrollTrigger);

gsap.utils.toArray(".divop").forEach((el, index) => {

  let direction = index % 2 === 0 ? -200 : 200;

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: el,
      start: "top top",
      end: "+=50%",
      scrub: true,      // anima según el scroll
      pin: true,        // 🔥 se queda pegado
      anticipatePin: 1,
      markers: true,
      duration: 5

    }
  });

  tl.from(el, {
    x: direction,
    opacity: 0,
    ease: "power2.out"
  });

});
