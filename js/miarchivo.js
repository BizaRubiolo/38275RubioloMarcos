//Constructor de Objeto Producto
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
const prod3 = new Producto(3, "tablet", "alcatel", 'M 10"', 38000);
const prod4 = new Producto(4, "smartwatch", "xiaomi", 'miBand"', 14540);
const listaProductos = [];
listaProductos.push(prod1, prod2,prod3,prod4);

localStorage.setItem("productos", JSON.stringify(listaProductos))
let muestra = JSON.parse(localStorage.getItem('productos'))

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
titulo.innerText = "DESAFIO 8 - OPERADORES AVANZADOS"

//Uso de innerHTML para agregar contenido a un contenedor
let container = document.getElementById("contenedor")
container.innerHTML = "<h2>SIMULADOR TIENDA HOT SALE</h2><p><b>Alumno:</b> Marcos A. Rubiolo<br><br><b>Comisión:</b>38275</p>"

//Uso de innerHTML para agregar contenido a un titulo
let bienvenida = document.getElementById("bienvenida")
bienvenida.innerHTML = "BIENVENIDO A NUESTRO HOT SALE !!!\nVEA NUESTRAS OFERTAS !!!"

//Llamo al boton VISITE TIENDA para poder usarlo
let ingresar = document.getElementById("ingresar")
let administrar = document.getElementById("administrador")


//INTERACCION CON DOM
//Traigo Botones Principales y el form para Agregar Productos
let agregarProductos = document.getElementById("agregarProductos");
// let verStock = document.getElementById("verStock");
let formProductos = document.getElementById("formProductos");


// //EVENTOS Y FUNCIONES
// Evento click para cuando quiera ingresar a agregar productos
agregarProductos.addEventListener("click", nuevoProducto)

function nuevoProducto(){
    //Se deshabilita el boton presionado dejando el otro activo
    agregarProductos.disabled = true;
    // verStock.disabled = false;
    //Traigo el form de los productos para crearle contenido
    formProductos.innerHTML = `<label for="">Tipo de Producto:</label>
                                <input type="text" name="tipo" id="tipoProd" required>
                                <label for="">Marca:</label>
                                <input type="text" name="marca" id="marcaProd"required>
                                <label for="">Modelo:</label>
                                <input type="text" name="modelo" id="modeloProd"required>
                                <label for="">Precio:</label>
                                <input type="number" name="precio" id="precioProd"required>
                                <input type="submit" value="GUARDAR PRODUCTO" id="botonAgregar">`

    let tipoProd = formProductos.children[1].value;
    let marcaProd = formProductos.children[3].value;
    let modeloProd = formProductos.children[5].value;
    let precioProd = formProductos.children[7].value;

    //Evento Submit para tomar datos del formulario
    formProductos.addEventListener('submit', crearProducto)

    //Funcion para validar los datos ingresados por formulario
    function validarForm() {
        tipoProd = formProductos.children[1].value;
        marcaProd = formProductos.children[3].value;
        modeloProd = formProductos.children[5].value;
        precioProd = formProductos.children[7].value;
    }

    //Funcion relacionada con el evento Submit del formulario
    function crearProducto(e){
        e.preventDefault()
        validarForm();


        // Creo dos funciones para poder utilizar en el OPERADOR TERNARIO y reemplazar el IF anterior
        function aprobado(){
            let datos = e.target
            listaProductos.push(new Producto((listaProductos.length)+1, tipoProd, marcaProd, modeloProd, precioProd))
            formProductos.reset();
        } 
        function cancelado (){
            alert("La carga del producto se ha Cancelado")
            formProductos.reset();
        }
        //Genero la condicion desde un confirm
        let aprobar = confirm(`El producto a cargar es: ${tipoProd} ${marcaProd} ${modeloProd} $${precioProd}`)
        
        //OPERADOR TERNARIO
        aprobar ? aprobado() : cancelado()

    localStorage.setItem("productos", JSON.stringify(listaProductos))
    muestra = JSON.parse(localStorage.getItem('productos'))  
    ingresar.disabled = false;
    }
   
} 

//Evento click en VISITE TIENDA ingresa a ver los productos
ingresar.onclick = () => {
    //Una vez que ingresa el boton VISITE TIENDA se desactiva
    ingresar.disabled = true;
    // administrar.disabled = true;

    //Llamamos al contenedor div "Productos" para mostrarlos en DOM
    let productosDiv = document.getElementById("productos");
    // const listaProductos = objetoProductos();


// Iteramos el array de productos y creamos nodos hijos dentro del div "Productos"
    for (const prod of muestra) {

        list = document.createElement("p")
        // list.innerHTML = `<p>${prod.descripProd()}</p><button class="botonComprar">COMPRAR</button>`
        productosDiv.appendChild(list);
        list.innerHTML = `-<h4>${prod.tipo}</h4>
                            <p class="pProd">${prod.marca} ${prod.modelo} </p>
                            <b> $${prod.precio} + Iva</b>
                            <button class="botonComprar">COMPRAR</button><br><br><br>
                            `
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
            let comProCompleto = muestra.find((el) => el.id == idCompra)
            compraFinal.push(comProCompleto)
        };


//DESESTRUCTURACION Y SPREAD OPERATOR
//Al array de productos comprados lo desestructuro para obtener solo su precio y luego con spread creo una copia
// y le agrego una nueva propiedad con el precio mas IVA.
// No es muy prolijo pero es mas que todo para practicar lo visto en clases.
        let precioIva = null
        let compraIva = []
        for (const datos of compraFinal) {
            const {precio} = datos
            precioIva = {
                ...datos,
                precioMasIva : precio * 1.21,
            }
            compraIva.push(precioIva)
        } 
        console.log(compraFinal)
        console.log(compraIva)



//Calcula el monto final de la compra
    let saldoAnterior = 0;
    const precioTotal = compraIva.reduce((acc, elemento) => acc + elemento.precioMasIva, saldoAnterior);

//Llamamos al div "Muestra" para mostrar la compra en el DOM
    let productosDetalle = document.getElementById("muestra");
    productosDetalle.innerHTML = "<h3>DETALLE DE COMPRA</h3>"
//Iteramos el array de productos y creamos nodos hijos dentro del div "Productos"
        for (const prod of compraIva) {
            let detalle = document.createElement("div")
            detalle.innerHTML = `-<h4>${prod.tipo}</h4>
                                <p>${prod.marca} ${prod.modelo} </p>
                                <b> $${prod.precioMasIva} (Iva Incluido)</b><br><br>`
            productosDetalle.appendChild(detalle)
        }

//Mostramos precio final    
        let montoFinal = document.createElement("p")
        montoFinal.innerHTML = `<b>Monto Final: $${precioTotal} (Iva Incluido)</b>`
        productosDetalle.appendChild(montoFinal)
    }

} 