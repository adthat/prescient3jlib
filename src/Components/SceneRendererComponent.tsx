import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import React, { use, useEffect, useRef, useState } from 'react';
import { SceneRenderer } from './SceneRenderer'; // Import your class here
import { Box } from './Box';
import { Controller } from './Controller';
import {MeshState} from './MeshState';
//import modelUrl from '../../public/models/DamagedHelmet


const SceneRendererComponent: React.FC = () => {
  const canvasRef = useRef<HTMLDivElement>(null); // Reference to the container div
  var controllerObj=null;
  const controlRef = useRef<Controller|null>(null);
  const sceneRenderRef = useRef<SceneRenderer|null>(null);
  const boxRef = useRef<Box|null>(null);
  const boxTempRef = useRef<Box|null>(null);
 const[color,setColor] = useState(0xff0000);
 const[IsWireframe,setIsWireframe] = useState(false);
 const [state, setState] = useState<MeshState>({ color: 0xff0000, wireframe:false,side:1,transparent:false });
  
  /* useEffect(()=>{
    console.log("Controller selected obj changed");
  },[controlRef.current?.selectedObject]);
 */
  useEffect(()=>{
    const container = canvasRef.current;
    if (!canvasRef.current) return;
   
      console.log("INSIDE USEEFFECT");
      // Create an instance of SceneRenderer, passing the container's id
      if(!sceneRenderRef.current){
          sceneRenderRef.current = new SceneRenderer(canvasRef.current.id);
          sceneRenderRef.current.animate(); // Start the animation loop
      }
      
        //controllerObj = new Controller(sceneRenderer);
       if(sceneRenderRef.current && !controlRef.current)
          controlRef.current =  new Controller(sceneRenderRef.current);//controllerObj;

       if(!boxRef.current){
  
        var loader = new GLTFLoader();
       // const dracoLoader = new DRACOLoader();
        //loader.setDRACOLoader( dracoLoader );
        //loader.load('../../models/1976_volkswagen_golf_gti_mk1/scene.gltf', function(gltf) {
        //loader.load('../../models/DamagedHelmet/DamagedHelmet.gltf', function(gltf) {
        loader.load('../../models/Flower.glb', function(gltf) {
          sceneRenderRef.current?.getScene().add(gltf.scene);
          controlRef.current?.handleModel(gltf);
        
        }, undefined, function(error) {
          console.error(error);
        });

/*
        boxRef.current = new Box(null,2,2,2);
        boxRef.current.setPosition(2,0,-2)
        boxRef.current.setName("1");
        sceneRenderRef.current.addMesh(boxRef.current)

        
   
        boxRef.current = new Box(null,2,2,2);
        boxRef.current.setPosition(-2,0,-2)
        boxRef.current.setName("2");
        sceneRenderRef.current.addMesh(boxRef.current)

        boxRef.current = new Box(null,2,2,2);
        boxRef.current.setPosition(-2,2,-2)
        boxRef.current.setName("3");
        sceneRenderRef.current.addMesh(boxRef.current)

         var lgeo = new THREE.LineBasicMaterial({ color: 0xffffff });
        lgeo.linewidth = 5;
        var egh = new THREE.EdgesGeometry(boxRef.current.geometry);
        const edges = new THREE.LineSegments(egh, lgeo);
        sceneRenderRef.current.getScene().add(edges);
 */
       }
     
       /* const upda
       teColor = () => {
        if (boxRef.current) {
          console.log("UPDATE COLOR")
          boxRef.current.material.color.set(color); // Update the cube's color
        }
      };
  
      // Initial color update
      updateColor();
   */
    
      //sceneRenderer.addMesh(boxRef.current);
      return () => {
        //boxRef.current.dispose()
        sceneRenderRef.current?.cleanup();
        console.log("Rendercomponent UNMOUNT");
      };
    
  },[])
  
 function onpointerdown(event:React.MouseEvent){

 // console.log("in onpointerdown");
  controlRef.current?.onMouseClick(event);
 
 }

 useEffect(()=>{
  controlRef.current?.updateState(state);   
 },[state])
 
 useEffect(()=>{
  console.log()
 },[controlRef.current?.selectedObject])
 /* useEffect(()=>{
  

  if(controlRef.current?.selectedObject){
    console.log("IN COLOR CHANGE- selected object found-"+color);
    if(controlRef.current.selectedObject instanceof THREE.Mesh){
                var b:Box = new Box(controlRef.current.selectedObject) ;
                //boxTempRef.current = b;
                b.updateMaterialWireFrame(IsWireframe);
                //b.material.color.set(0x00ffff);
               // console.log("Mesh-"+ JSON.stringify(b));//+"---"+JSON.stringify(this.selectedObject));
                console.log(b.getMesh().name)
                
              }
        }
        else{
          console.log("IN COLOR CHANGE- NO selected object found");
        }
     
 },[IsWireframe]) */
 function onGround(){

 }
 function onZoomIn(){

  sceneRenderRef.current?.zoomIn();
 }
 function onZoomOut(){
sceneRenderRef.current?.zoomOut();
 }
 function onTryClickWireFrame(){
  //setIsWireframe(!IsWireframe);
  var w:boolean  = !state.wireframe;
  setState(prevState=>({...prevState,wireframe:w}));
 }
  function onTryClick(){
    console.log("onTryClick"+color);
    //event.preventDefault();    
    setState(prevState=>({...prevState,color:color+100}));
    //setColor(color+100);
    /* if(boxRef.current){
      boxRef.current.updateMaterial(0x0fff00)
    } */
    /* if(controlRef.current){

        //setColor(0x0fff00);
       

      if(boxRef.current){
        boxRef.current.getMesh().material = new THREE.MeshBasicMaterial({ color: 0x0000aa });
        console.log("TRYE")
      }
       
     */  //boxRef.current?.updateMaterial(0x0000aa);
      /* var obj = controlRef.current.selectedObject;
    console.log("IN TRY");
    console.log((controlRef.current.selectedObject));
    if(obj instanceof THREE.Mesh){
      console.log("try me");
      var b:Box = new Box(obj) ;
      //b.updateMaterial(0xaaffaa);
      obj.material.color.setHex(0x0000aa);
    //  controlRef.current.sceneRender.animate()
  } */
    //}
    
}

  return (
  <div className="container">
  <div ref={canvasRef} id="scene-container"  onPointerDown={(event)=>onpointerdown(event)}  className='three-container' />
  {/* <div ref={containerRef} id="scene-container"  onPointerDown={(event)=>onpointerdown(event)} style={{ width: '80%', height: '80vh' }} /> */}
    
    
    <div className="buttons">
      <button  onClick={(event)=>onTryClick()}>Try Color</button>
      <button  onClick={(event)=>onTryClickWireFrame()}>Try Wireframe</button>
      <button   onClick={(event)=>onGround()}>Ground</button>
      <button   onClick={(event)=>onZoomIn()}>Zoom In</button>
      <button   onClick={(event)=>onZoomOut()}>Zoom Out</button>
    </div>
   {/*  <div className="buttons"> </div> */}
    </div>
  );
 // return <div ref={containerRef} id="scene-container" style={{ width: '500px', height: '500px' }} />;
};

export default SceneRendererComponent;
