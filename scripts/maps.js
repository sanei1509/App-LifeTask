// Variables globales
let map
let marker
let defaultUserLocation

// Constantes globales
const defaultLocation = { lat: -33.8688, lng: 151.2195 }

// Inicializacion del mapa
function initMap(location) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: location,
        zoom: 15,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    })

    // Creacion de caja de busqueda 
    const searchBox = new google.maps.places.SearchBox(
        document.getElementById('map-search-box')
    )

    hideLoader()

    // Debajo definimos 2 eventos de mapa
    // https://developers.google.com/maps/documentation/javascript/events

    // Acotar busquedas a los limites del mapa
    map.addListener('bounds_changed', () => {
        searchBox.setBounds(map.getBounds())
    })

    // Evento click para actualizar el marcador
    map.addListener('click', event => {
        console.log('click en mapa', event.latLng.lat(), event.latLng.lng())
        placeMarker(event.latLng)
    })

    // Evento cuando cambia la busqueda del usuario
    searchBox.addListener('places_changed', () => {
        // Obtencion de ubicaciones de la caja de busqueda
        const places = searchBox.getPlaces()

        if (places.length === 0) {
            return
        }

        const bounds = new google.maps.LatLngBounds()

        // Por cada ubicacion, se expanden los bounds del mapa
        places.forEach(place => {
            if (!place.geometry || !place.geometry.location) {
                console.info('El sitio retornado no tiene geometria')
                return
            }

            if (place.geometry.viewport) {
                bounds.union(place.geometry.viewport)
            } else {
                bounds.extend(place.geometry.location)
            }
        })

        map.fitBounds(bounds)
    })
}

// Dada una ubicacion, agrega un marcador en el mapa
function placeMarker(position) {
    // Borra el marcador previo si existe
    deleteMarker()

    // Crea un nuevo marcador
    marker = new google.maps.Marker({
        position: position,
        map: map
    })

    // Centramos el mapa en la nueva ubicacion
    map.panTo(position)
}

// Si habia un marcador agregado previamente, le desasigna el mapa
function deleteMarker() {
    if (marker) {
        marker.setMap(null)
        marker = null
    }
}

// Elimina el marcador actual y centra en la ubicacion por defecto disponible
function resetMap() {
    deleteMarker()

    if (defaultUserLocation) {
        map.panTo(defaultUserLocation)
    } else {
        map.panTo(defaultLocation)
    }
}

// Funcion invocada cuando google maps esta listo para ser utilizado
function googleMapsCallback() {
    // Si la geolocalizacion esta habilitada
    if (navigator.geolocation) {
        // Se obtiene la posicion actual y se usa como ubicacion inicial
        navigator.geolocation.getCurrentPosition(position => {
            // Almacenamos la ubicacion del usuario para ser utilizada posteriormente (reinicio del map)
            defaultUserLocation = { lat: position.coords.latitude, lng: position.coords.longitude }

            initMap(defaultUserLocation)
        }, error => { // Se utilizan las coordenadas por defecto si hay error
            console.error(error)
            initMap(defaultLocation)
        })
    } else {
        // Se utilizan las coordenadas por defecto si la geolocalizacion no esta activada
        initMap(defaultLocation)
    }
}
