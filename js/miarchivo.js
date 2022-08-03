let valor = Number(prompt("App para sumar!! Ingrese su primer valor: "));
let resultado = 0;
do{
    resultado = resultado + valor;
    valor = Number(prompt("Ingrese el valor que desea sumar a "+resultado+ ". Para finalizar ingrese cero."));
}while (valor != 0)
alert("Usted a finalizado su suma. El resultado final es: "+ resultado);

let repet = Number(prompt("App para desear Feliz Cumpleaños. Uno por cada año que cumpla. Ingrese su nueva edad: "));
for (let i = 1 ; i <= repet ; i++){
    alert("FELIZ CUMPLEAÑOS " + i + " !!!");
};