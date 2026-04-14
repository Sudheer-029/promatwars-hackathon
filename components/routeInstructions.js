// components/routeInstructions.js
// Handles the simulated Google Maps Directions API turn-by-turn logic.

function showGoogleMapsRoute(destinationName, steps) {
    const container = document.getElementById('google-maps-instructions');
    const ul = document.getElementById('routing-steps');
    
    if (!container || !ul) return;
    
    container.style.display = 'block';
    
    // Simulated Coordinates for the Stadium
    const locations = {
        start: { lat: 40.8120, lng: -74.0735 }, // Default start (Gate B)
        destinations: {
            "Pizza Hut East": { lat: 40.8125, lng: -74.0725, icon: "🍔" },
            "Restroom North": { lat: 40.8135, lng: -74.0740, icon: "🚻" },
            "Restroom South": { lat: 40.8115, lng: -74.0730, icon: "🚻" },
            "Section 101": { lat: 40.8130, lng: -74.0740, icon: "101" },
            "Section 102": { lat: 40.8130, lng: -74.0730, icon: "102" }
        }
    };

    // Find requested destination coordinates, fallback to North Concourse
    const destData = locations.destinations[destinationName] || { lat: 40.8130, lng: -74.0735, icon: "📍" };

    // Dynamically generate logical routing steps
    steps = [
        "Exit your current zone and head North toward the main concourse.",
        `Continue straight for 45 meters.`,
        `Turn towards the ${destinationName} concourse. Your destination will be clearly marked.`
    ];

    ul.innerHTML = '';
    steps.forEach((step, index) => {
        const li = document.createElement('li');
        li.style.marginBottom = "8px";
        li.innerHTML = `<strong>${index + 1}.</strong> ${step}`;
        ul.appendChild(li);
    });

    // Render Genuine Google Map Canvas
    setTimeout(() => {
        if (window.google && window.google.maps) {
            const mapEl = document.getElementById('google-map-embed');
            if(mapEl) {
                // Determine center midway between start and destination
                const centerLat = (locations.start.lat + destData.lat) / 2;
                const centerLng = (locations.start.lng + destData.lng) / 2;
                
                const map = new google.maps.Map(mapEl, {
                    zoom: 18,
                    center: { lat: centerLat, lng: centerLng },
                    mapTypeId: 'satellite',
                    disableDefaultUI: true,
                });

                // Add Start Marker
                new google.maps.Marker({ position: locations.start, map, label: {text: "Start", color: "black", fontWeight: "bold"}, title: "Your Location" });
                // Add Destination Marker
                new google.maps.Marker({ position: {lat: destData.lat, lng: destData.lng}, map, label: {text: destData.icon, fontSize: "20px"}, title: destinationName });

                // Draw a dynamic Polyline linking start point to destination
                // Adds a slight curve/midpoint to simulate walking around a concourse block
                const routeCoords = [
                    locations.start,
                    {lat: (locations.start.lat + destData.lat) / 2, lng: locations.start.lng }, // Walk North first
                    {lat: destData.lat, lng: destData.lng} // Turn sideways to destination
                ];
                
                const routePath = new google.maps.Polyline({
                    path: routeCoords,
                    geodesic: true,
                    strokeColor: '#10b981', // Neon green route
                    strokeOpacity: 1.0,
                    strokeWeight: 6
                });
                routePath.setMap(map);
            }
        }
    }, 100);
}

function hideGoogleMapsRoute() {
    const container = document.getElementById('google-maps-instructions');
    if (container) container.style.display = 'none';
}
