const escena = new THREE.Scene();
let light1 = new THREE.AmbientLight(0xffffff, 0.5);
escena.add(light1);
const light2 = new THREE.AmbientLight(0xd4d4d4);
escena.add(light2);
const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
const container = document.getElementById("canva");
container.style.display = "none";

renderer.setClearColor(0xffffff);

const loader = document.getElementById("loader"); // Elemento de carga

container.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();

// Función para cargar una textura de manera asíncrona
const loadTexture = (url) => {
  return new Promise((resolve, reject) => {
    textureLoader.load(url, resolve, undefined, reject);
  });
};

// Cargar todas las texturas de forma sincronizada
Promise.all([
  loadTexture("assets/img/ad.png"),
  loadTexture("assets/img/ad2.jpg"),
  loadTexture("assets/img/ad3.jpg"),
  loadTexture("assets/img/ad4.jpg"),
])
  .then(async ([texture1, texture2, texture3, texture4]) => {
    // Verificar si alguna de las texturas es undefined
    if (
      ![texture1, texture2, texture3, texture4].every(
        (texture) => texture !== undefined
      )
    ) {
      console.error("Error: Una o más texturas no se cargaron correctamente.");
      loader.innerText = "Error al cargar las texturas.";
      return;
    }
    // Una vez que todas las texturas estén cargadas, crea los materiales
    const materiales = [
      new THREE.MeshBasicMaterial({ map: texture1 }), // Cara 1
      new THREE.MeshBasicMaterial({ map: texture2 }), // Cara 2
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Cara 3 (Textura 1)
      new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Cara 4 (Textura 2)
      new THREE.MeshBasicMaterial({ map: texture3 }), // Cara 5 (Textura 3)
      new THREE.MeshBasicMaterial({ map: texture4 }), // Cara 6 (Textura 4)
    ];

    const cubo = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), materiales); // Cubo inicial de 1x1x1
    escena.add(cubo);

    camera.position.z = 5;

    let targetAngle = 0;
    const stepAngle = Math.PI / 2; // 90 grados

    function rotateCube(direction) {
      targetAngle += direction * stepAngle;
      targetAngle = Math.round(targetAngle / stepAngle) * stepAngle; // Asegura múltiplos de 90 grados
    }

    function resizeRendererToDisplaySize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      const needResize =
        renderer.domElement.width !== width ||
        renderer.domElement.height !== height;

      if (needResize) {
        renderer.setSize(width, height);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();

        // Escalar el cubo según el tamaño del contenedor
        const scaleFactor = Math.min(width, height) / 150; // Ajusta 200 según el tamaño deseado
        cubo.scale.set(scaleFactor, scaleFactor, scaleFactor);
      }
    }

    function animate() {
      resizeRendererToDisplaySize(); // Verifica el tamaño del renderizador en cada fotograma
      cubo.rotation.y = THREE.MathUtils.lerp(
        cubo.rotation.y,
        targetAngle,
        0.03
      );
      renderer.render(escena, camera);
      requestAnimationFrame(animate);
    }

    // Botones de rotación
    document.getElementById("rotateLeft").addEventListener("click", () => {
      stopAutoRotate();
      rotateCube(-1);
      startAutoRotate();
    });
    document.getElementById("rotateRight").addEventListener("click", () => {
      stopAutoRotate();
      rotateCube(1);
      startAutoRotate();
    });

    // Variables para el swipe
    let startX = 0;
    let endX = 0;

    container.addEventListener("touchstart", (event) => {
      stopAutoRotate();
      startX = event.touches[0].clientX;
    });

    container.addEventListener("touchmove", (event) => {
      endX = event.touches[0].clientX;
    });

    container.addEventListener("touchend", () => {
      const deltaX = endX - startX;
      if (deltaX > 50) {
        rotateCube(1); // Swipe a la derecha
      } else if (deltaX < -50) {
        rotateCube(-1); // Swipe a la izquierda
      }
      startAutoRotate();
    });

    // Configurar rotación automática cada 1 segundo
    function startAutoRotate() {
      autoRotateInterval = setInterval(() => {
        rotateCube(1); // Gira 90 grados en el eje y
      }, 3000);
    }

    function stopAutoRotate() {
      clearInterval(autoRotateInterval);
    }

    startAutoRotate(); // Iniciar rotación automática al cargar

    // Detectar cuando la pestaña está visible o no
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopAutoRotate(); // Detener rotación automática cuando la pestaña no es visible
      } else {
        startAutoRotate(); // Reanudar rotación automática cuando la pestaña se vuelve visible
      }
    });

    console.log("Inicio");

    await sleep(2000); // Pausa de 2 segundos

    console.log("Después de 2 segundos");
    // Ocultar el loader y mostrar la escena
    loader.style.display = "none";
    container.style.display = "block";
    animate();
  })
  .catch((error) => {
    console.error("Error al cargar las texturas:", error);
    loader.innerText = "Error al cargar las texturas.";
  });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
