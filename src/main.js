import {
    AmbientLight,
    AxesHelper,
    BoxGeometry,
    Color,
    DoubleSide,
    Mesh,
    MeshPhongMaterial,
    PerspectiveCamera,
    PointLight,
    Scene,
    Vector3,
    WebGLRenderer,
} from 'three';

import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

import { ModelLoader } from '/src/loader.ts';
// import { Car } from '/src/car.ts';

// GUI
const gui = new GUI();

// Scene
const scene = new Scene();
scene.background = new Color(0x444444);

// Rendereer
const renderer = new WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.gammaOutput = true;

document.body.appendChild(renderer.domElement);

// Camera
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50);

camera.position.set(10, 10, 10);

// Lights
const lights = [];
lights[0] = new PointLight(0xffffff, 1, 0);
lights[1] = new PointLight(0xffffff, 1, 0);
lights[2] = new PointLight(0xffffff, 1, 0);

lights[0].position.set(0, 200, 0);
lights[1].position.set(100, 200, 100);
lights[2].position.set(-100, -200, -100);

scene.add(lights[0]);
scene.add(lights[1]);
scene.add(lights[2]);

const ambientLight = new AmbientLight(0xffffff, 1);
scene.add(ambientLight);

// Orbit controls
const orbit = new OrbitControls(camera, renderer.domElement);
orbit.enableZoom = true;

// Axes
const axes = new AxesHelper(10);
axes.visible = true;
scene.add(axes);

// Loaders
const mtlLoader = new MTLLoader();
const objLoader = new OBJLoader();

// Body
// const jeep1 = undefined;

const loader = new ModelLoader();
loader.load('jeep', 'models/jeep/jeep_multi.glb');

await loader.waitFor('jeep');

// const jeep = new Car(loader.getModel('jeep'));
// scene.add(jeep.model);
scene.add(loader.getModel('jeep'));

// const loader = new GLTFLoader();

// loader.load(
//   'models/jeep/jeep_multi.glb',
//   function (gltf) {
//     scene.add(gltf.scene);

//     const body = gltf.scene.getObjectByName('body');
//     body.position.y = 2;
//     console.log(body);

//     wheel = gltf.scene.getObjectByName('wheel_front_right');
//     wheel.rotation.y = 0;
//     console.log(wheel.rotation.x);
//     console.log(wheel.rotation.y);
//     console.log(wheel.rotation.z);
//   },
//   // called while loading is progressing
//   function (xhr) {
//     console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
//   },
//   // called when loading has errors
//   function (error) {
//     console.log('An error happened');
//   }
// );

// GUI options
const opt = {
    fixed: true,
    showAxes: axes.visible,
    // width: wheel.geometry.parameters.width,
    // height: box.geometry.parameters.height,
    // depth: box.geometry.parameters.depth,
};

// GUI callbacks
function updateBox(geometry) {
    box.geometry.dispose();
    box.geometry = geometry;
}

function updateAxes() {
    axes.visible = !axes.visible;
}

gui.add(opt, 'fixed');
gui.add(opt, 'showAxes').onChange(() => {
    axes.visible = !axes.visible;
});
// gui.add(opt, 'width', 1, 30).onChange(() => {
//     updateBox(new BoxGeometry(opt.width, opt.height, opt.depth));
// });
// gui.add(opt, 'height', 1, 30).onChange(() => {
//     updateBox(new BoxGeometry(opt.width, opt.height, opt.depth));
// });
// gui.add(opt, 'depth', 1, 30).onChange(() => {
//     updateBox(new BoxGeometry(opt.width, opt.height, opt.depth));
// });

const foo = 4;
const keyboardControl = false;

// Render
function render() {
    requestAnimationFrame(render);
    
    if (!opt.fixed) {
    }
    
    renderer.render(scene, camera);
}

window.addEventListener(
    'resize',
    function () {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        
        renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
    );
    
window.addEventListener(
    'keydown',
    (event) => {
        console.log(event.code);
        // jeep.update(event.code);
        switch (event.code) {
            case 'ArrowUp':
            jeep.move({ delta: 0.1 });
            break;
            case 'ArrowDown':
            jeep.move({ delta: -0.1 });
            break;
            case 'ArrowRight':
            jeep.move({ theta: 0.1 });
            break;
            case 'ArrowLeft':
            jeep.move({ theta: -0.1 });
            break;
            default:
            break;
        }
    },
    true
);
        
// Start render
render();