// components/opsDashboard.js
// Dashboard logic for the Ops Persona. Allows them to see an aggregated view and push alerts.



function renderOpsDashboard() {
    const container = document.getElementById('ops-dashboard-container');
    if (!container) return;

    container.innerHTML = '';

    // Calculate Busiest Zone
    let busiest = null;
    let maxDensity = -1;
    for (const [id, value] of Object.entries(liveStatus.crowdDensity)) {
        if (value > maxDensity) {
            maxDensity = value;
            busiest = id;
        }
    }
    const busiestObj = venueData.zones.find(z => z.id === busiest);
    const busiestName = busiestObj ? busiestObj.name : busiest;

    // High Level Metric Cards
    container.innerHTML = `
        <div class="card" style="grid-column: span 2;">
            <h2>Live Operational Overview</h2>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <div class="metric-card ${maxDensity > 80 ? 'critical' : ''}">
                    <div class="metric-label">Busiest Zone</div>
                    <div class="metric-value ${maxDensity > 80 ? 'queue-high' : 'queue-low'}">${busiestName} (${maxDensity}%)</div>
                </div>
                <div class="metric-card">
                    <div class="metric-label">Active Incidents</div>
                    <div class="metric-value">${liveStatus.incidents.length}</div>
                </div>
            </div>
        </div>

        <!-- Hotspots card -->
        <div class="card">
            <h2>Crowd Hotspots</h2>
            <div id="ops-hotspots-list"></div>
        </div>

        <!-- Action Panel -->
        <div class="card">
            <h2>Quick Actions</h2>
            <div class="form-group">
                <label>Dispatch Note (will show up on Fan apps)</label>
                <input type="text" id="action-note" placeholder="e.g. Avoid East Concourse...">
                <button id="btn-dispatch" style="margin-top: 10px; background: var(--brand-warning); color: #000; padding: 10px; border-radius: 8px; border:none; cursor: pointer; font-weight: bold;">
                    Dispatch Alert via Firebase
                </button>
            </div>
        </div>
    `;

    // Populate Hotspots
    const hotspotsDiv = document.getElementById('ops-hotspots-list');
    for (const [id, value] of Object.entries(liveStatus.crowdDensity)) {
        if (value > 60) {
            let zName = venueData.zones.find(z => z.id === id)?.name || id;
            hotspotsDiv.innerHTML += `
                <div style="margin-bottom: 10px; padding: 10px; border-radius: 8px; border: 1px solid var(--brand-danger); background: rgba(239,68,68,0.1);">
                    <strong>${zName}</strong> is congested at ${value}%.<br/>
                    <em>Suggestion:</em> Deploy 2 staff members for crowd control.
                </div>
            `;
        }
    }

    // Bind dispatch button
    document.getElementById('btn-dispatch').addEventListener('click', () => {
        const msg = document.getElementById('action-note').value;
        if(msg) {
            firebaseService.triggerAlert(msg, busiest);
            document.getElementById('action-note').value = '';
        }
    });

}
