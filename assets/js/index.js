// Initialize Three.js Scene for the main page (Neon Grid)
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Append canvas to body

// Add Neon Grid Helper
var gridHelper = new THREE.GridHelper(100, 100, 0xC8A2C8, 0xC8A2C8); // Neon cyan grid
scene.add(gridHelper);

// Set initial camera position for the grid
camera.position.z = 50;
camera.position.y = 25;
camera.rotation.x = -0.5; // Slightly tilt for perspective

// Animation loop to rotate the neon grid
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the neon grid
    gridHelper.rotation.z += 0.01;

    // Render the scene
    renderer.render(scene, camera);
}
animate();

// Handle window resize to ensure the canvas covers full screen
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
