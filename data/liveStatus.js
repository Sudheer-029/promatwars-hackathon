// data/liveStatus.js
// Conceptually, this represents the Firestore document data reflecting live sensors / cameras.

const liveStatus = {
    // 0 to 100 scale showing crowd density
    crowdDensity: {
        "gate_a": 85, // Very high
        "gate_b": 20, // Low
        "gate_c": 55, // Medium
        "concourse_north": 90, // Congested!
        "concourse_east": 30
    },
    // Approximated wait times in minutes
    queues: {
        "food_north": 25,
        "food_east": 5,
        "food_west": 12,
        "rr_n": 15,
        "rr_s": 2,
        "rr_e": 3
    },
    incidents: [
        { 
            id: "inc_1", 
            zone: "concourse_north", 
            type: "spill", 
            alert: "Caution: Large spill near Section 101. Cleaning crew dispatched." 
        }
    ],
    gameContext: {
        status: "halftime", // pre_game, q1, q2, halftime, q3, q4, post_game
        timeRemainingMins: 15
    }
};

// Simulate random fluctuations in queue times every 30 seconds for a "live" feel
// In a real app, this would be updated via firebase listeners
setInterval(() => {
    liveStatus.queues.food_east = Math.floor(Math.random() * 15) + 1;
    liveStatus.crowdDensity.gate_b = Math.floor(Math.random() * 50) + 10;
}, 30000);
