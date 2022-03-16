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
var escrito;
var resultado = document.getElementById("resul")
var operado = document.getElementById("operado")

function escreveBotao(valor,resultado){
    escrito = resultado.innerHTML;
    if (resultado.innerHTML == "0") {
        resultado.innerHTML = valor
    } else {
        resultado.innerHTML = escrito + valor
    }
}

function escreveOperacao(valor,resultado,operado){
    escrito = resultado.innerHTML;
    operado_escrito = operado.innerHTML
    if (resultado.innerHTML != "0"){
        console.log(operado.innerHTML)
        console.log(operado_escrito)
        if (operado.innerHTML != "0"){
            operado.innerHTML = operado_escrito +  escrito + valor   
        } else {
            operado.innerHTML = escrito + valor
        }
        resultado.innerHTML = 0
    } 
}

document.getElementById("calculadora-id").addEventListener("click",function(event){
    console.log(event.target.id[6])
    if (isNaN(event.target.id[6]) != true){
        escreveBotao(event.target.id[6],resultado)
    } else {
        switch (event.target.id){
            case "clear":
                resultado.innerHTML = "0";
                operado.innerHTML = "0";
                break
            case "igual_a":
                escreveOperacao("", resultado, operado)
                resultado.innerHTML = "0"
                break
            case "somar":
                escreveOperacao("+", resultado, operado)
                break
            case "dividir":
                escreveOperacao("÷", resultado, operado)
                break
            case "multiplicar":
                escreveOperacao("*", resultado, operado)
                break
            case "subtrair":
                escreveOperacao("-", resultado, operado)
                break
        }
    }
})