import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment";
import * as ZapparThree from "@zappar/zappar-threejs";
import "./style.css";

try {
  /**
   * Initial
   **/

  // Camera
  const camera = new ZapparThree.Camera();

  // Scene
  const scene = new THREE.Scene();
  scene.background = camera.backgroundTexture;

  // Renderer
  const renderer = new THREE.WebGLRenderer();
  document.body.appendChild(renderer.domElement);
  renderer.setSize(window.innerWidth, window.innerHeight);
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
  renderer.setAnimationLoop(render);
  // The Zappar library needs your WebGL context, so pass it
  ZapparThree.glContextSet(renderer.getContext());

  // MODELVIEWER
  let pmremGenerator = new THREE.PMREMGenerator(renderer);
  scene.environment = pmremGenerator.fromScene(
    new RoomEnvironment(),
    0.04
  ).texture;

  // Request the necessary permission from the user
  ZapparThree.permissionRequestUI().then((granted) => {
    if (granted)
      camera.start(true); // For face tracking let's use the user-facing camera
    else ZapparThree.permissionDeniedUI();
  });

  // Set up our image tracker group
  const tracker = new ZapparThree.FaceTrackerLoader().load();
  const trackerGroup = new ZapparThree.FaceAnchorGroup(camera, tracker);
  scene.add(trackerGroup);

  const headMaskMesh = new ZapparThree.HeadMaskMeshLoader().load();
  trackerGroup.add(headMaskMesh);

  // Loader
  const gltfLoader = new GLTFLoader();

  /**
   * Main
   */

  // FaceMeshes
  const mask_1 = new URL("./assets/faceMesh_1.png", import.meta.url).href;
  const mask_2 = new URL("./assets/faceMesh_2.png", import.meta.url).href;
  // const mask_2 = new URL("./assets/test_faceMesh.png", import.meta.url).href;

  // 3D Models
  // const maskedHelmet = new URL("./assets/masked_helmet.glb", import.meta.url).href;
  const helmet_1 = new URL("./assets/helmet_1.glb", import.meta.url).href;
  const helmet_2 = new URL("./assets/helmet_2.glb", import.meta.url).href;
  const helmet_3 = new URL("./assets/helmet_3.glb", import.meta.url).href;
  const horn_1 = new URL("./assets/horn_1.glb", import.meta.url).href;
  const horn_2 = new URL("./assets/horn_2.glb", import.meta.url).href;
  const horn_3 = new URL("./assets/horn_3.glb", import.meta.url).href;

  const button_mask_1 = document.getElementById("mask_1");
  const button_mask_2 = document.getElementById("mask_2");
  const button_horn_1 = document.getElementById("horn_1");
  const button_horn_2 = document.getElementById("horn_2");
  const button_horn_3 = document.getElementById("horn_3");
  const button_helmet_1 = document.getElementById("helmet_1");
  const button_helmet_2 = document.getElementById("helmet_2");
  const button_helmet_3 = document.getElementById("helmet_3");

  const FLAG = {};

  button_mask_1.addEventListener("click", action_mask_1);
  button_mask_2.addEventListener("click", action_mask_2);
  button_horn_1.addEventListener("click", action_horn_1);
  button_horn_2.addEventListener("click", action_horn_2);
  button_horn_3.addEventListener("click", action_horn_3);
  button_helmet_1.addEventListener("click", action_helmet_1);
  button_helmet_2.addEventListener("click", action_helmet_2);
  button_helmet_3.addEventListener("click", action_helmet_3);

  let model_helmet_1, model_helmet_2, model_helmet_3;
  let model_horn_1, model_horn_2, model_horn_3;

  gltfLoader.load(helmet_1, (gltf) => {
    model_helmet_1 = gltf.scene;
    gltf.scene.name = "model_helmet_1";
    FLAG["model_helmet_1"] = true;
    gltf.scene.position.set(0.3, -1.3, 0);
    gltf.scene.scale.set(1.1, 1.1, 1.1);
    gltf.scene.getObjectByName("Helmet_Mask").visible = false;
  });

  gltfLoader.load(helmet_2, (gltf) => {
    model_helmet_2 = gltf.scene;
    gltf.scene.name = "model_helmet_2";
    FLAG["model_helmet_2"] = true;
    gltf.scene.position.set(0.3, -1.3, 0);
    gltf.scene.scale.set(1.1, 1.1, 1.1);
    gltf.scene.getObjectByName("Helmet_Mask").visible = false;
  });

  gltfLoader.load(helmet_3, (gltf) => {
    model_helmet_3 = gltf.scene;
    gltf.scene.name = "model_helmet_3";
    FLAG["model_helmet_3"] = true;
    gltf.scene.position.set(0.3, -1.3, 0);
    gltf.scene.scale.set(1.1, 1.1, 1.1);
    gltf.scene.getObjectByName("Helmet_Mask").visible = false;
  });

  gltfLoader.load(horn_1, (gltf) => {
    model_horn_1 = gltf.scene;
    gltf.scene.name = "model_horn_1";
    FLAG["model_horn_1"] = true;
    gltf.scene.position.set(0.3, -1.3, 0);
    gltf.scene.scale.set(1.1, 1.1, 1.1);
    gltf.scene.getObjectByName("Helmet_Mask").visible = false;
  });

  gltfLoader.load(horn_2, (gltf) => {
    model_horn_2 = gltf.scene;
    gltf.scene.name = "model_horn_2";
    FLAG["model_horn_2"] = true;
    gltf.scene.position.set(0.3, -1.3, 0);
    gltf.scene.scale.set(1.1, 1.1, 1.1);
    gltf.scene.getObjectByName("Helmet_Mask").visible = false;
  });

  gltfLoader.load(horn_3, (gltf) => {
    model_horn_3 = gltf.scene;
    gltf.scene.name = "model_horn_3";
    FLAG["model_horn_3"] = true;
    gltf.scene.position.set(0.3, -1.3, 0);
    gltf.scene.scale.set(1.1, 1.1, 1.1);
    gltf.scene.getObjectByName("Helmet_Mask").visible = false;
  });

  // Face mesh
  const faceMesh = new ZapparThree.FaceMeshLoader().load();
  const faceBufferGeometry = new ZapparThree.FaceBufferGeometry(faceMesh);

  const model_mask_1 = new THREE.Mesh(
    faceBufferGeometry,
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(mask_1),
      transparent: true,
    })
  );
  model_mask_1.name = "model_mask_1";
  FLAG["model_mask_1"] = true;

  const model_mask_2 = new THREE.Mesh(
    faceBufferGeometry,
    new THREE.MeshStandardMaterial({
      map: new THREE.TextureLoader().load(mask_2),
      transparent: true,
    })
  );
  model_mask_2.name = "model_mask_2";
  FLAG["model_mask_2"] = true;

  function add_model(model) {
    trackerGroup.add(model);
    FLAG[model.name] = false;
  }
  function remove_model(model) {
    trackerGroup.remove(model);
    FLAG[model.name] = true;
  }

  function action_helmet_1() {
    if (FLAG["model_helmet_1"] == true) {
      add_model(model_helmet_1);
      remove_model(model_helmet_2);
      remove_model(model_helmet_3);
    } else {
      remove_model(model_helmet_1);
    }
  }

  function action_helmet_2() {
    if (FLAG["model_helmet_2"] == true) {
      add_model(model_helmet_2);
      remove_model(model_helmet_1);
      remove_model(model_helmet_3);
    } else {
      remove_model(model_helmet_2);
    }
  }

  function action_helmet_3() {
    if (FLAG["model_helmet_3"] == true) {
      add_model(model_helmet_3);
      remove_model(model_helmet_2);
      remove_model(model_helmet_1);
    } else {
      remove_model(model_helmet_3);
    }
  }

  function action_horn_1() {
    if (FLAG["model_horn_1"] == true) {
      add_model(model_horn_1);
      remove_model(model_horn_2);
      remove_model(model_horn_3);
    } else {
      remove_model(model_horn_1);
    }
  }

  function action_horn_2() {
    if (FLAG["model_horn_2"] == true) {
      add_model(model_horn_2);
      remove_model(model_horn_1);
      remove_model(model_horn_3);
    } else {
      remove_model(model_horn_2);
    }
  }

  function action_horn_3() {
    if (FLAG["model_horn_3"] == true) {
      add_model(model_horn_3);
      remove_model(model_horn_2);
      remove_model(model_horn_1);
    } else {
      remove_model(model_horn_3);
    }
  }

  function action_mask_1() {
    if (FLAG["model_mask_1"] == true) {
      add_model(model_mask_1);
      remove_model(model_mask_2);
    } else {
      remove_model(model_mask_1);
    }
  }

  function action_mask_2() {
    if (FLAG["model_mask_2"] == true) {
      add_model(model_mask_2);
      remove_model(model_mask_1);
    } else {
      remove_model(model_mask_2);
    }
  }

  // Set up our render loop
  function render() {
    camera.updateFrame(renderer);
    faceBufferGeometry.updateFromFaceAnchorGroup(trackerGroup);
    headMaskMesh.updateFromFaceAnchorGroup(trackerGroup);
    renderer.render(scene, camera);
  }
} catch (error) {
  document.location.reload();
}
