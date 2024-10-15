//Three.js Scene for the VHS static noise on projects page
var scene = new THREE.Scene();
var camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1); 
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement); 

// Fullscreen quad geometry for static noise shader
const geometry = new THREE.PlaneBufferGeometry(2, 2);
const noiseShader = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 1.0 },
        resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
    },
    vertexShader: `
        void main() {
            gl_Position = vec4(position, 1.0);
        }
    `,
    fragmentShader: `
        uniform float time;
        uniform vec2 resolution;

        float random(vec2 st) {
            return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
        }

        void main() {
            vec2 st = gl_FragCoord.xy / resolution.xy;
            float noise = random(st * time * 10.0);
            gl_FragColor = vec4(vec3(noise), 1.0);
        }
    `
});

// Add the static noise plane to the scene
const noiseMesh = new THREE.Mesh(geometry, noiseShader);
scene.add(noiseMesh);

// Animation loop to update noise shader
function animate() {
    requestAnimationFrame(animate);

    // Increment the noise shader time to animate the static noise
    noiseShader.uniforms.time.value += 0.05;

    // Render the static noise scene
    renderer.render(scene, camera);
}
animate();

// Ensure the canvas covers the full screen and resizes correctly
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

document.addEventListener("DOMContentLoaded", function() {
    let selectedItemIndex = -1;
    let menuItems;

    // Initialize the menu interactions
    function initializeMenu() {
        menuItems = document.querySelectorAll('.list-group-item');

        // Attach click event listeners directly to each menu item
        menuItems.forEach((item, index) => {
            item.removeEventListener('click', handleMenuClick); // Remove any existing listeners
            item.addEventListener('click', handleMenuClick); // Add a fresh listener
        });

        // Reapply keyboard navigation
        document.removeEventListener('keydown', handleKeyDown);
        document.addEventListener('keydown', handleKeyDown);

        // Update the visual selection
        updateSelectedItem();
    }

    // Handle keyboard navigation
    function handleKeyDown(e) {
        if (!menuItems || menuItems.length === 0) return;

        if (e.key === "ArrowDown") {
            selectedItemIndex = (selectedItemIndex + 1) % menuItems.length;
            updateSelectedItem();
        } else if (e.key === "ArrowUp") {
            selectedItemIndex = (selectedItemIndex - 1 + menuItems.length) % menuItems.length;
            updateSelectedItem();
        } else if (e.key === "Enter" && selectedItemIndex !== -1) {
            triggerAction(menuItems[selectedItemIndex]);
        }
    }

    // Function to handle mouse clicks on menu items
    function handleMenuClick(e) {
        const clickedItem = e.target.closest('.list-group-item');
        const menuItemsArray = Array.from(menuItems); // Update the list of menu items
        selectedItemIndex = menuItemsArray.indexOf(clickedItem);
        updateSelectedItem();
        triggerAction(clickedItem); // Call the function for the clicked item
    }

    // Update the selected menu item visually
    function updateSelectedItem() {
        menuItems.forEach((item, index) => {
            if (index === selectedItemIndex) {
                item.classList.add('selected');
            } else {
                item.classList.remove('selected');
            }
        });
    }

    // Attach the correct function to the corresponding menu item
    function triggerAction(item) {
        const textContent = item.textContent.trim(); // Get the text content of the clicked item

        // Attach the correct function to the menu item
        if (textContent === "Timer Recording") {
            timerRecording();
        } else if (textContent === "Projects") {
            showProjects();
        } else if (textContent === "Clock Set/Adjust") {
            clockSetAdjust();
        } else if (textContent === "Channel Setup") {
            channelSetup();
        } else if (textContent === "VCR Function Setup") {
            vcrFunctionSetup();
        } else if (textContent === "Language/Lengua/Langue") {
            languageSetup();
        } else if (textContent === "Back to Main Menu") {
            loadMainMenu();
        }
    }

    // Initialize the menu when the page loads
    initializeMenu();

    // Custom functions for menu options
    function timerRecording() {
        alert("Timer Recording selected!");
    }

    function clockSetAdjust() {
        alert("Clock Set/Adjust selected!");
    }

    function channelSetup() {
        alert("Channel Setup selected!");
    }

    function vcrFunctionSetup() {
        alert("VCR Function Setup selected!");
    }

    function languageSetup() {
        alert("Language Setup selected!");
    }

    // Custom function to show the projects menu
    function showProjects() {
        const menuList = document.getElementById('menu-list');

        // Clear the existing menu items
        menuList.innerHTML = '';

        // Add new GitHub project links
        const projects = [
            { name: "Project 1", link: "https://github.com/user/project1" },
            { name: "Project 2", link: "https://github.com/user/project2" },
            { name: "Project 3", link: "https://github.com/user/project3" }
        ];

        projects.forEach(project => {
            const li = document.createElement('li');
            li.className = 'list-group-item';
            li.innerHTML = `<a href="${project.link}" target="_blank">${project.name}</a>`;
            menuList.appendChild(li);
        });

        // Add a "Back to Main Menu" option
        const backLi = document.createElement('li');
        backLi.className = 'list-group-item';
        backLi.textContent = 'Back to Main Menu';
        menuList.appendChild(backLi);

        // Reattach the click listener for the "Back to Main Menu" option
        backLi.addEventListener('click', loadMainMenu);

        selectedItemIndex = -1; // Reset selection
        initializeMenu(); // Reinitialize menu with new items
    }

    // Function to reload the main menu
    function loadMainMenu() {
        const menuList = document.getElementById('menu-list');

        // Restore the original menu items
        menuList.innerHTML = `
            <li class="list-group-item">Timer Recording</li>
            <li class="list-group-item">Projects</li>
            <li class="list-group-item">Clock Set/Adjust</li>
            <li class="list-group-item">Channel Setup</li>
            <li class="list-group-item">VCR Function Setup</li>
            <li class="list-group-item">Language/Lengua/Langue</li>
        `;

        selectedItemIndex = -1; // Reset selection
        initializeMenu(); // Reinitialize menu with new items
    }
});
