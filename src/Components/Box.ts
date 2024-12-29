import * as THREE from 'three';

export class Box {
  public mesh: THREE.Mesh;
  private width: number;
  private height: number;
  private depth: number;
  private orgColor!: THREE.Color;
  private tempColor!: THREE.Color;
  public geometry: THREE.BufferGeometry;
  public material:any;

  setMesh(m:THREE.Mesh){
    this.mesh = m;
  }
  
  //geometry: THREE.Geometry | THREE.BufferGeometry, material: THREE.Material | THREE.Material[]) 
  constructor(m:THREE.Mesh | any,width: number = 1, height: number = 1, depth: number = 1)
  {
    this.tempColor = new THREE.Color().setHex( 0x000000); 
    this.orgColor = new THREE.Color().setHex( 0xff0000);
    
   
    if(m != null)
      {
        this.mesh = m;
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.geometry = this.mesh.geometry;
        this.material = this.mesh.material;
        
      }
      else{
     // Call the parent class constructor with geometry and material
    // Create the box geometry
    this.geometry = new THREE.BoxGeometry(width, height, depth);

    // Create a basic material for the box (can be customized)
    this.material = new THREE.MeshBasicMaterial({ color:  this.orgColor});

    
    //super(geometry, material); 
    this.width = width;
    this.height = height;
    this.depth = depth;

    
    // Create the mesh with the geometry and material
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    
    // Optionally, set some properties (e.g., position, rotation)
    this.mesh.position.set(0, 0, 0);
      }
  }

  // Getter for the mesh, so it can be added to the scene
  getMesh(): THREE.Mesh {
    return this.mesh;
  }

  // Method to set the position of the box
  setPosition(x: number, y: number, z: number): void {
    this.mesh.position.set(x, y, z);
  }

  // Method to rotate the box
  rotate(x: number, y: number, z: number): void {
    this.mesh.rotation.set(x, y, z);
  }

  // Method to update the box's scale
  setScale(scaleX: number, scaleY: number, scaleZ: number): void {
    this.mesh.scale.set(scaleX, scaleY, scaleZ);
  }

  setName(name:string):void {
    this.mesh.name = name;
  }
  // Method to update material (e.g., change color)
  updateMaterial(color: number): void {
    this.tempColor.setHex(color);
    
    this.material.color.setHex(color);  
    //this.material = new THREE.MeshBasicMaterial({ color: this.tempColor });
    //this.material.needsUpdate = true;
  }

  updateTransparent(value:boolean){
    this.material.transparent = value;
  }
  updateMaterialWireFrame(value: boolean): void {
    
    
  this.material.wireframe = value;
    //this.material = new THREE.MeshBasicMaterial({ color: this.tempColor });
    //this.material.needsUpdate = true;
  }

  resetColor(){
    this.material.color.setHex(this.orgColor);//.setHex(this.orgColor);  
    //this.mesh.material = new THREE.MeshBasicMaterial({ color: this.orgColor });
    //this.material.needsUpdate = true;
  }

  // Cleanup method (optional for when the box is removed)
  dispose(): void {
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.Material).dispose();
  }
}
