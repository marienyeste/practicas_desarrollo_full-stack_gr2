// comprobamos que funcionan las apis en el navegador
if (window.File && window.FileReader && window.FileList) {
    console.log('Todas las APIs soportadas');
} else {
    alert('La API de FILE no es soportada en este navegador.');
}

//Función para manejar el archivo de video local
function videoSeleccionado(e) {
    var file = e.target.files[0]; //archivo subido
    var reader = new FileReader();
    var mensaje = document.getElementById('mensaje');
    var seccion_video = document.querySelector('#video');

    reader.onprogress = function (e) { //progreso de la carga
        mensaje.innerHTML = '<p>Cargando...</p>';
        console.log('cargando...');
        alert('El video está cargando...');
    }
    if (file.type.startsWith('video')) {
        reader.onload = function (e) {
            var video = document.getElementById('video');
            var src = document.createAttribute('src');
            var botonera = document.querySelector('#botonera');

            src.value = e.target.result;
            video.setAttributeNode(src); //añade atributo src al video
            mensaje.innerHTML = '<p></p>';
            console.log('video cargado');
            //la botonera y la caja de vídeo estan ocultas cuando no hay video:
            botonera.style.display = 'block';
            seccion_video.style.display = 'inline';
        }
        reader.readAsDataURL(file);
    } else {
        mensaje.innerHTML = '<h2>Introduce un archivo de video válido</h2>';
        botonera.style.display = 'none';
        seccion_video.style.display = 'none';
    }
}

//Función para controlar la reproducción del video
function videoToggle() {
    var video = document.getElementById('video'); //para reproducir/pausar el video
    var botonPause = document.querySelector('#play'); //para cambiar el botón play/pause

    if (video.paused) {
        video.play();
        botonPause.classList.replace('fa-play', 'fa-pause');
    } else {
        video.pause();
        botonPause.classList.replace('fa-pause', 'fa-play');
    }
}