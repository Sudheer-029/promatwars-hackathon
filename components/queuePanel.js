// components/queuePanel.js
// Renders the wait times and highlights accessible ones.



function renderQueuePanel() {
    const container = document.getElementById('queue-panel-container');
    if (!container) return;

    container.innerHTML = '';
    const state = getAppState();

    // Render Food Queues
    let foodSection = document.createElement('div');
    foodSection.innerHTML = `<h3>🍔 Food Wait Times</h3><div style="margin-top: 10px;"></div>`;
    venueData.foodCourts.forEach(food => {
        const time = liveStatus.queues[food.id] || 0;
        appendItemRow(foodSection, food.name, time);
    });

    // Render Restrooms
    let rrSection = document.createElement('div');
    rrSection.style.marginTop = '1rem';
    rrSection.innerHTML = `<h3>🚻 Restroom Wait Times</h3><div style="margin-top: 10px;"></div>`;
    venueData.restrooms.forEach(rr => {
        // If user needs accessible and it's not, skip or dim
        if (state.accessibilityNeeded && !rr.accessible) return; 

        const time = liveStatus.queues[rr.id] || 0;
        let suffix = rr.accessible ? " ♿" : "";
        appendItemRow(rrSection, rr.name + suffix, time);
    });

    container.appendChild(foodSection);
    container.appendChild(rrSection);
}

function appendItemRow(parent, name, timeMinutes) {
    let colorClass = 'queue-low';
    if (timeMinutes > 10) colorClass = 'queue-med';
    if (timeMinutes > 20) colorClass = 'queue-high';

    const row = document.createElement('div');
    row.className = 'queue-item';
    row.innerHTML = `
        <span>${name}</span>
        <span class="queue-time ${colorClass}">${timeMinutes} mins</span>
    `;
    parent.appendChild(row);
}
