const {ipcRenderer} = require('electron')
const ipc = ipcRenderer

// -- Fechar e abrir página -- //
document.getElementById('minimize').addEventListener('click', minimizeWindow)
document.getElementById('close').addEventListener('click', closeWindow)

function closeWindow () {        
    ipc.send("close")
}

function minimizeWindow () {   
    ipc.send("minimize")
}
// -- Fechar e abrir página -- //

var calculado = document.getElementById("calculado"); // é o que mostra depois de algum operador ser clicado
var mostrado = document.getElementById("mostrado"); // é o que mostra o número que está sendo escrito
var calculadora = document.getElementById("calculadora-id"); // variável DOM que guarda todos os botões
var operar = 0; // para saber quando pode executar as operações
var primeiroValor;
var segundoValor;
var temp_operador = "";

function stripZeros(str) {
    return str.replace(/(^0+(?=\d))|(,?0+$)/g, '');
}

function formatacaoNum(x){
    if (x % 1 == 0){
        return parseInt(x);
    }
    return stripZeros(x.toFixed(7));
}

function escrever(num){
    if (mostrado.innerHTML == 0){ // se for zero o número que está lá, ele subistituirá esse valor com o digitado
        if (num == "."){
            mostrado.innerHTML = "0" + num;
        } else {
            mostrado.innerHTML = num;
        }
    } else { // caso contrário, só adciona o valor ao valor mostrado
        mostrado.innerHTML += num;
    }
}

function processoParaMostrar(operador){ // adciona coisas ao calculado, mais o operador utilizado. Mas primeiro verifica se há algo para ser adicionado
    if (mostrado.innerHTML != 0){ // esse if é para ver se tem alguma coisa escrita para adiconar em cima
        if (calculado.innerHTML == 0){ // se nada foi operado ainda, o calculado.innerHTML tem que pegar o que está digitado e colocar o operador.
            calculado.innerHTML = mostrado.innerHTML + operador;
        } else { // caso contrário, tem que pegar o que já tá lá, e somar com o mostrado.innerHTML e colocar o operador
            calculado.innerHTML += mostrado.innerHTML + operador; 
        }
        operar = 1 // variável que declara que na próxima vez que qualquer operador for utilizado, tem que ocorrer um cálculo
        mostrado.innerHTML = 0; // o que usuário digitou tem que ser zerado, para ele poder digitar outro valor.
    }
}

function calcularNumero(operador){ // para realizar a soma 
    if (operar == 0){ // lógica para ver se algum número já foi operado para ver se a operação deve ser realizada.
        primeiroValor = parseFloat(mostrado.innerHTML); /* aqui o valor que o usuário digitou, é guardado para ser usado mais tarde na soma. 
                                                      Fiz dessa forma (separando os calculos em duas variáveis) para não ter que 
                                                      separar os operadores, guardados na variável calculado, na hora de calcular. */
        processoParaMostrar(operador);
    } else { // se o númeo pode ser operado, o código passa para essa parte
        Calcular(temp_operador, false);
    }
    temp_operador = operador; // isso faz com que o operador temporário seja igual ao que usuário digitou, porém, só depois do cálculo já ter sido feito.
}

function decidirPrint(valor, igual){ // demonsta o cálculo própriamente dito, porém, se o "igual" foi pressionado, o calculado e coloca no mostrado o calulado
    if (igual == true){
        mostrado.innerHTML = formatacaoNum(valor);
        calculado.innerHTML = 0;
    } else { // caso contrário, o mostrado é zero (porque o úsuário deve cálcular o próximo valor a ser calculado)
        calculado.innerHTML = valor;
        mostrado.innerHTML = 0;
    }
    primeiroValor = calculado.innerHTML; // já adianta para a próxima operação ser realizada, fazendo com o que o Primeiro_valor seja o que for calculado.
}

function Calcular(temp_operador, igual){ //função resposável pelo cálculo própriamente dito (passa o penúltimo operador digitado, só para usar quando igual é usado)
    segundoValor = parseFloat(mostrado.innerHTML);
    switch(temp_operador){
        case "+":
            valor_local = parseFloat(primeiroValor) + parseFloat(segundoValor);
            decidirPrint(valor_local, igual);
            break;
        case "-":
            valor_local = parseFloat(primeiroValor) - parseFloat(segundoValor);        
            decidirPrint(valor_local, igual);
            break;
        case "/":
            valor_local = parseFloat(primeiroValor) / parseFloat(segundoValor);
            decidirPrint(valor_local, igual);
            break;
        case "*":
            valor_local = parseFloat(primeiroValor) * parseFloat(segundoValor);
            decidirPrint(valor_local, igual);
            break;
    }
}

calculadora.addEventListener("click", function(event){
    event.preventDefault();
    
    // primeiro, é necessário ver se o o que foi apertado na calculadora é um número
    if (isNaN(event.target.id[6]) == false || event.target.id[6] == "."){ /* se sim */
        escrever(event.target.id[6]);      
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
            case "quadrado":
                mostrado.innerHTML = formatacaoNum(parseFloat(mostrado.innerHTML)*parseFloat(mostrado.innerHTML));
                primeiroValor = parseFloat(mostrado.innerHTML);
                break;
            case "raiz":
                mostrado.innerHTML = formatacaoNum(Math.sqrt(mostrado.innerHTML));
                primeiroValor = parseFloat(mostrado.innerHTML);
                break;
            case "igual_a":
                Calcular(temp_operador, true)
                operar = 0;
                break;
        }
    }
})