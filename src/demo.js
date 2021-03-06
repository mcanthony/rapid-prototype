import THREE from 'three.js'; 
import dat   from 'dat-gui' ;
import Stats from 'stats-js' ;

const OrbitControls = require('three-orbit-controls')(THREE);

class Demo {
  constructor(args) 
  {
    this.renderer = null;
    this.camera   = null;
    this.scene    = null;
    this.counter  = 0;
    this.gui      = null;
    this.clock    = new THREE.Clock();
    this.DEBUG    = false;

    this.startStats();
    this.createRender();
    this.createScene();
    this.startGUI();
    this.addObjects();

    this.onResize();
    this.update();
  }

  startStats()
  {
    this.stats = new Stats(); 
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.top = 0;
    this.stats.domElement.style.display = this.DEBUG ? 'block' : 'none';
    this.stats.domElement.style.left = 0;
    this.stats.domElement.style.zIndex = 50;
    document.body.appendChild(this.stats.domElement);
    document.querySelector('.help').style.display = this.stats.domElement.style.display == 'block' ? "none" : "block";
  }

  createRender()
  {
    this.renderer = new THREE.WebGLRenderer( {
        antialias : true,
        clearColor: 0
    } );
    document.body.appendChild(this.renderer.domElement)
  }

  createScene()
  {
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 4000 );
    this.camera.position.set(0, 45, 240);
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.maxDistance = 500;

    this.scene = new THREE.Scene();
  }

  addObjects()
  {
    var gridHelper = new THREE.GridHelper( 100, 10 );        
    this.scene.add( gridHelper );
  }

  startGUI()
  {
    this.gui = new dat.GUI()
    this.gui.domElement.style.display = this.DEBUG ? 'block' : 'none';

    let cameraFolder = this.gui.addFolder('Camera');
    cameraFolder.add(this.camera.position, 'x', -400, 400);
    cameraFolder.add(this.camera.position, 'y', -400, 400);
    cameraFolder.add(this.camera.position, 'z', -400, 400);
    
  }

  update()
  {
    this.stats.begin();

    this.renderer.render(this.scene, this.camera);

    this.stats.end()
    requestAnimationFrame(this.update.bind(this));
  }

  /*
  events
  */

  onKeyUp(e)
  {
    let key = e.which || e.keyCode;
    switch(key)
    {
      // leter D
      case 68:
        this.stats.domElement.style.display = this.stats.domElement.style.display == 'block' ? "none" : "block";
        this.gui.domElement.style.display = this.gui.domElement.style.display == 'block' ? "none" : "block";
        document.querySelector('.help').style.display = this.gui.domElement.style.display == 'block' ? "none" : "block";
        break;
    }
  }

  onResize()
  {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
  }
}

export default Demo;