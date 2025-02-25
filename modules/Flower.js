import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
class Flower {
    constructor (){
        this.canvas=document.querySelector('.js-canvas')
        this.canvasWidth=window.innerWidth
        this.canvasHeight=window.innerHeight

        this.init ()
    }

init () {
    this.createScene ()
    this.createCamera ()
    this.createRender ()
    this.createGroupOfFlower ()
    this.createStem ()
    this.createPistil ()
    this.createPetal ()
    this.createOrbitControls ()
    this.AddGroupToScene ()
    this.animate()
}

createScene () {
    this.scene = new THREE.Scene()
    this.scene.background=new THREE.Color('skyblue')
}

createCamera (){
    const aspectRatio=this.canvasWidth/this.canvasHeight
    this.camera = new THREE.PerspectiveCamera( 45,aspectRatio, 0.1, 1000 )
    this.camera.position.z=300
    this.camera.position.y=100
    this.camera.position.x=0
}

createRender (){
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( this.canvasWidth, this.canvasHeight )
    this.canvas.appendChild(this.renderer.domElement )
}

createGroupOfFlower (){
    this.groupOfFlower = new THREE.Group()
}

createStem (){
    this.steamHeight=50
    const geometry = new THREE.CylinderGeometry( 1, 1,this.steamHeight, 32 )
    const color = new THREE.Color ('rgb(13, 103, 13)')
    const material = new THREE.MeshBasicMaterial( {color: color} )
    const stem = new THREE.Mesh( geometry, material )
    stem.position.y=this.steamHeight/2
    this.groupOfFlower.add( stem )
}

createPistil (){
    const geometry = new THREE.SphereGeometry( 2, 32, 16 )
    const color = new THREE.Color ('rgb(255, 178, 0)')
	const material = new THREE.MeshBasicMaterial( { color:color } )
	const pistil = new THREE.Mesh( geometry, material )
    pistil.position.y=this.steamHeight
	this.groupOfFlower.add( pistil )
}

createPetal(){
    const geometry = new THREE.ConeGeometry( 8, -1.5, 32 )
    const color = new THREE.Color ('rgb(121, 51, 69)')
	const material = new THREE.MeshBasicMaterial( {color: color} )
    const positionX = [-8,0,8,0]
    const positionZ = [0,-8,0,8]
    const rotationZ = [-20,0,20,0]
    const rotationX = [0,20,0,-20]
	for (let i=0; i<4 ;i++){
        const petal = new THREE.Mesh( geometry, material )
        petal.position.y=this.steamHeight
        petal.position.x=positionX[i]
        petal.position.z=positionZ[i]
        petal.rotation.z=THREE.MathUtils.degToRad(rotationZ[i])
        petal.rotation.x=THREE.MathUtils.degToRad(rotationX[i])
	    this.groupOfFlower.add( petal )
    }
}

createOrbitControls (){
    this.controls = new OrbitControls( this.camera, this.renderer.domElement )
}

AddGroupToScene (){
    this.scene.add(this.groupOfFlower)
}

animate() {
	requestAnimationFrame( this.animate.bind(this) )
	this.renderer.render( this.scene, this.camera )
    this.controls.update ()
}


}
export {Flower}