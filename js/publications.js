/* ============================================
   ECO Lab - Publications Renderer
   Reads data/publications.json and renders
   publications grouped by year.
   ============================================ */

function renderPublications(containerId, options = {}) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { limit, latestYearOnly } = options;

    fetch('data/publications.json')
        .then(res => {
            if (!res.ok) throw new Error('Failed to load publications data');
            return res.json();
        })
        .then(pubs => {
            // Group by year, descending
            const grouped = {};
            pubs.forEach(p => {
                if (!grouped[p.year]) grouped[p.year] = [];
                grouped[p.year].push(p);
            });

            const years = Object.keys(grouped).sort((a, b) => b - a);
            const displayYears = latestYearOnly ? [years[0]] : years;

            let count = 0;
            displayYears.forEach(year => {
                const h2 = document.createElement('h2');
                h2.className = 'pub-year';
                h2.textContent = year;
                container.appendChild(h2);

                const ul = document.createElement('ul');
                ul.className = 'pub-list';

                grouped[year].forEach(pub => {
                    if (limit && count >= limit) return;

                    const li = document.createElement('li');

                    let html = `<span class="pub-title">${pub.title}</span>`;
                    if (pub.links) {
                        if (pub.links.paper) {
                            html += ` <a class="pub-link" href="${pub.links.paper}" target="_blank">[Paper]</a>`;
                        }
                        if (pub.links.github) {
                            html += ` <a class="pub-link" href="${pub.links.github}" target="_blank">[GitHub]</a>`;
                        }
                    }
                    html += `<br><span class="pub-authors">${pub.authors}</span><br>`;
                    html += `<span class="pub-venue">${pub.venue}</span>`;

                    li.innerHTML = html;
                    ul.appendChild(li);
                    count++;
                });

                container.appendChild(ul);
            });
        })
        .catch(err => {
            console.error('Publications loading error:', err);
            container.innerHTML = '<p style="color: #5f6368;">Unable to load publications. Please try refreshing the page.</p>';
        });
}
