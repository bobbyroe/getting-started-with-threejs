import * as THREE from "three";
import { OrbitControls } from "jsm/controls/OrbitControls.js";

const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 10;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;
const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.03;

const geo = new THREE.IcosahedronGeometry(1.0, 1.0);
const mat = new THREE.MeshStandardMaterial({
    color: 0x0066ff,
    flatShading: true,
    transparent: true,
    opacity: 1.0
});
const wireMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
})
const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
const mesh = new THREE.Mesh(geo, mat);
mesh.add(wireMesh);
scene.add(mesh);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0xff0000);
scene.add(hemiLight);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();