/* ============================================
   ECO Lab - Publications Renderer
   Reads data/publications.json and renders
   publications grouped by year with search.
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
            // Build search bar
            const searchWrap = document.createElement('div');
            searchWrap.className = 'pub-search-wrap';
            searchWrap.innerHTML = `
                <input type="text" id="pub-search" class="pub-search" placeholder="Search by title, author, or venue…">
                <span id="pub-search-count" class="pub-search-count"></span>
            `;
            container.appendChild(searchWrap);

            // Results container
            const resultsDiv = document.createElement('div');
            resultsDiv.id = 'pub-results';
            container.appendChild(resultsDiv);

            function renderList(items) {
                resultsDiv.innerHTML = '';

                // Group by year, descending
                const grouped = {};
                items.forEach(p => {
                    if (!grouped[p.year]) grouped[p.year] = [];
                    grouped[p.year].push(p);
                });

                const years = Object.keys(grouped).sort((a, b) => b - a);
                const displayYears = latestYearOnly ? [years[0]] : years;

                if (items.length === 0) {
                    resultsDiv.innerHTML = '<p style="color: #5f6368; padding: 24px 0;">No publications match your search.</p>';
                    return;
                }

                let count = 0;
                displayYears.forEach(year => {
                    if (!year) return;
                    const h2 = document.createElement('h2');
                    h2.className = 'pub-year';
                    h2.textContent = year;
                    resultsDiv.appendChild(h2);

                    const ul = document.createElement('ul');
                    ul.className = 'pub-list';

                    grouped[year].forEach(pub => {
                        if (limit && count >= limit) return;

                        const li = document.createElement('li');

                        let html = `<span class="pub-title">${pub.title}</span>`;
                        if (pub.links) {
                            if (pub.links.paper) {
                                html += ` <a class="pub-link" href="${pub.links.paper}" target="_blank" rel="noopener">[Paper]</a>`;
                            }
                            if (pub.links.github) {
                                html += ` <a class="pub-link" href="${pub.links.github}" target="_blank" rel="noopener">[GitHub]</a>`;
                            }
                        }
                        html += `<br><span class="pub-authors">${pub.authors}</span><br>`;
                        html += `<span class="pub-venue">${pub.venue}</span>`;

                        li.innerHTML = html;
                        ul.appendChild(li);
                        count++;
                    });

                    resultsDiv.appendChild(ul);
                });
            }

            // Initial render
            renderList(pubs);

            // Search logic
            const searchInput = document.getElementById('pub-search');
            const countSpan = document.getElementById('pub-search-count');

            searchInput.addEventListener('input', function() {
                const query = this.value.trim().toLowerCase();
                if (!query) {
                    renderList(pubs);
                    countSpan.textContent = '';
                    return;
                }

                const terms = query.split(/\s+/);
                const filtered = pubs.filter(p => {
                    const text = (p.title + ' ' + p.authors + ' ' + p.venue + ' ' + p.year).toLowerCase();
                    return terms.every(t => text.includes(t));
                });

                renderList(filtered);
                countSpan.textContent = filtered.length + ' of ' + pubs.length + ' publications';
            });
        })
        .catch(err => {
            console.error('Publications loading error:', err);
            container.innerHTML = '<p style="color: #5f6368;">Unable to load publications. Please try refreshing the page.</p>';
        });
}
