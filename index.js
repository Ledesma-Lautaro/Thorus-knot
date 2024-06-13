import * as THREE from "three"
import { OrbitControls } from "jsm/controls/OrbitControls.js"


//renderer
const w = window.innerWidth;
const h = window.innerHeight;
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.setSize(w, h);
document.body.appendChild(renderer.domElement);

//camera
const fov = 75;
const aspect = w / h;
const near = 0.1;
const far = 1000;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 15;

//controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;

//scene
const scene = new THREE.Scene();

const radius = 3.5;  

const tubeRadius = 1.5;  

const radialSegments = 8;  

const tubularSegments = 64;  

const p = 2;  

const q = 3;  

const geo = new THREE.TorusKnotGeometry(radius, tubeRadius, tubularSegments, radialSegments, p, q );
const mat = new THREE.MeshStandardMaterial({
    color: 0xffffff, 
    flatShading: true
});
const mesh = new THREE.Mesh(geo, mat);
scene.add(mesh);

const wireMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    wireframe: true,
    
});

const wireMesh = new THREE.Mesh(geo, wireMat);
wireMesh.scale.setScalar(1.001);
mesh.add(wireMesh);

const hemiLight = new THREE.HemisphereLight(0x0099ff, 0xaa5500, 1);
scene.add(hemiLight);

function animate(){
    requestAnimationFrame(animate);
    controls.update();

    mesh.rotation.x += 0.001;
    mesh.rotation.y += 0.001;
   
    renderer.render(scene, camera);

}

animate();