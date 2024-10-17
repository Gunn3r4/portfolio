// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Set the background color to dark
renderer.setClearColor(0x1a1a1a);

// Add a neon-colored grid that extends infinitely
const gridHelper = new THREE.GridHelper(100, 100, 0xff00ff, 0x00ffff); // Neon grid colors
gridHelper.position.y = -1;
scene.add(gridHelper);

// Create palm trees using cylinders and spheres (simple shapes for this example)
const palmTrees = [];
const createPalmTree = (x, z) => {
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.5, 5, 12);
    const trunkMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 }); // Brown trunk
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, 2.5, z);
    scene.add(trunk);

    // Palm leaves (using spheres for simplicity)
    const leafGeometry = new THREE.SphereGeometry(1.5, 8, 8);
    const leafMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 }); // Green leaves
    const leaves = new THREE.Mesh(leafGeometry, leafMaterial);
    leaves.position.set(x, 5, z);
    scene.add(leaves);

    palmTrees.push({ trunk, leaves });
};

// Place palm trees along the sides of the grid
for (let i = -50; i < 50; i += 10) {
    createPalmTree(-5, i);
    createPalmTree(5, i);
}

// Create the sun using a glowing sphere
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(0, 20, -100);
scene.add(sun);

// Add lighting for neon glow
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3); // Soft ambient light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xff00ff, 1, 100); // Neon light
pointLight.position.set(0, 10, 5);
scene.add(pointLight);

// Camera position
camera.position.z = 10;
camera.position.y = 2;

// Animate the scene (moving grid and palm trees)
function animate() {
    requestAnimationFrame(animate);

    // Move the grid and trees backwards to create the illusion of movement
    gridHelper.position.z += 0.1;
    palmTrees.forEach(tree => {
        tree.trunk.position.z += 0.1;
        tree.leaves.position.z += 0.1;

        // Reset tree position when it moves past the camera
        if (tree.trunk.position.z > camera.position.z) {
            tree.trunk.position.z = -100;
            tree.leaves.position.z = -100;
        }
    });

    renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
