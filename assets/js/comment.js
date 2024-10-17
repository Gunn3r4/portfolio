// Just shoving some unused functions and content in here for now

// Anime.js for Glitchy Text Effect
// document.addEventListener('DOMContentLoaded', function() {
//     anime({
//         targets: '.vhs-text',
//         translateX: function() { return Math.random() * 10 - 5; }, // Random X shift
//         translateY: function() { return Math.random() * 10 - 5; }, // Random Y shift
//         color: ['#ff33cc', '#00ffff', '#ffffff'], // Cycle through neon colors
//         easing: 'easeInOutQuad',
//         duration: 200,
//         direction: 'alternate',
//         loop: true
//     });
// });

// // JavaScript to create a flickering effect
// setInterval(() => {
//     const playText = document.querySelector('.play-icon');
//     playText.style.opacity = Math.random() > 0.5 ? 1 : 0.8; // Flicker effect
// }, 100);

// Anime.js Static Flicker Effect
// anime({
//     targets: '.vhs-static',
//     opacity: [
//         { value: 0.3, duration: 100, easing: 'easeInOutQuad' }, // Opacity flicker
//         { value: 0.1, duration: 100, easing: 'easeInOutQuad' }
//     ],
//     translateY: [
//         { value: '-2px', duration: 50, easing: 'easeInOutQuad' }, // Small vertical shift
//         { value: '2px', duration: 50, easing: 'easeInOutQuad' }
//     ],
//     // translateX: [
//     //     { value: '-3px', duration: 80, easing: 'easeInOutQuad' },
//     //     { value: '3px', duration: 80, easing: 'easeInOutQuad' }
//     // ],    
//     loop: true, // Keep it looping for continuous static effect
//     easing: 'easeInOutQuad'
// });

// Initialize Three.js Scene
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement); // Append the canvas to the body

// // Create Neon Grid Helper
// var gridHelper = new THREE.GridHelper(100, 100, 0x00ffff, 0x00ffff); // Neon cyan grid
// scene.add(gridHelper);

// // Set Camera Position
// camera.position.z = 50;
// camera.position.y = 25;
// camera.rotation.x = -0.5; // Slightly tilted for perspective

// // Animate the Grid (Rotating)
// function animate() {
//     requestAnimationFrame(animate);
//     gridHelper.rotation.z += 0.01; // Rotate the grid for subtle movement
//     renderer.render(scene, camera);
// }
// animate();

// // Initialize Three.js Scene for the main page (Neon Grid)
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// var renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// document.body.appendChild(renderer.domElement); // Append canvas to body

// // Add Neon Grid Helper
// var gridHelper = new THREE.GridHelper(100, 100, 0xC8A2C8, 0xC8A2C8); // Neon cyan grid
// scene.add(gridHelper);

// // Set initial camera position for the grid
// camera.position.z = 50;
// camera.position.y = 25;
// camera.rotation.x = -0.5; // Slightly tilt for perspective

// // Animation loop to rotate the neon grid
// function animate() {
//     requestAnimationFrame(animate);
    
//     // Rotate the neon grid
//     gridHelper.rotation.z += 0.01;

//     // Render the scene
//     renderer.render(scene, camera);
// }
// animate();

// // Handle window resize to ensure the canvas covers full screen
// window.addEventListener('resize', () => {
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     camera.aspect = window.innerWidth / window.innerHeight;
//     camera.updateProjectionMatrix();
// });
