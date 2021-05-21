function resalta(fondo) {
    fondo.style.background = "#f5e400";
}
function noResalta(fondo){
    fondo.style.background = "white";
}
//Submit ENTER:
function submitEnter(e){
    if(e.keyCode === 13){
        validarLetra(); // "podrá utilizarse un botón para tal fin o bien pulsar la tecla "Enter""
    }
}

// Valida Letra
function validarLetra(){
    var letr = document.getElementById("letraDNI").value;
    if (isNaN(letr)|| letr ==""){
        console.log(letr);
        validarDNI(); // Si la letra es correcta pasamos a validar los números
    }
    else {
        alert('Escribe una letra en el campo letra ');
        document.getElementById("letraDNI").value = ""; //borra el input para introducir nuevos datos
    }
    crearMensajes();
}

//Valida los números del DNI
function validarDNI() {
    var num = document.getElementById("numerosDNI").value;
    if (num == null || num == ""){ //No se debe permitir una entrada vacía
        // window.open("ejemplo_error_pages/error_001.html", "", ",top=500,left=500,width=850,height=250"); //ejemplo para dar los errores mediante ventanas emergentes
        alert('Escribe un número en el campo "NÚMERO" please ;) ');
        document.getElementById("numerosDNI").value = ""; //borra el input para introducir nuevos datos
    }    
    else if (isNaN(parseInt(num))){ //ni una entrada no numérica
        alert('Introduce solo números en el campo "NÚMERO" ');
        document.getElementById("numerosDNI").value = ""; //borra el input para introducir nuevos datos
    } 
    else if (parseInt(num) < 0 ){ //tampoco se va a permitir un valores negativos
        alert('Introduce un DNI válido en el campo "NÚMERO"');
        document.getElementById("numerosDNI").value = ""; //borra el input para introducir nuevos datos
    }
    else if (num.length < 8 ){ // ni valores menores de 8 cifras 
        alert('Introduce un DNI válido en el campo "NÚMERO", si el número de tu DNI tiene menos de 8 cifras introduce un 0 al principio');
        document.getElementById("numerosDNI").value = ""; //borra el input para introducir nuevos datos
    } 
    else {
        calcular(parseInt(num)); //Si todo es correcto procede a calcular la letra
        return num;
    }
}

//Calcula la letra
function calcular(numCalc) {
    //array que almacena las letras:
    const letras = ['T', 'R', 'W', 'A', 'G', 'M', 'Y', 'F', 'P', 'D', 'X', 'B', 'N', 'J', 'Z', 'S', 'Q', 'V', 'H', 'L', 'C', 'K', 'E'];
        const resto = numCalc % 23;
        const letraCalc = letras[resto];
        escribir(letraCalc); //tras calcular la letra procede a escribirla en pantalla
        return letraCalc;
}

// Creamos los mensajes para el usuario 
var selector = document.querySelector('.textos-escritos');
const mensajeLetra = document.createElement('H1'); // para mostrar el resultado usando H1
const mensaje = document.createElement('H3'); // para mostrar el resultado si no coincide usando H3
mensaje.classList.add('comparar');

function crearMensajes (){ // evitamos que aparezca un espacio en blanco en el index 
    selector.appendChild(mensajeLetra);
    selector.appendChild(mensaje);
}
  
function escribir(letra){ //Escribe la letra en pantalla
    mensajeLetra.textContent = `La letra calculada es: ${letra}`;
    const letra1 = letra;
    compararLetra(letra1); // tras escribir la letra procede a compararla con la introducida por el usuario
    return letra1;
}

//Compara la letra calculada con la introducida por el usuario y muestra el resultado en pantalla
function compararLetra(letra1){
    var letra2 = document.getElementById("letraDNI").value;
    
    if (letra1 == letra2 || letra1 == letra2.toUpperCase()) { // La letra introducida coincide con la calculada
        // document.getElementById("comparar").innerHTML= `<h3> Enhorabuena la letra coincide con la que has introducido </h3>`;
        mensaje.textContent = 'Enhorabuena la letra coincide con la que has introducido';
        mensaje.style.background = "white";
        mensaje.style.color = "green";
    }
    else if (letra2==""){
        mensaje.textContent = `No has introducido ninguna letra para comparar -_o_-`;
        mensaje.style.color = "#F5E400";
        mensaje.style.background = "#4c96b3";
    }
    else { // La letra introducida no coincide con la calculada
        mensaje.textContent= `Ups! la letra introducida no coincide con la calculada`;
        mensaje.style.color = "red";
        mensaje.style.background = "white"; 
    }
}


