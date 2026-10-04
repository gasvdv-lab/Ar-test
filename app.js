import * as THREE from 'three';
import { ARButton } from 'three/addons/webxr/ARButton.js';

const statusEl = document.getElementById('status');
const introEl = document.getElementById('intro');

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.01,
  20
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.xr.enabled = true;
renderer.xr.setReferenceSpaceType('local');
document.body.appendChild(renderer.domElement);

scene.add(new THREE.HemisphereLight(0xffffff, 0x666666, 2.2));

const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(1, 2, 1);
scene.add(directionalLight);

// Exact WebXR/world dimensions are in metres.
// 0.5 m = 50 cm.
const CUBE_SIZE_M = 0.5;

// The cube origin is at its centre. When placed on a floor,
// move it up by half its height so its bottom rests on the surface.
const cubeGeometry = new THREE.BoxGeometry(
  CUBE_SIZE_M,
  CUBE_SIZE_M,
  CUBE_SIZE_M
);

const cubeMaterial = new THREE.MeshStandardMaterial({
  color: 0x1688ff,
  roughness: 0.55,
  metalness: 0.05,
  transparent: true,
  opacity: 0.78
});

const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
cube.visible = false;
scene.add(cube);

// Crisp edges make the 50 cm volume easier to judge visually.
const edges = new THREE.LineSegments(
  new THREE.EdgesGeometry(cubeGeometry),
  new THREE.LineBasicMaterial({ color: 0xffffff })
);
cube.add(edges);

// Reticle showing where the detected real-world surface is.
const reticle = new THREE.Mesh(
  new THREE.RingGeometry(0.07, 0.09, 48).rotateX(-Math.PI / 2),
  new THREE.MeshBasicMaterial({ color: 0xffffff })
);
reticle.matrixAutoUpdate = false;
reticle.visible = false;
scene.add(reticle);

let hitTestSource = null;
let hitTestSourceRequested = false;

const controller = renderer.xr.getController(0);
controller.addEventListener('select', () => {
  if (!reticle.visible) {
    statusEl.textContent = 'Nog geen oppervlak gevonden. Beweeg de telefoon rustig.';
    return;
  }

  const p = new THREE.Vector3();
  const q = new THREE.Quaternion();
  const s = new THREE.Vector3();

  reticle.matrix.decompose(p, q, s);

  cube.position.copy(p);
  cube.position.y += CUBE_SIZE_M / 2;

  // Keep the cube upright relative to gravity/floor.
  cube.rotation.set(0, 0, 0);
  cube.visible = true;

  statusEl.textContent = 'Kubus geplaatst: 50 × 50 × 50 cm. Tik opnieuw om hem te verplaatsen.';
});
scene.add(controller);

const arButton = ARButton.createButton(renderer, {
  requiredFeatures: ['hit-test'],
  optionalFeatures: ['local-floor']
});
document.body.appendChild(arButton);

renderer.xr.addEventListener('sessionstart', () => {
  introEl.style.display = 'none';
  statusEl.textContent = 'Zoek de vloer of een horizontaal oppervlak…';
});

renderer.xr.addEventListener('sessionend', () => {
  introEl.style.display = '';
  statusEl.textContent = 'AR gestopt.';
  reticle.visible = false;
  hitTestSource = null;
  hitTestSourceRequested = false;
});

renderer.setAnimationLoop((time, frame) => {
  if (frame) {
    const referenceSpace = renderer.xr.getReferenceSpace();
    const session = renderer.xr.getSession();

    if (!hitTestSourceRequested) {
      session.requestReferenceSpace('viewer').then((viewerSpace) => {
        session.requestHitTestSource({ space: viewerSpace }).then((source) => {
          hitTestSource = source;
        });
      });

      session.addEventListener('end', () => {
        hitTestSourceRequested = false;
        hitTestSource = null;
      }, { once: true });

      hitTestSourceRequested = true;
    }

    if (hitTestSource) {
      const hitTestResults = frame.getHitTestResults(hitTestSource);

      if (hitTestResults.length > 0) {
        const hit = hitTestResults[0];
        const pose = hit.getPose(referenceSpace);

        if (pose) {
          reticle.visible = true;
          reticle.matrix.fromArray(pose.transform.matrix);
          if (!cube.visible) {
            statusEl.textContent = 'Oppervlak gevonden. Tik om de kubus te plaatsen.';
          }
        }
      } else {
        reticle.visible = false;
        if (!cube.visible) {
          statusEl.textContent = 'Zoek de vloer of een horizontaal oppervlak…';
        }
      }
    }
  }

  renderer.render(scene, camera);
});

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
