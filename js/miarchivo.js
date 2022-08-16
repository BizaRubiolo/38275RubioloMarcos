//Funcion menu de opciones Principal
const menuPrincipal = () => Number(prompt("Ingrese la opcion que desea realizar: \n1 - Ver productos disponibles y realizar una compra. \n2 - Modificacion de stock (Administradores).\n0 - Salir de la tienda"))

//Funcion verificacion opcion Menu Principal
function checkPrincipal(valor){
while(valor !=1 && valor !=2 && valor !=0){
    alert("La opcion no existe. Ingrese una opcion existente: ");
    valor = menuPrincipal()
} return valor
}

//Funcion descripciones de productos para mostrar
function descripcionesProd(lista){
    let descripMenu = []
    for (let elemento of lista){
        descripMenu.push(elemento.descripProd());
    }
    let muestra = descripMenu.join("\n");
    return muestra;
};

//Funcion menu de opciones productos
function menuProd(dato){
    let elegirOp = prompt(dato);
    return elegirOp
};

//Funcion menu de opciones Formas de pago
const menuPago = () => Number(prompt("En cuantas cuotas desea abonar: \n1)  Contado - Descuento 10% \n3)  3 Cuotas fijas - 10% interes\n6)  6 Cuotas fijas - 20% interes \n9)  9 Cuotas fijas - 35% interes \n12)  12 Cuotas fijas - 50% interes"))

//Funcion verificacion codigo Producto
function checkProd(valor, maximo){
while(valor < 1 || valor > maximo){
  alert("El codigo ingresado es invalido. Ingrese un codigo existente: ");
  valor = menuProd(descripcionesProd(listaProductos));
} return valor
}

//Funcion verificacion codigo Forma de Pago
function checkPago(valor){
while(valor !=1 && valor !=3 && valor !=6 && valor !=9 && valor !=12){
    alert("El numero de cuotas es invalido. Ingrese una cantidad existente: ");
    valor = menuPago()
} return valor
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

//Constructor de Objeto Producto
class Producto{
    constructor(id, tipo, marca, modelo, precio){
        this.id = id;
        this.tipo = tipo.toUpperCase();
        this.marca = marca.toUpperCase();
        this.modelo = modelo.toUpperCase();
        this.precio = Number(precio)
    }
    descripProd(){return this.id+". "+this.tipo+". "+this.marca+". "+this.modelo+". "+"$" + this.precio}
}

//Se crean algunos productos para mostrar en lista inicial y se pushean dentro del array de productos
const prod1 = new Producto(1, "televisor", "philips", 'gf 43"', 85400);
const prod2 = new Producto(2, "celular", "samsung", 'A32', 52300);
const prod3 = new Producto(3, "tablet", "alcatel", 'M 10"', 38000)
const listaProductos = [];
listaProductos.push(prod1);
listaProductos.push(prod2);
listaProductos.push(prod3);

//Bienvenida y Menu de Opciones Principal
alert("BIENVENIDO A NUESTRO HOT SALE !!!\nVEA NUESTRAS OFERTAS !!!");

let opcionPrincipal = checkPrincipal(menuPrincipal());

while(opcionPrincipal != 0){
    if (opcionPrincipal === 1){

        //Compra de los Productos. Genera un nuevo array (compraParcial) con el  Id de los productos comprados.
        let compraProd = checkProd(menuProd(descripcionesProd(listaProductos)), listaProductos.length);
        const compraParcial = [];
        compraParcial.push(compraProd);

        let masProd = prompt("Desea continuar comprando? Si / No: ").toLowerCase();

        while(masProd == "si"){
        compraProd = checkProd(menuProd(descripcionesProd(listaProductos)), listaProductos.length);
        compraParcial.push(compraProd);
        masProd = prompt("Desea continuar comprando? Si / No: ").toLowerCase();
        };

        //Utilizando el array con Id de productos comprados, generamos uno nuevo con todas las propiedades de los mismos.
        const compraFinal = [];
        let j = 0;
        for (let i = 0; i < compraParcial.length; i++){
            j = compraParcial[i] - 1;
            compraFinal.push(listaProductos[j])
        };
        alert("DETALLE DE LA COMPRA \n" + descripcionesProd(compraFinal))

        //Calcula el monto final
        let precioTotal = 0;
        for (const valor of compraFinal) {
            precioTotal += valor.precio;
        };
        alert("EL MONTO TOTAL DE LA COMPRA ES: \n$" + precioTotal)

        //Elegir forma de Pago
        let cantCuotas = checkPago(menuPago());
        let precioPago = pagarProd(cantCuotas, precioTotal).toFixed(2);

        if(cantCuotas === 1){
            alert("Su importe final es de $" + precioPago);
        } else{
            alert("Su importe final es de "+ cantCuotas + " cuotas de $" + precioPago);
        }

        alert("MUCHAS GRACIAS POR SU COMPRA !!!")
        //Una vez realizada la compra no se le permite seguir comprando ni cargar productos.
        break
    } 
    // Opcion para agregar productos al stock.
     else if (opcionPrincipal === 2) {
        let cargarProd
        do{
            let tipo = prompt("Ingresa el tipo de producto")
            let marca = prompt("Ingresa la marca del producto")
            let modelo = prompt("Ingresa el modelo del producto")
            let precio = prompt("Ingresa el precio del producto")
            let id = listaProductos.length + 1;
            listaProductos.push(new Producto(id, tipo, marca, modelo, precio));
            cargarProd = prompt("Desea cargar otro producto? Si/No ").toLowerCase();
        } while(cargarProd === "si");

        alert("NUEVO STOCK DE LA TIENDA \n" + descripcionesProd(listaProductos));
    } 
    //Despues de la carga se le vuelve a mostrar el menu de opciones principal
    opcionPrincipal = checkPrincipal(menuPrincipal());
};

alert("MUCHAS GRACIAS POR SU VISITA!!\nLO ESPERAMOS PRONTO!!")