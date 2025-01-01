import * as THREE from 'three';
import { OrbitControls } from  'three/examples/jsm/controls/OrbitControls.js';
import { Box } from './Box';

export class SceneRenderer {
  private scene: THREE.Scene;
  public camera: THREE.PerspectiveCamera;
  public renderer: THREE.WebGLRenderer;
  private containerId: string;
  public raycaster: THREE.Raycaster;
  private mouse:THREE.Vector2;
  public boxA: any;
  public objects: THREE.Mesh[];
  public controls:OrbitControls;

  
   
  constructor(containerId: string = 'scene-container') {
    this.containerId = containerId;

    // Create a new scene
    this.scene = new THREE.Scene();

    // Create a camera with a field of view of 75, aspect ratio, near and far clipping planes
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    console.log("width" +window.innerWidth)
    console.log("height" +window.innerHeight)
    // Create the renderer with antialiasing enabled
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // Set the renderer size to match the window's width and height
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    //this.renderer.setSize(700,700);
    
    const rect:DOMRect = this.renderer.domElement.getBoundingClientRect()
    
    this.controls = new OrbitControls( this.camera, this.renderer.domElement );
    
    const light = new THREE.AmbientLight(0xffffff);
    this.scene.add(light);
    
    this.scene.background =  new THREE.Color(0x87CEEB);
  //  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  //  directionalLight.position.set(0, 0, 0).normalize();
  //  this.scene.add(directionalLight);
    
    console.log("DOM bounding rect--"+JSON.stringify(rect));

    console.log("DOM width--"+this.renderer.domElement.width);
    console.log("DOM height--"+this.renderer.domElement.height);
    

    // Optionally, add a background color to the scene
    this.renderer.setClearColor(0x000000, 1); // black background

    // Append the renderer to the specified container
    const container = document.getElementById(this.containerId);
    if (container) {
      container.appendChild(this.renderer.domElement);
    } else {
      console.error(`Container with id "${this.containerId}" not found.`);
    }

    // Set the camera position
    this.camera.position.z = 5;
    //this.camera.lookAt(new THREE.Vector3(0,0,-2));    
    this.mouse = new THREE.Vector2();
    this.raycaster = new THREE.Raycaster();

    this.objects = [];
    //window.addEventListener('click', this.onMouseClick);
    window.addEventListener('resize', () => {
      // Ensure renderer and camera are adjusted for new canvas size
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });

    
  }

  /*onMouseClick = (event: MouseEvent) => {

    // Update the mouse position in normalized device coordinates (NDC)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the raycaster with the camera and mouse position
    //this.raycaster.updateWorldMatrix();
    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Check if the ray intersects with the box
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      //setIsBoxClicked(true); // Set state when box is clicked
      console.log('Box clicked-'+ intersects[0].object.name);
      //this.selectedObject = intersects[0].object;
        //this.selectedObject.material.color = "red";
    }
    else{
       // this.selectedObject = null
        console.log('unclicked- '+intersects.length);
    }
    
  };*/


   zoomIn = () => {
    if (this.camera.fov > 10) {
      this.camera.fov -= 2; // Narrow FOV for zooming in
      this.camera.updateProjectionMatrix();
    }
  };
  
   zoomOut = () => {
    if (this.camera.fov < 80) {
      this.camera.fov += 2; // Widen FOV for zooming out
      this.camera.updateProjectionMatrix();
    }
  };
  getScene(){
    return this.scene;
  }
  getCamera(){
    return this.camera;
  }
  
  // A method to update the scene and render continuously (like a game loop)
  animate() {
    requestAnimationFrame(() => this.animate());

   // console.log("RENDERING");
    // You can update scene objects here (e.g., rotating objects)

    // Render the scene with the camera
    this.renderer.render(this.scene, this.camera);
  }



  // Method to return the tag (in this case, the container id of the scene)
  getTag(): string {
    return this.containerId;
  }

  // Cleanup method to stop rendering when the component is unmounted
  cleanup() {
    this.renderer.dispose();
  }

  addMesh(b:Box){
    this.boxA = b.getMesh();
    this.scene.add(b.getMesh());
    this.objects.push(b.getMesh())
  }
  addMesh1(b:THREE.Mesh){
    //this.boxA = b.getMesh();
    this.scene.add(b);
    this.objects.push(b)
  }
}
