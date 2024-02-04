//JUEGO DEL NUMERO SECRETO//

/*

let titulo = document.querySelector('h1');
titulo.innerHTML = 'JUEGO DEL NUMERO SECRETO';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'Indica un numero del 1 al 10';

*/


// Inicializar variables
let numeroSecreto = 0; //variable que contendra el numero secreto
let intentos = 0; //variable contador de intentos de juego
let listaNumerosGenerados = []; //lista que contendra los numeros generados
let numerosMaxGenerar = 3; //variable que definira el numero maximo de numeros generados


// Seleccionar partes del html ('h1' y 'p') y darle valores. Las 2 declaraciones iniciales se pueden resumir en una sola función
function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento); //seleccionar elemento
    elementoHTML.innerHTML = texto; //asignarle un texto
    return;
}

// Funcion para generar un numero secreto
function generarNumeroSecreto() {
    let numeroGenerado =  Math.floor(Math.random()*numerosMaxGenerar) + 1; //funcion matematica

    console.log(`Numero generado: ${numeroGenerado}, \nLista Num. Gen: ${listaNumerosGenerados}`);

    if (listaNumerosGenerados.length == numerosMaxGenerar) { //si ya se generaron todos los numeros posibles
        asignarTextoElemento('p', 'Ya se generaron todos los numeros posibles!');
        document.querySelector('#intentar').setAttribute('disabled', 'true'); //deshabilitar el boton con id="intentar"
        document.querySelector('#valorUsuario').setAttribute('disabled', 'true');  //deshabilitar la caja (input) llamada "valorUsuario"
    } else { //caso contrario
        if (listaNumerosGenerados.includes(numeroGenerado)) { //si el numero generado esta en la lista
            return generarNumeroSecreto(); //llamar a la funcion nuevamente (recursividad)
        } else { //caso contrario
            listaNumerosGenerados.push(numeroGenerado) //agregar a la lista
            return numeroGenerado;
        }
    }
}
//console.log(numeroSecreto)


// Funcion para dar las condiciones iniciales
function condicionesIniciales() {
    asignarTextoElemento('h1', '¡JUEGO DEL NUMERO SECRETO!'); // llamado de la función para el elemento 'h1'
    asignarTextoElemento('p', `Indica un numero del 1 al ${numerosMaxGenerar}`); // llamado de la función para el elemento 'p'
    numeroSecreto = generarNumeroSecreto();
    intentos = 1; //contador de intentos
}


// Asignar accion a un boton del codigo HTML
function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //seleccionar el valor agregado en la caja (input)
    
    //console.log(typeof(numeroDeUsuario))
    //console.log(`Num. usuario: ${numeroDeUsuario}`);

    //console.log(`Num. secreto: ${numeroSecreto}`);
    //console.log(numeroDeUsuario === numeroSecreto)

    if (numeroDeUsuario === numeroSecreto) { //si el usuario acierta el numero
        asignarTextoElemento('p', `Acertaste el número en ${intentos} ${(intentos === 1) ? 'solo intento' : 'intentos'}`);
        document.getElementById('reiniciar').removeAttribute('disabled'); //activar el boton con id="reiniciar"
    } else { //si el usuario no acierta el numero
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p', 'El numero secreto es menor!'); //llamar a la funcion con atributos
        } else {
            asignarTextoElemento('p', 'El numero secreto es mayor!');
        }
        intentos++ //sumar los intentos
        limpiarCaja(); // llamado de la funcion
    }
    return;
}


// Limpiar caja
function limpiarCaja() {
    let valorCaja = document.querySelector('#valorUsuario');
    valorCaja.value = '';
    //lo anterior se puede resumir asi: let valorCaja = document.querySelector('#valorUsuario').value = '';
}


// Reiniciar juego
function reiniciarJuego(){
    limpiarCaja();
    condicionesIniciales();
    document.querySelector('#reiniciar').setAttribute('disabled', 'true'); //deshabilita el boton id="reiniciar"
} 


// Llamada de la funcion
condicionesIniciales();