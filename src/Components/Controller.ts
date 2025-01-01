import * as THREE from 'three';
import { SceneRenderer } from "./SceneRenderer";
import { Box } from './Box';
import {MeshState} from './MeshState';

export class Controller{

public sceneRender:SceneRenderer ;
private scene:any;
private element:any;
private camera:any;
public mouseoverObject:any;
public selectedObject:any;
private mouse:THREE.Vector2;
public raycaster: THREE.Raycaster;
public selectObjectIndex:number;

public mouseDown:any = false;
public mouseMoved:any = false; // has mouse moved since down click

public rotateMouseOver:any = false;

public states = {
  UNSELECTED: 0, // no object selected
  SELECTED: 1, // selected but inactive
  DRAGGING: 2, // performing an action while mouse depressed
  ROTATING: 3,  // rotating with mouse down
  ROTATING_FREE: 4, // rotating with mouse up
  PANNING: 5
};
public state:any = this.states.UNSELECTED;

public needsUpdate:any = true;

    constructor(sceneR: SceneRenderer) {
        this.sceneRender = sceneR;
        this.scene = this.sceneRender.getScene();
        this.camera = this.sceneRender.getCamera();
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.selectObjectIndex= 0;
        this.selectedObject = null;
        //window.addEventListener('click', this.onMouseClick);
        
    //    this.sceneRender.renderer.domElement.addEventListener('pointerdown',this.onMouseClick);

    }
    CheckIntersects(event:MouseEvent, eventType:String) {
      event.preventDefault();
  
      const rect = this.sceneRender.renderer.domElement.getBoundingClientRect();
      let mouse = new THREE.Vector2();
  
      mouse.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
  
      let raycaster = this.sceneRender.raycaster;
      let camera = this.sceneRender.camera;
      raycaster.setFromCamera(mouse, camera);
  
      let objects = this.sceneRender.getScene().children;
      const intersects = raycaster.intersectObjects(objects, true);
      let intersected = intersects.length > 0 ? intersects[0].object : null;
  
      console.log(" intersects.length = ", intersects.length);
  }
  
  updateState(state:MeshState){
    if(this.selectedObject){
      console.log("IN COLOR CHANGE- selected object found-"+JSON.stringify(state));
      if(this.selectedObject instanceof THREE.Mesh){
                  var b:Box = new Box(this.selectedObject) ;
                  //boxTempRef.current = b;
                  b.updateMaterial(state.color);
                  b.updateMaterialWireFrame(state.wireframe);
                  //b.material.color.set(0x00ffff);
                 // console.log("Mesh-"+ JSON.stringify(b));//+"---"+JSON.stringify(this.selectedObject));
                  console.log(b.getMesh().name)
                  
                }
          }
          else{
            console.log("IN COLOR CHANGE- NO selected object found");
          }
    
  }
  updateColorSelectedObject(color:number){
    if(this.selectedObject){
      console.log("IN COLOR CHANGE- selected object found-"+color);
      if(this.selectedObject instanceof THREE.Mesh){
                  var b:Box = new Box(this.selectedObject) ;
                  //boxTempRef.current = b;
                  b.updateMaterial(color);
                  //b.material.color.set(0x00ffff);
                 // console.log("Mesh-"+ JSON.stringify(b));//+"---"+JSON.stringify(this.selectedObject));
                  console.log(b.getMesh().name)
                  
                }
          }
          else{
            console.log("IN COLOR CHANGE- NO selected object found");
          }
    
  }
    /*AddMouseEvents() {
      let camera = this.sceneRender.camera;
  
      window.addEventListener("mouseup", function () {
          console.log("mouse coords = ", camera.position);
      });
  
      document.addEventListener("mousedown", (event) => {
          CheckIntersects(event, "mousedown");
      });
  
      document.addEventListener("mousemove", (event) => {
          CheckIntersects(event, "mousemove");
      });
  
      window.addEventListener("wheel", (event) => {
          Resize(camera, window.ThreeJsData.renderer);
      });
  }
  */
  
    onMouseClick = (event:React.MouseEvent) => {

     // event.stopPropagation();
      event.preventDefault();
     // const rect = this.sceneRender.renderer.domElement.getBoundingClientRect();
     // this.mouse.x = ((event.clientX - rect.left) / (rect.right - rect.left)) * 2 - 1;
     // this.mouse.y = -((event.clientY - rect.top) / (rect.bottom - rect.top)) * 2 + 1;
  
        // Update the mouse position in normalized device coordinates (NDC)
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
        // Update the raycaster with the camera and mouse position
        //this.raycaster.updateWorldMatrix();
        this.raycaster.setFromCamera(this.mouse, this.camera);
    
        // Check if the ray intersects with the box
        const intersects = this.raycaster.intersectObjects(this.sceneRender.objects);
    
        if (intersects.length > 0) {
          
          //setIsBoxClicked(true); // Set state when box is clicked
          console.log('Box clicked-'+ intersects[0].object.name);
          this.selectedObject = intersects[0].object ;
          console.log(typeof(this.selectedObject))
          
          if(this.selectedObject instanceof THREE.Mesh){
            var b:Box = new Box(this.selectedObject) ;
            b.updateMaterial(0x00ffff);
           // console.log("Mesh-"+ JSON.stringify(b));//+"---"+JSON.stringify(this.selectedObject));
            console.log(b.getMesh().name)
            
          }
          //this.selectObjectIndex++;
        }
        else{
           // this.selectedObject = null
           
          //   if(this.selectedObject instanceof THREE.Mesh){
          //     var b:Box = new Box(this.selectedObject) ;
          //     b.resetColor();
          //    this.selectedObject = null;    
          //    }
            }
           //this.selectObjectIndex = 0;
            
            console.log('unclicked- '+intersects.length);
            //console.log(JSON.stringify(this.selectedObject))
        }
 //       this.sceneRender.animate()
        
      
    

      getSelectedObject(){
        return this.selectedObject;
      }
}

/*module BP3D.Three {
export var Controller = function (three, model, camera, element) {

    var scope = this;

    this.enabled = true;

    var three = three;
    var model = model;
    var controls = controls;
    

    var plane; // ground plane used for intersection testing

    var mouse;
    var intersectedObject;
 
    function init() {
      element.mousedown(mouseDownEvent);
      element.mouseup(mouseUpEvent);
      element.mousemove(mouseMoveEvent);

      mouse = new THREE.Vector2();

      scene.itemRemovedCallbacks.add(itemRemoved);
      scene.itemLoadedCallbacks.add(itemLoaded);
      setGroundPlane();
    }

}
}*/