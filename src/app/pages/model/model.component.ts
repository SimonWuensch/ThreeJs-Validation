import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as THREE from 'three';
import { AmbientLight, DirectionalLight } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-model',
  templateUrl: './model.component.html',
  styleUrls: ['./model.component.scss']
})
export class ModelComponent implements OnInit, AfterViewInit {

  @ViewChild('rendererContainer') rendererContainer: ElementRef | undefined;

  renderer: any;
  scene: any;
  camera: any;

  constructor() {
    this.renderer = new THREE.WebGLRenderer({antialias: true});

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xdddddd);

    this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 5000);
    this.camera.rotation.y = 45 / 180 * Math.PI;
    this.camera.position.x = 1500;
    this.camera.position.y = 100;
    this.camera.position.z = 1000;

    new OrbitControls(this.camera,this.renderer.domElement);
    const hlight = new AmbientLight(0x404040, 100);
    this.scene.add(hlight);

    const directionalLight = new DirectionalLight(0xffffff, 100);
    directionalLight.position.set(0, 1, 0);
    directionalLight.castShadow = true;

    this.scene.add(directionalLight);
    const light = new THREE.PointLight(0xc4c4c4, 10);
    light.position.set(0, 300, 500);
    this.scene.add(light);
    const light2 = new THREE.PointLight(0xc4c4c4, 10);
    light2.position.set(500, 100, 0);
    this.scene.add(light2);
    const light3 = new THREE.PointLight(0xc4c4c4, 10);
    light3.position.set(0, 100, -500);
    this.scene.add(light3);
    const light4 = new THREE.PointLight(0xc4c4c4, 10);
    light4.position.set(-500, 300, 500);
    this.scene.add(light4);

    let loader = new GLTFLoader();
    loader.load('../../assets/model/car/scene.gltf', (gltf) => {
      const car = gltf.scene.children[0];
      car.scale.set(0.5, 0.5, 0.5);
      this.scene.add(gltf.scene);
      gltf.scene.addEventListener('click', () => console.log('######## car clicked'));
      this.animate();
    });
  }

  public ngOnInit() {
    console.log('###########', this.rendererContainer);
  }

  public ngAfterViewInit() {
    if(!!this.rendererContainer) {
      this.renderer.setSize(this.rendererContainer.nativeElement.offsetWidth, window.innerHeight);
      this.rendererContainer.nativeElement.appendChild(this.renderer.domElement);
      this.animate();

      this.registerEvents();
    }
  }

  public registerEvents() {
    this.renderer.domElement.addEventListener("click", () =>
      console.log('################## click'));


    // var selectedObject;
    // var raycaster = new THREE.Raycaster();
    // // function onclick(event) {
    // alert("onclick")
    // var mouse = new THREE.Vector2();
    // raycaster.setFromCamera(mouse, camera);
    // var intersects = raycaster.intersectObjects(planets, true); //array
    // if (intersects.length > 0) {
    //   selectedObject = intersects[0];
    //   alert(selectedObject);
    // }
  }

  private onclick() {
  }

  public animate() {
    window.requestAnimationFrame(() => this.animate());
    this.renderer.render(this.scene, this.camera);
  }
}
