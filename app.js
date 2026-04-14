// app.js
// Main Application orchestrator handling view switching, initialization, and importing components



document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    console.log("StadiumFlow AI booting up...");
    
    // Simulate real-world start: initialize "Firebase" listener to sync mocked live status updates
    firebaseService.initLiveListeners(handleLiveUpdates);

    // Setup UI listeners
    setupViewSwitchers();
    setupFanForm();
    
    // Setup components
    setupAssistant();
    
    // Initial Render
    forceRenderCycle();
}

function handleLiveUpdates(data) {
    // This callback is triggered conceptually whenever Firestore detects a change pushed from venue sensors.
    console.log("Live update received from Firebase sync:", data);
    forceRenderCycle();
}

function forceRenderCycle() {
    renderQueuePanel();
    renderMapView();
    renderOpsDashboard();
    renderAlerts();
}

function setupViewSwitchers() {
    const btnFan = document.getElementById('btn-fan-view');
    const btnOps = document.getElementById('btn-ops-view');
    const fanView = document.getElementById('fan-view');
    const opsView = document.getElementById('ops-view');

    btnFan.addEventListener('click', () => {
        btnFan.classList.add('active');
        btnOps.classList.remove('active');
        fanView.style.display = 'block';
        opsView.style.display = 'none';
    });

    btnOps.addEventListener('click', () => {
        btnOps.classList.add('active');
        btnFan.classList.remove('active');
        opsView.style.display = 'block';
        fanView.style.display = 'none';
        renderOpsDashboard(); // Re-render for freshness
    });
}

function setupFanForm() {
    const zoneSelect = document.getElementById('current-zone');
    const seatSelect = document.getElementById('seat-section');
    
    // Populate dropdowns from venueData
    venueData.zones.forEach(zone => {
        const option = document.createElement('option');
        option.value = zone.id;
        option.textContent = zone.name;
        zoneSelect.appendChild(option);
    });

    venueData.sections.forEach(sec => {
        const option = document.createElement('option');
        option.value = sec.id;
        option.textContent = sec.name;
        seatSelect.appendChild(option);
    });

    // Re-render intelligent routes when context changes
    zoneSelect.addEventListener('change', () => forceRenderCycle());
    seatSelect.addEventListener('change', () => forceRenderCycle());
    document.getElementById('toggle-accessibility').addEventListener('change', () => forceRenderCycle());
}

// Expose state globally for easy access by modular components (simulating a global store like Redux/Context)
const getAppState = () => {
    return {
        currentZoneId: document.getElementById('current-zone').value,
        targetSeatId: document.getElementById('seat-section').value,
        accessibilityNeeded: document.getElementById('toggle-accessibility').checked
    };
};
