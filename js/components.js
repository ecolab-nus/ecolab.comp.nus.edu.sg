/* ============================================
   ECO Lab - Shared Components
   ============================================ */

function renderNav(activePage) {
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
        <div class="nav-inner">
            <a href="index.html" class="nav-brand">
                <span>ECO Lab</span>
            </a>
            <button class="nav-toggle" aria-label="Toggle navigation">
                <span></span><span></span><span></span>
            </button>
            <ul class="nav-links">
                <li><a href="index.html" ${activePage === 'home' ? 'class="active"' : ''}>Home</a></li>
                <li>
                    <a href="team.html" ${activePage === 'people' ? 'class="active"' : ''}>People ▾</a>
                    <ul class="nav-dropdown">
                        <li><a href="professor.html">Prof. Tulika Mitra</a></li>
                        <li><a href="team.html">ECO Lab Team</a></li>
                    </ul>
                </li>
                <li><a href="featured-projects.html" ${activePage === 'featured-projects' ? 'class="active"' : ''}>Projects</a></li>
                <li><a href="publications.html" ${activePage === 'publications' ? 'class="active"' : ''}>Publications</a></li>
                <li><a href="artifacts.html" ${activePage === 'artifacts' ? 'class="active"' : ''}>Artifacts</a></li>
                <li>
                    <a href="activities.html" ${activePage === 'activities' || activePage === 'acknowledgements' ? 'class="active"' : ''}>More ▾</a>
                    <ul class="nav-dropdown">
                        <li><a href="activities.html">Professional Activities</a></li>
                        <li><a href="acknowledgements.html">Acknowledgements</a></li>
                    </ul>
                </li>
            </ul>
        </div>
    `;

    document.body.insertBefore(nav, document.body.firstChild);

    // Mobile toggle
    const toggle = nav.querySelector('.nav-toggle');
    const links = nav.querySelector('.nav-links');
    toggle.addEventListener('click', () => {
        links.classList.toggle('open');
    });

    // Mobile dropdown toggle
    if (window.innerWidth <= 768) {
        nav.querySelectorAll('.nav-links > li').forEach(li => {
            const dropdown = li.querySelector('.nav-dropdown');
            if (dropdown) {
                li.querySelector('a').addEventListener('click', (e) => {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        li.classList.toggle('dropdown-open');
                    }
                });
            }
        });
    }
}

function renderFooter() {
    const footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = `
        <div class="footer-inner">
            <div class="footer-address">
                <strong>ECO Lab — Embedded Computing Lab</strong><br>
                Department of Computer Science, School of Computing<br>
                National University of Singapore<br>
                Computing 3, 13 Computing Drive, Singapore 117417
            </div>
            <div style="margin-top:12px; font-size:13px; color:#5f6368;">
                Email: <a href="mailto:tulika@comp.nus.edu.sg">tulika@comp.nus.edu.sg</a>
            </div>
            <div class="footer-copy">
                &copy; ${new Date().getFullYear()} ECO Lab, National University of Singapore. All rights reserved.
            </div>
        </div>
    `;
    document.body.appendChild(footer);
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'home';
    renderNav(page);
    renderFooter();
});
