// Agregar las coordenadas de la empresa y un marcador
const empresaLat = 40.44300220170815;
const empresaLong = -3.6571807010585666;
const encuentrameButton = document.querySelector(".contacto-boton");

// Inicializamos el mapa
let map = L.map('map').setView([empresaLat, empresaLong], 15);

// Agregamos OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

L.marker([empresaLat, empresaLong]).addTo(map)
    .bindPopup('¡Hola! Aquí estamos.')
    .openPopup();

//Otenemos la ubicación del cliente
function ubiCliente() {

    //Comprobamos la presencia del geolocalizador:
    if ("geolocation" in navigator){
        
        //obtenemos la posición actual del cliente
        navigator.geolocation.getCurrentPosition((position) => {
            let clienteLat = position.coords.latitude;
            let clienteLong = position.coords.longitude;
            
            //Agregamos un marcador al cliente
            L.marker([clienteLat, clienteLong]).addTo(map)
                .bindPopup('Tu ubicación')
                .openPopup()   
            //Calculamos la ruta del cliente
            L.Routing.control({
                waypoints: [
                    L.latLng(empresaLat, empresaLong),
                    L.latLng(clienteLat, clienteLong)
                ],
                routeWhileDragging: true,
                language: 'es', //Cambiamos el idioma a Español
                showAlternatives: true, //Mostramos rutas alternas
                lineOptions: {styles: [{color: '#6FA1EC', weight: 5 }]}
            }).addTo(map);
        })


    } else {
        alert("No encontramos tu localización")
    }


}
//añadimos eventos para dinamizar
encuentrameButton.addEventListener("click", ubiCliente);