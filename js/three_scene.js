document.addEventListener('DOMContentLoaded', () => {
    const escena = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const container = document.getElementById('canva');

    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load('assets/img/ad.png', (texture) => {
        const materiales = [
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff }),
            new THREE.MeshBasicMaterial({ color: 0xffff00 }),
            new THREE.MeshBasicMaterial({ map: texture })
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
            const needResize = renderer.domElement.width !== width || renderer.domElement.height !== height;

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
            cubo.rotation.y = THREE.MathUtils.lerp(cubo.rotation.y, targetAngle, 0.03);
            renderer.render(escena, camera);
            requestAnimationFrame(animate);
        }

        animate();

        // Botones de rotación
        document.getElementById('rotateLeft').addEventListener('click', () => {
            stopAutoRotate();
            rotateCube(-1);
            startAutoRotate();
        });
        document.getElementById('rotateRight').addEventListener('click', () => {
            stopAutoRotate();
            rotateCube(1);
            startAutoRotate();
        });

        // Variables para el swipe
        let startX = 0;
        let endX = 0;

        container.addEventListener('touchstart', (event) => {
            stopAutoRotate();
            startX = event.touches[0].clientX;
        });

        container.addEventListener('touchmove', (event) => {
            endX = event.touches[0].clientX;
        });

        container.addEventListener('touchend', () => {
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
    });
});