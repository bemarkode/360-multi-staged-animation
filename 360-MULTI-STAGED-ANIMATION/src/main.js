import * as THREE from 'three';
import { createSpheresOnSurface } from './modules/spheresGrid.js';
import { addLights } from './modules/lights.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, 800 / 800, 0.1, 20000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "high-performance",
    stencil: false,
    depth: true,
});


renderer.setSize(800, 800);

document.getElementById('animation-container').appendChild(renderer.domElement);

addLights(scene);



const rows = 70;
const cols = 70;

const spheresGrid = createSpheresOnSurface(rows, cols);
scene.add(spheresGrid);


const center = new THREE.Vector3(0, 0, 0);
camera.position.set(center.x, center.y - 3000, center.z + 750);
    camera.lookAt(center);


function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();