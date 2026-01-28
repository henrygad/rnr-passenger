export const googleMapStyle = [
    {
        // Keeps landmarks visible but subtle
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }, { visibility: "on" }],
    },
    {
        // FORCING NEIGHBORHOOD NAMES (This makes "Area 8" or "Opic Estate" show)
        featureType: "administrative.neighborhood",
        elementType: "labels.text",
        stylers: [{ visibility: "on" }, { weight: 2 }]
    },
    {
        // HIGHLIGHT BUS STOPS (Crucial for RNR Agbara-Mile 2 corridor)
        featureType: "transit.station.bus",
        elementType: "labels.icon",
        stylers: [{ visibility: "on" }, { saturation: 50 }, { scale: 1.2 }],
    },
    {
        // HIGHWAY GEOMETRY (Badagry Expressway)
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#ffffff" }, { weight: 4 }],
    },
    {
        // FORCE LOCAL STREET NAMES (This is for Road 808)
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ visibility: "on" }, { color: "#212121" }, { weight: 6 }],
    },
    {
        // Make sure all road labels are forced to "on"
        featureType: "road",
        elementType: "labels",
        stylers: [{ visibility: "on" }],
    },
    {
        // Water styling for the Badagry creek/coastline
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#c9e3ff" }],
    },
    {
        // Clean up greenery to reduce distraction from roads
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#e5e5e5" }],
    }
];