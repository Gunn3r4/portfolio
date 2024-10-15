// Initialize Three.js Scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); // Append canvas to body

// Create fullscreen plane for VHS static noise
const geometry = new THREE.PlaneBufferGeometry(2, 2);
const noiseShader = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
        void main() {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec2 resolution;

        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
            vec2 st = gl_FragCoord.xy / resolution.xy; // Normalize coordinates
            float noise = random(st * time * 10.0);    // Multiply time for speed
            vec3 color = vec3(noise);                  // Set color to the noise value
            gl_FragColor = vec4(color, 1.0);           // Output the final color
        }
    `
});

// Add the static noise plane to the scene
const noiseMesh = new THREE.Mesh(geometry, noiseShader);
scene.add(noiseMesh);

// Add Neon Grid Helper
var gridHelper = new THREE.GridHelper(100, 100, 0x00ffff, 0x00ffff); // Neon cyan grid
scene.add(gridHelper);

// Set initial camera position for the grid
camera.position.z = 50;
camera.position.y = 25;
camera.rotation.x = -0.5; // Slightly tilt for perspective

// Animation loop to move the grid and update noise shader
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate the neon grid
    gridHelper.rotation.z += 0.01;
    
    // Increment the noise shader time to animate the static
    noiseShader.uniforms.time.value += 0.05;

    // Render the scene
    renderer.render(scene, camera);
}
animate();

// Handle window resize to ensure canvas covers full screen
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    noiseShader.uniforms.resolution.value.set(window.innerWidth, window.innerHeight);
});
