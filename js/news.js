/* ============================================
   ECO Lab - News Renderer
   Reads data/news.json and renders news items.
   ============================================ */

function renderNews(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { limit = 5 } = options;

    fetch('data/news.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load news data');
            return res.json();
        })
        .then(items => {
            const ul = document.createElement('ul');
            ul.style.cssText = 'list-style: none; padding: 0;';

            items.slice(0, limit).forEach((item, i) => {
                const li = document.createElement('li');
                li.style.cssText = 'padding: 12px 0;' + (i < Math.min(items.length, limit) - 1 ? ' border-bottom: 1px solid #e8eaed;' : '');

                let html = `<span style="color: #003D7C; font-size: 13px; font-weight: 500;">${item.date}</span><br>`;
                html += `<span style="font-size: 14px;">${item.text}</span>`;
                if (item.link) {
                    html += ` <a href="${item.link}" target="_blank" style="color: #003D7C; font-size: 13px;">[Link]</a>`;
                }

                li.innerHTML = html;
                ul.appendChild(li);
            });

            container.appendChild(ul);
        })
        .catch(err => {
            console.error('News loading error:', err);
            container.innerHTML = '<p style="color: #5f6368;">Unable to load news.</p>';
        });
}
