import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

//Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

//Torus

const geometry = new THREE.TorusGeometry(10, 3, 16, 100)
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

//Lights

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(5, 5, 5)

const ambientLight  = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

//Helpers

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper)

//const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color: 0xffffff})
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star)
}

Array(300).fill().forEach(addStar)

//Background

const techTexture = new THREE.TextureLoader().load('banner2.png');
scene.background = techTexture;

//Avatar

const alexTexture = new THREE.TextureLoader().load('mypic.png')

const alex = new THREE.Mesh(
  new THREE.BoxGeometry(3,3,3),
  new THREE.MeshBasicMaterial({map:alexTexture})
);

scene.add(alex);

//Sphere

const frontendTexture = new THREE.TextureLoader().load('banner1.png');
const otherTexture = new THREE.TextureLoader().load('banner1.png')

const frontend = new THREE.Mesh(
  new THREE.SphereGeometry(3,32,32),
  new THREE.MeshStandardMaterial ({
    map: frontendTexture,
    normalMap: otherTexture,
  })
);

scene.add(frontend);

frontend.position.z = 30;
frontend.position.setX(-10);

alex.position.z = -5;
alex.position.x = 2;

//Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  frontend.rotation.x += 0.05;
  frontend.rotation.y += 0.075;
  frontend.rotation.z += 0.05;

  alex.rotation.y += 0.01;
  alex.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  // controls.update();

  renderer.render(scene, camera);
}

animate()