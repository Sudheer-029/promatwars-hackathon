// services/geminiService.js
// Abstracting the Gemini API calls.
// Converts the raw user text + structured venue data into a context-aware prompt.



const geminiService = {
    async askAssistant(userQuery) {
        console.log(`[Gemini API] Request: "${userQuery}"`);
        const state = getAppState();
        
        // Simulating network delay and response generation based on context
        return new Promise(resolve => {
            setTimeout(() => {
                const query = userQuery.toLowerCase();
                let response = "";

                if (query.includes("restroom") || query.includes("bathroom")) {
                    const best = routingService.getOptimalRestroom(state.accessibilityNeeded);
                    if(best) {
                        response = `Based on live camera data, I recommend **${best.name}**. The wait is only about **${best.queueTime} minutes**, and it's free of congestion.`;
                        if(window.showGoogleMapsRoute) window.showGoogleMapsRoute(best.name);
                    } else {
                        response = "All restrooms are currently busy. It might be best to wait a few minutes.";
                    }
                } else if (query.includes("food") || query.includes("hungry") || query.match(/\beat\b/)) {
                    const best = routingService.getOptimalFood();
                    response = `Your fastest food option is **${best.name}** at ${best.location}. The queue is currently **${best.queueTime} minutes**.`;
                    if(window.showGoogleMapsRoute) window.showGoogleMapsRoute(best.name);
                } else if (query.includes("seat")) {
                    const section = venueData.sections.find(s => s.id === state.targetSeatId);
                    const sectionName = section ? section.name : "your section";
                    const gateId = section ? section.closestGate : null;
                    const gateObj = gateId ? venueData.zones.find(z => z.id === gateId) : null;
                    const gateName = gateObj ? gateObj.name : "the nearest concourse";
                    
                    response = `The fastest route to **${sectionName}** from your location is directly through **${gateName}**. Live sensors show that path is currently flowing smoothly!`;
                    if(window.showGoogleMapsRoute) window.showGoogleMapsRoute(sectionName);
                } else if (query.includes("gate") || query.includes("congested")) {
                    const gateData = routingService.getGateRecommendation(state.currentZoneId);
                    if(gateData.status === 'congested' && gateData.alternate) {
                        response = `Your current gate is highly congested! Switch to **${gateData.alternate.name}** to save time. It has much lower foot traffic right now.`;
                    } else {
                        response = "Your current gate looks clear. Keep proceeding as normal.";
                    }
                } else {
                    const currentZoneObj = venueData.zones.find(z => z.id === state.currentZoneId) || {name: state.currentZoneId};
                    response = `I see you are at ${currentZoneObj.name}. StadiumFlow AI has detected the current game state is ${liveStatus.gameContext.status}. Stay close to your seat for the next 15 minutes to avoid peak crowds.`;
                }

                console.log(`[Gemini API] Response generated`);
                resolve(response);
            }, 800); // 800ms mock latency
        });
    }
};
