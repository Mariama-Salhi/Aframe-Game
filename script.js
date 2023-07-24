 // Obtener el elemento del vehículo y las esferas
 const car = document.getElementById("car");
 const esferas = document.querySelectorAll(".eliminar-esfera");

 // Variables para el movimiento del vehículo
 const moveSpeed = 0.5;
 const rotationSpeed = 5;
 const jumpStrength = 1.5; // Ajusta la fuerza del salto según tu preferencia

 // Variable para controlar si el vehículo está saltando o no
 let isJumping = false;

 // Contador para el número de esferas eliminadas
 let contadorEsferasEliminadas = 0;

 // Función para controlar el vehículo con las teclas de flecha
 function controlCarWithArrowKeys() {
   window.addEventListener("keydown", (e) => {
     if (e.key === "ArrowUp") {
       car.object3D.translateZ(-moveSpeed);
     } else if (e.key === "ArrowDown") {
       car.object3D.translateZ(moveSpeed);
     } else if (e.key === "ArrowLeft") {
       car.object3D.rotation.y += THREE.Math.degToRad(rotationSpeed);
     } else if (e.key === "ArrowRight") {
       car.object3D.rotation.y -= THREE.Math.degToRad(rotationSpeed);
     } else if (e.key === " ") { // Tecla "Space" para saltar
       if (!isJumping) {
         isJumping = true;
         car.object3D.position.y += jumpStrength;
         setTimeout(() => {
           car.object3D.position.y -= jumpStrength;
           isJumping = false;
         }, 500); // Duración del salto en milisegundos (ajusta esto según tu preferencia)
       }
     }
   });
 }

 // Función para eliminar la esfera cuando el vehículo colisiona con ella
 function eliminarEsferaSiColisiona() {
   const carPosition = car.object3D.position;
   const carRadius = 1; // Ajusta el valor del radio del vehículo según su tamaño

   esferas.forEach((esfera) => {
     const esferaPosition = esfera.object3D.position;
     const esferaRadius = esfera.getAttribute("radius");

     const distance = carPosition.distanceTo(esferaPosition);

     if (distance < carRadius + esferaRadius) {
       esfera.parentNode.removeChild(esfera);
       contadorEsferasEliminadas++;
       actualizarContador();
     }
   });
 }



 // Función para actualizar el texto del contador
 function actualizarContador() {
   const contadorText = document.getElementById("contador");
   contadorText.setAttribute("value", contadorEsferasEliminadas.toString());
 }

 // Llamar a la función para habilitar el control del vehículo con las teclas de flecha
 controlCarWithArrowKeys();

 // Llamar a la función para comprobar colisiones y eliminar la esfera periódicamente
 setInterval(eliminarEsferaSiColisiona, 10);


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
