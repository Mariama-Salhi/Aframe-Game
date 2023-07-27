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




AFRAME.registerComponent('collider-check', {
  dependencies: ['raycaster'],

  init: function () {
   
    console.log('ok collider check');
    var debugtxt = document.querySelector('a-text');
    var thunksound = document.querySelector('#thunk');
    
    this.el.addEventListener('raycaster-intersection', function (e) {
      //-- get selected object
      this.selectedObj = e.detail.els[0];
      debugtxt.setAttribute('value', 'Cargate a los coders!');
    });
    
    this.el.addEventListener('raycaster-intersection-cleared', function (e) {
      //-- get selected object
      this.selectedObj = null;
      
    });
    
      
    //-- trigger button pressed
    this.el.addEventListener('triggerdown', function (e) {
        //debugtxt.setAttribute('value', 'Trigger button pressed');
      
        if(!this.selectedObj) return;
      
        debugtxt.setAttribute('value', this.selectedObj.id);
        this.selectedObj.parentNode.removeChild(this.selectedObj);
        thunksound.play();
      
    });
  },
  
  
});




// CODIGO DEL COUNTER

 let tiempoRestante = 60;
let intervaloContador;

// Función para iniciar el contador regresivo
function iniciarContadorRegresivo() {
  intervaloContador = setInterval(() => {
    tiempoRestante--;
    actualizarContadorTiempo();

    if (tiempoRestante <= 0) {
      clearInterval(intervaloContador);
      // Aquí puedes agregar cualquier acción que desees realizar al finalizar el tiempo
      alert("Game Over");
    }
  }, 1000); // El contador se actualizará cada segundo (1000 milisegundos)
}

// Función para actualizar el texto del contador regresivo en A-Frame
function actualizarContadorTiempo() {
  const contadorTiempo = document.getElementById("contadorTiempo");
  contadorTiempo.setAttribute("text", "value", `Tiempo restante: ${tiempoRestante}`);
}

// Llamar a la función para iniciar el contador regresivo al cargar la página
iniciarContadorRegresivo();


     