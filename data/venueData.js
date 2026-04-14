// data/venueData.js
// Simulates the static mapping of a venue, replacing what would typically be a database query or Google Maps venue layout.

const venueData = {
    metadata: {
        stadiumId: "STADIUM_789",
        name: "Grand Finale Arena",
        capacity: 65000
    },
    zones: [
        { id: "gate_a", name: "Gate A (North)", type: "entry" },
        { id: "gate_b", name: "Gate B (East)", type: "entry" },
        { id: "gate_c", name: "Gate C (West)", type: "entry" }
    ],
    sections: [
        { id: "sec_101", name: "Section 101", closestGate: "gate_a" },
        { id: "sec_102", name: "Section 102", closestGate: "gate_b" },
        { id: "sec_201", name: "Section 201", closestGate: "gate_c" }
    ],
    foodCourts: [
        { id: "food_north", name: "Burger Zone North", location: "North Concourse" },
        { id: "food_east", name: "Pizza Hut East", location: "East Wing" },
        { id: "food_west", name: "Wings West", location: "West Wing" }
    ],
    restrooms: [
        { id: "rr_n", name: "Restroom North", accessible: true },
        { id: "rr_s", name: "Restroom South", accessible: false },
        { id: "rr_e", name: "Restroom East", accessible: true }
    ],
    // A simplified graph representing walking distance between nodes
    routes: {
        "gate_a_to_sec_101": { distanceMeters: 50, accessible: true },
        "gate_a_to_sec_102": { distanceMeters: 200, accessible: true },
        "sec_101_to_food_north": { distanceMeters: 30, accessible: true },
        "sec_101_to_rr_n": { distanceMeters: 40, accessible: true },
        "sec_102_to_rr_s": { distanceMeters: 80, accessible: false } // stairs only
    }
};
