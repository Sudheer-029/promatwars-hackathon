// services/firebaseService.js
// Firebase Mock Wrapper - demonstrates Pub/Sub logic



const firebaseService = {
    listeners: [],
    
    // Simulate init app and subscribe to a firestore collection
    initLiveListeners(callback) {
        console.log("[Firebase] Listening to /venues/STADIUM_789/liveStatus");
        this.listeners.push(callback);
        
        // Push initial state
        callback(liveStatus);

        // Simulate reactive backend updates
        setInterval(() => {
            // E.g., someone clears the incident
            if(Math.random() > 0.8 && liveStatus.incidents.length > 0) {
                liveStatus.incidents.pop();
                console.log("[Firebase] Incident cleared from backend");
                this.notifySubscribers();
            }
        }, 45000);
    },

    notifySubscribers() {
        this.listeners.forEach(cb => cb(liveStatus));
    },

    // Simulate writing to firestore (Ops view usage)
    triggerAlert(message, zone) {
        liveStatus.incidents.push({
            id: 'manual_' + Date.now(),
            zone: zone,
            type: 'manual',
            alert: message
        });
        console.log(`[Firebase] POST to /incidents: ${message}`);
        this.notifySubscribers();
    }
};
