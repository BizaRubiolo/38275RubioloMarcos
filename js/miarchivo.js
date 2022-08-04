//Funcion menu de opciones productos
const menuProd = () => Number(prompt("Ingrese el codigo del producto que desea comprar: \n1. Televisor Philips 43pulg $85.400 \n2. Celular Samsung A32 $52.300 \n3. Tablet Alcatel 10pulg $38.000 \n4. Smartwatch Xiaomi $19.000 \n5. Auriculares Motorola $4.000"))

//Funcion menu de opciones Formas de pago
const menuPago = () => Number(prompt("En cuantas cuotas desea abonar: \n1)  Contado - Descuento 10% \n3)  3 Cuotas fijas - 10% interes\n6)  6 Cuotas fijas - 20% interes \n9)  9 Cuotas fijas - 35% interes \n12)  12 Cuotas fijas - 50% interes"))

//Funcion verificacion codigo Producto
function checkProd(valor){
while(valor !=1 && valor !=2 && valor !=3 && valor !=4 && valor !=5){
  alert("El codigo ingresado es invalido. Ingrese un codigo existente: ");
  valor = menuProd()
} return valor
}

//Funcion verificacion codigo Producto
function checkPago(valor){
while(valor !=1 && valor !=3 && valor !=6 && valor !=9 && valor !=12){
    alert("El numero de cuotas es invalido. Ingrese una cantidad existente: ");
    valor = menuPago()
} return valor
}

//Funcion elige precio
function comprarProd(dato){
    switch(dato){
        case 1:
            return 85400;
        case 2:
            return 52300;
        case 3:
            return 38000;
        case 4:
            return 19000;
        case 5:
            return 4000;
    }
}

//Funcion elige Forma de Pago
function pagarProd(cuotas, precio){
    switch(cuotas){
        case 1:
            return precio * 0.9;
        case 3:
            return precio * 1.1 / 3;
        case 6:
            return precio * 1.2 / 6;
        case 9:
            return precio * 1.35 / 9;
        case 12:
            return precio * 1.5 / 12;
    }
}

//Compra de los Productos
alert("BIENVENIDO A NUESTRO HOT SALE !!!\nVEA NUESTRAS OFERTAS !!!")
let precioParcial = comprarProd(checkProd(menuProd()));
let subTotal = precioParcial;
alert("El importe de su compra es de $" + subTotal);

let masProd = prompt("Desea continuar comprando? Si / No: ").toLowerCase();
while(masProd == "si"){
    let otraCompra = comprarProd(checkProd(menuProd()));
    subTotal += otraCompra;
    alert("El importe de su compra es de $" + subTotal);
    masProd = prompt("Desea continuar comprando? Si / No: ").toLowerCase();
}

//Elegir forma de Pago
let cantCuotas = checkPago(menuPago());
let precioPago = pagarProd(cantCuotas, subTotal).toFixed(2);

if(cantCuotas === 1){
    alert("Su importe final es de $" + precioPago);
} else{
    alert("Su importe final es de "+ cantCuotas + " cuotas de $" + precioPago);
}

alert("MUCHAS GRACIAS POR SU COMPRA !!!")