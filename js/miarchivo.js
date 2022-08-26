//Funcion constructor de Objeto Producto
function objetoProductos(){
    class Producto{
        constructor(id, tipo, marca, modelo, precio){
            this.id = id;
            this.tipo = tipo.toUpperCase();
            this.marca = marca.toUpperCase();
            this.modelo = modelo.toUpperCase();
            this.precio = Number(precio)
        }
        descripProd(){return `- ${this.tipo} ${this.marca} ${this.modelo} $${this.precio}`};
    }

    //Se crean algunos productos para mostrar en lista inicial y se pushean dentro del array de productos
    const prod1 = new Producto(1, "televisor", "philips", 'gf 43"', 85400);
    const prod2 = new Producto(2, "celular", "samsung", 'A32', 52300);
    const prod3 = new Producto(3, "tablet", "alcatel", 'M 10"', 38000)
    const prod4 = new Producto(4, "smartwatch", "xiaomi", 'miBand"', 14540)
    const listaProductos = [];
    listaProductos.push(prod1, prod2,prod3,prod4);
    return listaProductos
}

//Funcion constructor de Objeto Formas de Pago.
function objetoFormasPago(){
    class FormasPago{
        constructor(cant, descripcion, interes){
            this.cant = Number(cant);
            this.descripcion = descripcion.toLowerCase();
            this.interes = Number(interes)
        }
        descripProd(){return this.cant+" "+this.descripcion+" "+this.interes+"%"};
    }

    //Se crean algunas forma de pago y se pushean a la lista.
    const pago1 = new FormasPago(1, "pago con descuento de", -10);
    const pago2 = new FormasPago(3, "cuotas con interes de", 20);
    const pago3 = new FormasPago(6, "cuotas con interes de", 35);
    const pago4 = new FormasPago(12, "cuotas con interes de", 50);
    const listaFromasDePago = [];
    listaFromasDePago.push(pago1, pago2, pago3, pago4);
    return listaFromasDePago
}

//Funcion Evento click en boton comprar de cada producto
function clickCompra(){
    let botonComprar = document.getElementsByClassName("botonComprar")
    let compraFinal = []
    for(let i = 0 ; i < botonComprar.length ; i++){
        botonComprar[i].onclick = () => {compraFinal.push(i+1)}
    }
    return compraFinal
}

//Uso de innerTaxt para titulo
let titulo = document.getElementById("titulo")
titulo.innerText = "DESAFIO 6 - EVENTOS"

//Uso de innerHTML para agregar contenido a un contenedor
let container = document.getElementById("contenedor")
container.innerHTML = "<h2>SIMULADOR TIENDA HOT SALE</h2><p><b>Alumno:</b> Marcos A. Rubiolo<br><br><b>Comisión:</b>38275</p>"

//Uso de innerHTML para agregar contenido a un titulo
let bienvenida = document.getElementById("bienvenida")
bienvenida.innerHTML = "BIENVENIDO A NUESTRO HOT SALE !!!\nVEA NUESTRAS OFERTAS !!!"

//Llamo al boton VISITE TIENDA para poder usarlo
let ingresar = document.getElementById("ingresar")
let administrar = document.getElementById("administrador")

//Evento click en VISITE TIENDA ingresa a ver los productos
ingresar.onclick = () => {
    //Una vez que ingresa el boton VISITE TIENDA se desactiva
    ingresar.disabled = true;
    administrar.disabled = true;

    //Llamamos al contenedor div "Productos" para mostrarlos en DOM
    let productosDiv = document.getElementById("productos");
    const listaProductos = objetoProductos();
// Iteramos el array de productos y creamos nodos hijos dentro del div "Productos"
    for (const prod of listaProductos) {
        let list = document.createElement("p")
        list.innerHTML = `<p>${prod.descripProd()}</p><button class="botonComprar">COMPRAR</button>`
        productosDiv.appendChild(list)
    }

//Traemos el array con los id de los productos comprados
    let queCompro = clickCompra()

//Traigo el div "botonsalir" para crearle un boton que nos pérmita finalizar la compra
    let salirTienda = document.getElementById("botonsalir")
    let botonSalir = document.createElement("button")
    botonSalir.innerHTML = "FINALIZAR COMPRA"
    salirTienda.appendChild(botonSalir)
//se escucha el evento con la opcion .addEventListener()
    botonSalir.addEventListener("click", finalCompra)

//Funcion para trasformar el array de id comprados a un array con los productos comprados
    function finalCompra(){
        const compraFinal = [];
        for (const idCompra of queCompro) {
            let comProCompleto = listaProductos.find((el) => el.id == idCompra)
            compraFinal.push(comProCompleto)
        };

//Calcula el monto final de la compra
    let saldoAnterior = 0;
    const precioTotal = compraFinal.reduce((acc, elemento) => acc + elemento.precio, saldoAnterior);

//Llamamos al div "Muestra" para mostrar la compra en el DOM
    let productosDetalle = document.getElementById("muestra");
    productosDetalle.innerHTML = "<h3>DETALLE DE COMPRA</h3>"
//Iteramos el array de productos y creamos nodos hijos dentro del div "Productos"
        for (const prod of compraFinal) {
            let detalle = document.createElement("p")
            detalle.innerHTML = `<p>${prod.descripProd()}</p>`
            productosDetalle.appendChild(detalle)
        }

//Mostramos precio final    
        let montoFinal = document.createElement("p")
        montoFinal.innerHTML = `<b>Monto Final: $${precioTotal}</b>`
        productosDetalle.appendChild(montoFinal)
    }

}

//Ingreso al sector Administradores con boton administrador
administrar.onclick = () => {
    //Una vez que ingresa los botnes se desactivan
    ingresar.disabled = true;
    administrar.disabled = true;
    
    //Uso de innerHTML para agregar inputs de administracion
let loginAdmin = document.getElementById("loginAdmin")
loginAdmin.innerHTML ='<form action="" id="login"><input type="text" required placeholder="Usuario"><input type="password" required placeholder="Password"><input type="submit" value="Enviar"></form>'

//Recibo los datos del login
let rechazarLog = document.getElementById("login")
rechazarLog.addEventListener("submit", datosForm)
//Creo un alert sin sentido porque el resto del Programa se me rompio todo
function datosForm(e){
    e.preventDefault();
    let datos = e.target
    alert("Contraseña Incorrecta")
}
}