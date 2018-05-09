window.onload = function () {
    var map = document.querySelector('.page-contacts__image');

    function initMap() {
        var coordinates = {lat: 59.938794, lng: 30.323087},
            markerImage = 'img/icon-map.svg',
            zoom = 17,

            map = new google.maps.Map(document.querySelector('.page-contacts__image'), {
                center: coordinates,
                zoom: zoom,
                disableDefaultUI: true,
                scrollwheel: false
            }),

            marker = new google.maps.Marker({
                position: coordinates,
                map: map,
                icon: markerImage,
                animation: google.maps.Animation.DROP
            });
    }

    if (map) {
        initMap();
    }
};