/* TODO
    ALGORITMO PARA ENTENDER A SOMA E DIVISÃO
    CONSERTAR DIVISÃO, QUE ADICIONA AO OPERADO.INNERHTML MESMO QUANDO É ZERO
*/
// -- Fechar e abrir página -- //
const {ipcRenderer} = require('electron')
const ipc = ipcRenderer

document.getElementById('minimize').addEventListener('click', minimizeWindow)
document.getElementById('close').addEventListener('click', closeWindow)

function closeWindow () {        
    ipc.send("close")
}

function minimizeWindow () {   
    ipc.send("minimize")
}
// -- Fechar e abrir página -- //

calculado = document.getElementById("calculado"); // é o que mostra depois de algum operador ser clicado
mostrado = document.getElementById("mostrado"); // é o que mostra o número que está sendo escrito
calculadora = document.getElementById("calculadora-id"); // variável que guarda todos os botões
var operar = 0; // para saber quando pode executar as operações
var primeiroValor;
var segundoValor;
var temp;

function escreverNúmero(num){
    if (mostrado.innerHTML == 0){ // se for zero o número que está lá, ele subistituirá esse valor com o digitado
        mostrado.innerHTML = num;
    } else { // caso contrário, só adciona o valor ao valor mostrado
        mostrado.innerHTML += num;
    }
}

function processoParaMostrar(operador){
    if (mostrado.innerHTML != 0){ // esse if é para ver se tem alguma coisa escrita para adiconar em cima
        if (calculado.innerHTML == 0){ // mesma lógica do de cima, só que com o operador aparecendo também
            calculado.innerHTML = mostrado.innerHTML + operador;
        } else {
            calculado.innerHTML += mostrado.innerHTML + operador;
        }
        operar = 1
    }
}

function calcularNumero(operador){
    if (operar == 0){
        primeiroValor = parseInt(mostrado.innerHTML);
        processoParaMostrar(operador);
        mostrado.innerHTML = 0;
    } else {
        segundoValor = parseInt(mostrado.innerHTML);
        calculado.innerHTML = parseInt(primeiroValor) + parseInt(segundoValor);
        primeiroValor = calculado.innerHTML;
        mostrado.innerHTML = 0;
    }
    console.log("Primeiro número: " + primeiroValor);
    console.log("Segundo número: " + segundoValor);
}

function calcularIgual(){ // esse é reponsável por calcular quando o operador igual é acionado
    //let operado = calculado.innerHTML[calculado.innerHTML.length - 1];
    if (operar == 1){
        // do thing
    } else {
        // else thing
    }operar = 0;
}

calculadora.addEventListener("click", function(event){
    event.preventDefault();

    if (isNaN(event.target.id[6]) == false){ // ve se o o que foi apertado na parte da calculadora é um número
        escreverNúmero(event.target.id[6]);      
    } else { // caso contrário, tenta ver qual operador foi acionado
        switch (event.target.id){
            case "clear": // caso o C tenha sido clicado
                mostrado.innerHTML = 0;
                calculado.innerHTML = 0;
                operar = 0;
                break;
            case "somar": // caso o SOMAR tenha sido clicado
                calcularNumero("+");
                break;
            case "dividir":
                calcularNumero("/");
                break;
            case "multiplicar":
                calcularNumero("*");
                break;
            case "subtrair":
                calcularNumero("-");
                break;
            case "igual_a":
                calcularIgual();
                operar = 0;
                break;
        }
    }
})