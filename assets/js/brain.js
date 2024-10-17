// Create the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0x00aaff, // Blueish color
    metalness: 0.6, // Polished, metallic look
    roughness: 0.1, // Shiny
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lighting to the scene for a polished look
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft ambient light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.8); // Stronger point light for highlights
pointLight.position.set(10, 10, 10);
scene.add(pointLight);

// Position the camera
camera.position.z = 5;

// Animate the cube (slow spinning)
function animate() {
    requestAnimationFrame(animate);

    // Slow rotation
    cube.rotation.x += 0.001; // Slow spin
    cube.rotation.y += 0.001;

    renderer.render(scene, camera);
}

// Start the animation loop
animate();

// Handle window resize for responsiveness
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});


// Web Audio API + Three.js Audio Equalizer

// Step 1: Set up the audio context and analyser
// const audioContext = new (window.AudioContext || window.webkitAudioContext)();
// const analyser = audioContext.createAnalyser();
// analyser.fftSize = 256;
// const frequencyData = new Uint8Array(analyser.frequencyBinCount);

// // Step 2: Create an audio element and connect it to the analyser
// const audio = new Audio("assets/audio/gunner_type_beat.mp3"); // Link to your audio file
// const audioSource = audioContext.createMediaElementSource(audio);
// audioSource.connect(analyser);
// audioSource.connect(audioContext.destination);

// // Play the audio
// audio.play();

// // Step 3: Set up the Three.js scene
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// const renderer = new THREE.WebGLRenderer({ antialias: true });
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement);

// // Create multiple bars (cubes) for the equalizer
// const bars = [];
// const barCount = 32; // Number of bars in the equalizer
// const barWidth = 0.5;
// const spacing = 0.6;

// for (let i = 0; i < barCount; i++) {
//     const geometry = new THREE.BoxGeometry(barWidth, 1, barWidth);
//     const material = new THREE.MeshStandardMaterial({ color: 0x00aaff, metalness: 0.6, roughness: 0.1 });
//     const bar = new THREE.Mesh(geometry, material);
//     bar.position.x = i * spacing - (barCount * spacing) / 2;
//     scene.add(bar);
//     bars.push(bar);
// }

// // Add lighting
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);
// const pointLight = new THREE.PointLight(0xffffff, 1);
// pointLight.position.set(10, 10, 10);
// scene.add(pointLight);

// // Position the camera
// camera.position.z = 20;

// // Step 4: Animate the bars in response to the audio data
// function animate() {
//     requestAnimationFrame(animate);

//     // Get the frequency data from the analyser
//     analyser.getByteFrequencyData(frequencyData);

//     // Adjust the height of each bar based on frequency data
//     for (let i = 0; i < barCount; i++) {
//         const scaleY = frequencyData[i] / 255; // Normalize the frequency data
//         bars[i].scale.y = Math.max(scaleY * 10, 1); // Scale the bar height
//     }

//     renderer.render(scene, camera);
// }

// // Start the animation loop
// animate();
