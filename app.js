AFRAME.registerComponent('thumbstick-logging',{
  init: function () {
    
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
  },
  logThumbstick: function (evt) {
    var cameraRig = document.querySelector('#cameraRig');
    
    if (evt.detail.y > 0.95) { 
      cameraRig.object3D.translateZ(0.05);
    }
    if (evt.detail.y < -0.95) { 
      cameraRig.object3D.translateZ(-0.05);
    }
    if (evt.detail.x < -0.95) { 
      cameraRig.object3D.rotateY(THREE.Math.degToRad(5));
    }
    if (evt.detail.x > 0.95) { 
      cameraRig.object3D.rotateY(THREE.Math.degToRad(-5));
    }
  }
});