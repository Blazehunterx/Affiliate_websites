async function loadDeals() {
    const response = await fetch('data.json');
    const data = await response.json();
    const container = document.getElementById('deals-container');

    data.forEach(product => {
        const row = document.createElement('div');
        row.className = 'table-row';
        row.innerHTML = `
            <div class="product-info">
                ${product.badge ? `<span class="badge">${product.badge}</span>` : ''}
                <h3>${product.name}</h3>
                <span class="discount-tag">${product.discount}</span>
            </div>
            <div class="features">
                <ul class="features-list">
                    ${product.features.map(f => `<li>${f}</li>`).join('')}
                </ul>
            </div>
            <div class="pricing">
                <strong>${product.price}</strong>
                <p style="font-size: 0.8rem; color: var(--text-muted)">Best for: ${product.bestFor}</p>
            </div>
            <div class="cta">
                <a href="${product.link}" class="btn-visit">Visit Site</a>
            </div>
        `;
        container.appendChild(row);
    });
}

function startTimer() {
    let time = 86400; // 24h
    const timerEl = document.getElementById('flash-timer');
    
    setInterval(() => {
        const h = Math.floor(time / 3600);
        const m = Math.floor((time % 3600) / 60);
        const s = time % 60;
        timerEl.innerText = `${h}h ${m}m ${s}s`;
        time--;
        if (time < 0) time = 86400;
    }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
    loadDeals();
    startTimer();
});
