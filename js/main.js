// Initialize scene, camera, and renderer
const scene = new THREE.Scene();

// Add fog to create dreamy atmosphere
scene.fog = new THREE.FogExp2(0x808080, 0.02);

// Initialize TV screen
let tvScreen;
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x808080);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Add lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffd7b3, 1.2);
directionalLight.position.set(5, 5, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.near = 0.5;
directionalLight.shadow.camera.far = 500;
directionalLight.shadow.bias = -0.001;
directionalLight.shadow.radius = 4;
directionalLight.shadow.camera.left = -10;
directionalLight.shadow.camera.right = 10;
directionalLight.shadow.camera.top = 10;
directionalLight.shadow.camera.bottom = -10;
scene.add(directionalLight);

// Add a point light to simulate the TV screen glow
const screenGlow = new THREE.PointLight(0xf8f4e6, 1.5, 8);
screenGlow.position.set(0, 0.2, 0.3);
screenGlow.decay = 1.5;
screenGlow.distance = 3;
scene.add(screenGlow);

// Add point lights around the TV with natural colors
const leftLight = new THREE.PointLight(0xffeedd, 1.0, 120);
leftLight.position.set(-5, 0, 0);
scene.add(leftLight);

const rightLight = new THREE.PointLight(0xffeedd, 1.0, 120);
rightLight.position.set(5, 0, 0);
scene.add(rightLight);

const topLight = new THREE.PointLight(0xfff6e6, 1.0, 120);
topLight.position.set(0, 5, 0);
scene.add(topLight);

const bottomLight = new THREE.PointLight(0xfff6e6, 1.0, 120);
bottomLight.position.set(0, -5, 0);
scene.add(bottomLight);

const backLight = new THREE.PointLight(0xfff6e6, 1.0, 120);
backLight.position.set(0, 0, -5);
scene.add(backLight);

// Set up camera position
camera.position.z = 5;

// Add orbit controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Show loading indicator
const loadingElement = document.getElementById('loading');
loadingElement.style.display = 'block';

// Load the 3D model
const loader = new THREE.GLTFLoader();
loader.load(
    'models/scene.gltf',
    function (gltf) {
        scene.add(gltf.scene);
        
        // Enable shadows for the model
        gltf.scene.traverse(function(node) {
            if (node.isMesh) {
                node.castShadow = true;
                node.receiveShadow = true;
            }
        });
        
        // Center the model
        const box = new THREE.Box3().setFromObject(gltf.scene);
        const center = box.getCenter(new THREE.Vector3());
        gltf.scene.position.x -= center.x;
        gltf.scene.position.y -= center.y;
        gltf.scene.position.z -= center.z;
        
        // Adjust camera to fit model
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const fov = camera.fov * (Math.PI / 180);
        let cameraZ = Math.abs(maxDim / Math.sin(fov / 2));
        camera.position.z = cameraZ * 1.5;
        camera.updateProjectionMatrix();

        // Hide loading indicator
        loadingElement.style.display = 'none';
        
        // Initialize TV screen after model is loaded
        tvScreen = new TVScreen(scene);
    },
    function (xhr) {
        const percent = (xhr.loaded / xhr.total * 100);
        loadingElement.textContent = `Loading 3D Model... ${Math.round(percent)}%`;
    },
    function (error) {
        console.error('An error occurred loading the model:', error);
        loadingElement.textContent = 'Error loading 3D model. Please check the console for details.';
    }
);

// Handle window resize
window.addEventListener('resize', onWindowResize, false);

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();