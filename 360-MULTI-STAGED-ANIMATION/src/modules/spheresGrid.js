import * as THREE from 'three';
import { surface } from './surface.js';

export function createSpheresOnSurface(rows, cols) {
    const sphereGeometry = new THREE.SphereGeometry(15, 32, 32);
    const sphereMaterial = new THREE.MeshStandardMaterial({
        vertexColors: false,
        metalness: 0.1,
        roughness: 0.1,
        emissive: 0x020202,
    });

    const totalSpheres = rows * cols;
    const spheres = new THREE.InstancedMesh(sphereGeometry, sphereMaterial, totalSpheres);

    const matrix = new THREE.Matrix4();
    const position = new THREE.Vector3();
    const scale = new THREE.Vector3(1, 1, 1);

    for (let i = 0; i < totalSpheres; i++) {
        const u = (i % cols) / (cols - 1);
        const v = Math.floor(i / cols) / (rows - 1);
       
        surface.getPoint(u, v, position);

        matrix.makeTranslation(position.x, position.y, position.z);

       
        matrix.compose(position, new THREE.Quaternion(), scale);
        spheres.setMatrixAt(i, matrix);
    }

    return spheres;
}