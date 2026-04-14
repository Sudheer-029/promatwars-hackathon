// components/mapView.js
// Renders the conceptual Heatmap UI 



function renderMapView() {
    const container = document.getElementById('map-view-container');
    if (!container) return;

    container.innerHTML = ''; // clear

    // Map through gates and concourses to show heat levels
    const zonesToShow = ['gate_a', 'gate_b', 'gate_c', 'concourse_north'];
    
    zonesToShow.forEach(id => {
        const density = liveStatus.crowdDensity[id] || 0;
        let colorClass = 'queue-low'; // using existing css
        if (density > 50) colorClass = 'queue-med';
        if (density > 80) colorClass = 'queue-high';

        let name = venueData.zones.find(z => z.id === id)?.name || id;

        const el = document.createElement('div');
        el.className = `metric-card ${colorClass === 'queue-high' ? 'critical' : ''}`;
        el.style.display = 'flex';
        el.style.flexDirection = 'column';
        el.style.justifyContent = 'center';
        
        el.innerHTML = `
            <span class="metric-label">${name}</span>
            <span class="metric-value ${colorClass}">${density}%</span>
            <span style="font-size: 0.75rem; margin-top: 5px;">Density</span>
        `;
        
        container.appendChild(el);
    });
}
