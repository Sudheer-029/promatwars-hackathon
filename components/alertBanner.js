// components/alertBanner.js
// Handles rendering dynamic system alerts synced from the 'backend'



function renderAlerts() {
    const container = document.getElementById('alert-banner-container');
    if (!container) return;

    container.innerHTML = '';

    if (liveStatus.incidents && liveStatus.incidents.length > 0) {
        liveStatus.incidents.forEach(inc => {
            const banner = document.createElement('div');
            banner.className = `alert-banner ${inc.type === 'spill' ? 'danger' : ''}`;
            banner.innerHTML = `
                <div>
                    <strong>⚠️ Live Alert:</strong> ${inc.alert}
                </div>
            `;
            container.appendChild(banner);
        });
    }
}
