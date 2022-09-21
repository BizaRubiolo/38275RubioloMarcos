//Utilizo una API para obtener la ubicacion del Usuario
fetch("https://get.geojs.io/v1/ip/geo.json")
.then((respuesta) => respuesta.json())
.then((datalocal) => {
    
    //Hago destructuring para obtener los valores necesarios
    const {region, country} = datalocal

//Utilizo la API weatherstack para obtener informacion del clima de la ubicacion del Usuario
    fetch(`http://api.weatherstack.com/current?access_key=21caaa9e4d123a5d1d938d3d6d16652f&query=${region}`)
    .then((respuesta) => respuesta.json())
    .then((info) => {

        //Hago destructuring para obtener los valores necesarios
        const {location:{localtime}, current} = info
        const {temperature, weather_icons, feelslike, humidity, pressure, wind_speed, wind_dir} = current

        //Muestro en DOM los valores obtenidos
        let localUbic = document.getElementById("climalocal")
        localUbic.innerHTML = `<h4>${region}, ${country}, </h4>
                            <p>Hora Local: ${localtime}</p>
                            <h2>${temperature}°C, Sensación: ${feelslike}°C</h2>
                            <img id="iconoClima" src="${weather_icons[0]}">
                            <p>Humedad: ${humidity}%</p>
                            <p>Presión Atmosferica: ${pressure}hPa</p>
                            <p>Viento: ${wind_speed} km/h desde ${wind_dir}</p>`
    })

})

//Llamo al padre de las opciones de Paises
let opcionesPaises = document.getElementById("botonPais")

//Creo la funcion que Mostrara el clima de acuerdo al lugar elegido
function botonera(){

    //Con el onchange obtengo la opcion valuada
    let eleccion = document.getElementById("botonPais").value

    //Utilizo una API que me brinda 250 paises y sus principales caracteristicas
    fetch("https://restcountries.com/v3.1/all")
    .then((respuesta) => respuesta.json())
    .then((data) => { 

        //Hago destructuring utilizando solo el elemento elegido por el usuario
        const {capital, translations : {spa : {official}}, continents, flags:{png}, coatOfArms: {svg}} = data[eleccion]

        //Y usando nuevamente la API muestro el clima como lo hicimos con la ucicacion del usuario
        fetch(`http://api.weatherstack.com/current?access_key=21caaa9e4d123a5d1d938d3d6d16652f&query=${capital}`)
        .then((respuesta) => respuesta.json())
        .then((info) => {

            const {location:{localtime}, current} = info
            const {temperature, weather_icons, feelslike, humidity, pressure, wind_speed, wind_dir} = current

            let icono = document.getElementById("icono")
            icono.innerHTML = `<h4>${capital[0]}, ${official}, ${continents[0]}</h4>
                                <img id="bandera" src="${png}">
                                <img id="escudo" src="${svg}">
                                <p>Hora Local:   <b>${localtime}</b></p>
                                <h2>${temperature}°C, Sensación: ${feelslike}°C</h2>
                                <img id="iconoClima" src="${weather_icons[0]}">
                                <p>Humedad: ${humidity}%</p>
                                <p>Presión Atmosferica: ${pressure}hPa</p>
                                <p>Viento: ${wind_speed} km/h desde ${wind_dir}</p>`
        })
})
}
//Realizo el evento onchange para obtener la opcion que desea ver el Usuario
opcionesPaises.onchange = botonera