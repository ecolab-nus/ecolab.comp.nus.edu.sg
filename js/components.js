/* ============================================
   ECO Lab - Shared Components
   ============================================ */

function renderNav(activePage) {
    const nav = document.createElement('nav');
    nav.className = 'site-nav';
    nav.innerHTML = `
        <div class="nav-inner">
            <a href="index.html" class="nav-brand">
                <img src="static/nus-logo.png" alt="NUS School of Computing">
                <div class="nav-divider"></div>
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
                <li><a href="chip-gallery.html" ${activePage === 'chip-gallery' ? 'class="active"' : ''}>Chip Gallery</a></li>
                <li><a href="acknowledgements.html" ${activePage === 'acknowledgements' ? 'class="active"' : ''}>Acknowledgements</a></li>
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
        <div class="footer-inner footer-flex">
            <div class="footer-left">
                <div style="margin-bottom: 16px;">
                    <img src="static/nus-logo.png" alt="NUS School of Computing" style="height: 36px; width: auto;">
                </div>
                <div class="footer-address">
                    Computing 3, 13 Computing Drive, Singapore 117417
                </div>
                <div style="margin-top:8px; font-size:13px; color:#5f6368;">
                    Email: <a href="mailto:tulika@comp.nus.edu.sg">tulika@comp.nus.edu.sg</a>
                </div>
                <div class="footer-copy">
                    &copy; ${new Date().getFullYear()} ECO Lab, National University of Singapore.
                </div>
            </div>
            <div class="footer-globe" id="footer-globe"></div>
        </div>
    `;
    document.body.appendChild(footer);

    // Load ClustrMaps map into footer
    const globeContainer = document.getElementById('footer-globe');
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.id = 'clustrmaps';
    script.src = '//cdn.clustrmaps.com/map_v2.js?cl=ffffff&w=300&t=tt&d=ZUZbXvt_mKZZUh_-M7O0zWUvq5xlOSpxra897SVDEyQ&co=2d78ad&cmo=3acc3a&cmn=ff5353&ct=ffffff';
    globeContainer.appendChild(script);
}

// Auto-init
document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.dataset.page || 'home';
    renderNav(page);
    renderFooter();
});
