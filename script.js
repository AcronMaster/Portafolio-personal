import * as THREE from 'https://unpkg.com/three@0.164.0/build/three.module.js';
import { GLTFLoader } from 'https://unpkg.com/three@0.164.0/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://unpkg.com/three@0.164.0/examples/jsm/controls/OrbitControls.js';

const container = document.getElementById('webgl-container');
const scene = new THREE.Scene();

// Cámara
const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
camera.position.set(0, 1.5, 3);

// Renderizador
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(container.clientWidth, container.clientHeight);
container.appendChild(renderer.domElement);

// Controles
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Luz
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);
const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 10, 5);
scene.add(dirLight);

// Cargar modelo
let model;
const loader = new GLTFLoader();
loader.load('models/Setup_Gamer_Project9.glb', gltf => {
    model = gltf.scene;
    model.scale.set(1,1,1);
    model.position.set(0,0,0);
    scene.add(model);
});

// Animación
let rotate = false;
document.getElementById('rotateBtn').addEventListener('click', () => rotate = !rotate);

// Cambiar color de todo el setup
document.getElementById('colorBtn').addEventListener('click', () => {
    if (!model) return;
    model.traverse(child => {
        if (child.isMesh) {
            child.material.color.setHex(Math.random() * 0xffffff);
        }
    });
});

function animate() {
    requestAnimationFrame(animate);
    if (rotate && model) {
        model.rotation.y += 0.01;
    }
    controls.update();
    renderer.render(scene, camera);
}
animate();

// Ajustar render al redimensionar ventana
window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
});
