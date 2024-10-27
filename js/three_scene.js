
document.addEventListener('DOMContentLoaded', () => {
    const escena = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    const container = document.getElementById('canva');

    // Establece el tamaño inicial del renderizador
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);
    // document.body.appendChild(renderer.domElement);

    const textureLoader = new THREE.TextureLoader();

    textureLoader.load('assets/img/images.jpg', (texture) => {
        const materiales = [
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
            new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
            new THREE.MeshBasicMaterial({ color: 0xff0000 }),
            new THREE.MeshBasicMaterial({ color: 0x0000ff }),
            new THREE.MeshBasicMaterial({ color: 0xffff00 }),
            new THREE.MeshBasicMaterial({ map: texture })
        ];

        const geometry = new THREE.BoxGeometry(2, 4, 2); // Cambiar altura
        const cubo = new THREE.Mesh(geometry, materiales);
        escena.add(cubo);

        camera.position.z = 5;

        let targetAngle = 0;
        const stepAngle = Math.PI / 2; // 90 grados para girar de cara a cara

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
        document.getElementById('rotateLeft').addEventListener('click', () => rotateCube(-1));
        document.getElementById('rotateRight').addEventListener('click', () => rotateCube(1));

        // Variables para el swipe
        let startX = 0;
        let endX = 0;

        container.addEventListener('touchstart', (event) => {
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
        });
    });
});
