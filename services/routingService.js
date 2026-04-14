// services/routingService.js
// Abstracting distance, time, and accessible routing logic.
// In a real app, this would query Google Maps Directions API or a custom indoor routing engine.



const routingService = {
    // Finds the best restroom based on queue time + distance penalty
    getOptimalRestroom(accessibleRequired) {
        let best = null;
        let lowestScore = 999; // Score = queueTime + (simulated distance / 10)

        venueData.restrooms.forEach(rr => {
            if (accessibleRequired && !rr.accessible) return;
            
            const queueTime = liveStatus.queues[rr.id] || 0;
            // Mock distance penalty
            const distancePenalty = Math.floor(Math.random() * 5); 
            const score = queueTime + distancePenalty;

            if (score < lowestScore) {
                lowestScore = score;
                best = { ...rr, queueTime, distancePenalty };
            }
        });
        return best;
    },

    getOptimalFood() {
        let best = null;
        let lowestQueue = 999;
        
        venueData.foodCourts.forEach(food => {
            const queueTime = liveStatus.queues[food.id] || 0;
            if (queueTime < lowestQueue) {
                lowestQueue = queueTime;
                best = { ...food, queueTime };
            }
        });
        return best;
    },

    // Suggests alternate gate if current one is congested
    getGateRecommendation(currentGateId) {
        let currentDensity = liveStatus.crowdDensity[currentGateId] || 0;
        if (currentDensity < 50) return { status: 'good' }; // stay here

        let alternate = null;
        let lowest = currentDensity;

        venueData.zones.filter(z => z.type === 'entry').forEach(g => {
            if (g.id === currentGateId) return;
            let den = liveStatus.crowdDensity[g.id] || 0;
            if (den < lowest) {
                lowest = den;
                alternate = g;
            }
        });

        if (alternate) {
            return { status: 'congested', alternate, savings: currentDensity - lowest };
        }
        return { status: 'congested', msg: 'All gates are currently busy.' };
    }
};
