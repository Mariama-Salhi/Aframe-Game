// 

AFRAME.registerComponent('log', {
  
  init: function () {
    var debugtxt = document.querySelector('a-text');
    debugtxt.setAttribute('value', '');
  }
});


AFRAME.registerComponent('thumbstick-logging',{
  init: function () {
    
    this.el.addEventListener('thumbstickmoved', this.logThumbstick);
  },
  logThumbstick: function (evt) {
    var debugtxt = document.querySelector('a-text');
    var cameraRig = document.querySelector('#cameraRig');
    
    if (evt.detail.y > 0.95) { 
      debugtxt.setAttribute("value","DOWN"); 
      cameraRig.object3D.translateZ(0.05);
    }
    if (evt.detail.y < -0.95) { 
      debugtxt.setAttribute("value","UP");
      cameraRig.object3D.translateZ(-0.05);
    }
    if (evt.detail.x < -0.95) { 
      debugtxt.setAttribute("value","LEFT");
      cameraRig.object3D.rotateY(THREE.Math.degToRad(5));
    }
    if (evt.detail.x > 0.95) { 
      debugtxt.setAttribute("value","RIGHT");
      cameraRig.object3D.rotateY(THREE.Math.degToRad(-5));
    }
  }
});